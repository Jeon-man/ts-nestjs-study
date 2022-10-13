import { HttpException, Injectable } from '@nestjs/common';

import { IsNumber, IsOptional, IsString } from 'class-validator';
import jwt, { JwtHeader, JwtPayload as OriginalJwtPayload } from 'jsonwebtoken';

import { TokenExpiredException, TokenInvalidException, TokenUnsafeException } from '@exception';

import { IsNever } from '@util/types';
import { randomUUID } from '@util/uuid';
import { Validator, createValidator } from '@util/validator';

import { ConfigService } from './config.service';
import { DBService } from './db.service';

export type JwtPayload<T = never> = OriginalJwtPayload & T;
export interface Jwt<T = never> {
  header: JwtHeader;
  payload: IsNever<T> extends true ? OriginalJwtPayload | string : JwtPayload<T>;
  signature: string;
}

export class BaseTokenData implements OriginalJwtPayload {
  /** @summary user id */
  @IsNumber({ allowInfinity: false, allowNaN: false })
  id: number;

  /** @summary token family uuid */
  @IsString()
  uuid: string;

  @IsNumber({ allowInfinity: false, allowNaN: false })
  iat: number;

  @IsOptional()
  @IsNumber({ allowInfinity: false, allowNaN: false })
  exp?: number;
}

export class RefreshTokenData extends BaseTokenData {
  /** @summary token version */
  @IsNumber({ allowInfinity: false, allowNaN: false })
  v: number;
}

export class AccessTokenData extends RefreshTokenData {
  /** @summary token version */
  @IsNumber({ allowInfinity: false, allowNaN: false })
  v: number;
}

export type UserIdentifier = number;

@Injectable()
export class TokenService {
  private readonly accessTokenValidator = createValidator(AccessTokenData);
  private readonly refreshTokenValidator = createValidator(RefreshTokenData);

  constructor(private readonly db: DBService, private readonly configService: ConfigService) {}

  /** generate new  access token & refresh token */
  async generate(identifier: UserIdentifier) {
    return this._generate(identifier);
  }

  /** invalidate all tokens from uuid */
  async invalidate(tokenString: string) {
    const { token } = await this._validate<AccessTokenData>(
      tokenString,
      this.configService.get('REFRESH_TOKEN_SECRET'),
      this.refreshTokenValidator,
    );

    await this._invalidate(token.payload.uuid);
  }

  /** validate access token */
  async validate(tokenString: string) {
    const { token } = await this._validate<AccessTokenData>(
      tokenString,
      this.configService.get('ACCESS_TOKEN_SECRET'),
      this.accessTokenValidator,
    );
    return token;
  }

  /** refresh access token & refresh token */
  async refresh(tokenString: string) {
    const { token, ancestor } = await this._validate<AccessTokenData>(
      tokenString,
      this.configService.get('REFRESH_TOKEN_SECRET'),
      this.refreshTokenValidator,
    );

    if (token.signature !== ancestor.signature) {
      await this._invalidate(token.payload.uuid);
      throw new TokenUnsafeException();
    }

    return await this._generate(token.payload.id, token.payload.uuid);
  }

  private async _generate(identifier: UserIdentifier, ancestorUuid?: string) {
    try {
      const uuid = ancestorUuid ?? randomUUID();

      const refreshToken = jwt.sign(
        { id: identifier, uuid, v: 1 },
        this.configService.get('REFRESH_TOKEN_SECRET'),
        { expiresIn: '90d' },
      );

      const signature = refreshToken.split('.')[2];

      if (!ancestorUuid) {
        await this.db.RefreshToken.create({ uuid, signature, userId: identifier });
      } else {
        await this.db.RefreshToken.update({ signature }, { where: { uuid } });
      }

      const accessToken = jwt.sign(
        { id: identifier, uuid, v: 1 },
        this.configService.get('ACCESS_TOKEN_SECRET'),
        { expiresIn: '1h' },
      );

      return { accessToken, refreshToken };
    } catch (error) {
      if (error instanceof HttpException) throw error;
      if (error instanceof jwt.TokenExpiredError) throw new TokenExpiredException(error);
      throw new TokenInvalidException(error);
    }
  }

  private async _invalidate(uuid: string) {
    await this.db.RefreshToken.destroy({ where: { uuid } });
  }

  private async _validate<T extends BaseTokenData = BaseTokenData>(
    tokenString: string,
    secret: string,
    validator: Validator,
  ) {
    let token: Jwt<T>;

    // verify token
    try {
      token = jwt.verify(tokenString, secret, { complete: true }) as Jwt<T>;
      if (typeof token.payload === 'string') throw 'payload is string';
    } catch (error) {
      if (error instanceof jwt.TokenExpiredError) throw new TokenExpiredException(error);
      throw new TokenInvalidException(error);
    }

    // validate token
    try {
      await validator(token.payload);

      const ancestor = await this.db.RefreshToken.findOne({
        where: { uuid: token.payload.uuid },
      });

      if (!ancestor) {
        throw new TokenUnsafeException({
          reason: 'ancestor token not found, maybe it was invalidated',
          uuid: token.payload.uuid,
        });
      }

      return { token, ancestor };
    } catch (error) {
      if (error instanceof HttpException) throw error;
      throw new TokenInvalidException(error);
    }
  }
}
