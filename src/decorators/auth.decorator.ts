import { UseGuards, applyDecorators } from '@nestjs/common';
import { ApiBearerAuth, ApiNotFoundResponse, ApiUnauthorizedResponse } from '@nestjs/swagger';

import { AuthGuard } from '@guard';

export function Auth() {
  return applyDecorators(
    ApiBearerAuth(),
    ApiUnauthorizedResponse({ description: '토큰이 없을 때' }),
    ApiNotFoundResponse({ description: '권한이 부족하면 forbidden 대신 not found가 반환됨' }),
    UseGuards(AuthGuard),
  );
}
