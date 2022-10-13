import { ExecutionContext, SetMetadata } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

import I from '@interface';

const ROLE_METADATA = 'roles';
export const Role = (...roles: I.AuthRole[]) => SetMetadata(ROLE_METADATA, roles);

export const getRoles = (reflector: Reflector, context: ExecutionContext) =>
  reflector.get<string[]>(ROLE_METADATA, context.getHandler());
