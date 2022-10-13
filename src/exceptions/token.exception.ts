import { HttpException, HttpStatus, Logger } from '@nestjs/common';

import { TokenExpiredError } from 'jsonwebtoken';

export class TokenException extends HttpException {
  constructor(message: string, meta: object = {}, detail?: any) {
    super({ message, ...meta }, HttpStatus.UNAUTHORIZED);
    if (detail) Logger.error({ message: this.message, detail });
  }
}

export class TokenUnsafeException extends TokenException {
  constructor(detail?: any) {
    super('Invalid token', undefined, { reason: 'It could be a stolen token', ...detail });
  }
}

export class TokenInvalidException extends TokenException {
  constructor(originalError?: any, detail?: object) {
    super('Invalid token', undefined, { originalError, ...detail });
  }
}

export class TokenExpiredException extends TokenException {
  constructor(originalError: TokenExpiredError, detail?: object) {
    super('Token expired', { expiredAt: originalError.expiredAt }, { originalError, ...detail });
  }
}
