import { SetMetadata, UseGuards, applyDecorators } from '@nestjs/common';
import { ApiBearerAuth, ApiNotFoundResponse, ApiUnauthorizedResponse } from '@nestjs/swagger';

import { AuthGuard } from '@guard';
import { RoleGuard } from '@guard/role';

import I from '@interface';

export function Auth(...roles: I.AuthRole[]) {
  return applyDecorators(
    ApiBearerAuth(),
    ApiUnauthorizedResponse({ description: '토큰이 없을 때' }),
    ApiNotFoundResponse({ description: '권한이 부족하면 forbidden 대신 not found가 반환됨' }),
    SetMetadata('roles', roles),
    UseGuards(AuthGuard, RoleGuard),
  );
}
