import { ExecutionContext, createParamDecorator } from '@nestjs/common';

export const getUser = (data: string | undefined, ctx: ExecutionContext) => {
  const req = ctx.switchToHttp().getRequest();
  const user = req.user;

  return data ? user?.[data] : user;
};

export const User = createParamDecorator(getUser);
