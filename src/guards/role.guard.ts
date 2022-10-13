import { CanActivate, ExecutionContext, Injectable, NotFoundException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

import { DBService } from '@service';

import D from '@decorator';

import I from '@interface';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private readonly db: DBService, private reflector: Reflector) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest();
    const roles = D.getRoles(this.reflector, context);
    const user = D.getUser(undefined, context);

    if (roles.length === 0) return true;

    if (roles.includes(I.AuthRole.Admin)) {
      if (user && user.isAdmin) {
        req.role = I.AuthRole.Admin;
        return true;
      }
    }

    if (roles.includes(I.AuthRole.User)) {
      if (user) {
        req.role = I.AuthRole.User;
        return true;
      }
    }

    throw new NotFoundException();
  }
}
