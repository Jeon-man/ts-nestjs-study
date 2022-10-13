import { CanActivate, ExecutionContext, Injectable, NotFoundException } from '@nestjs/common';

import { DBService, TokenService } from '@service';

import D from '@decorator';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly db: DBService, private readonly tokenService: TokenService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const tokenString = D.getAuthorization('Bearer', context);
    if (!tokenString) throw new NotFoundException();

    const token = await this.tokenService.validate(tokenString);
    const user = await this.db.User.findByPk(token.payload.id);
    if (!user) throw new NotFoundException(); // unreachable

    const req = context.switchToHttp().getRequest();
    req.user = user;

    return true;
  }
}
