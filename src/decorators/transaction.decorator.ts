import { UseInterceptors, applyDecorators, createParamDecorator } from '@nestjs/common';

import { TransactionInterceptor } from '@interceptor';

export const Transaction = createParamDecorator((data, ctx) => {
  const req = ctx.switchToHttp().getRequest();
  return req.transaction;
});

export const Transactional = applyDecorators(UseInterceptors(TransactionInterceptor));
