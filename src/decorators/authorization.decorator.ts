import { ExecutionContext, createParamDecorator } from '@nestjs/common';

import { Request } from 'express';

type AuthType = 'Bearer';

export const getAuthorization = (data: AuthType = 'Bearer', ctx: ExecutionContext) => {
  const req = ctx.switchToHttp().getRequest<Request>();
  const { authorization } = req.headers;
  if (!authorization) return;

  const [authType, credentials] = authorization.split(' ');

  switch (authType) {
    case 'Bearer':
      return credentials;

    // currently only bearer type is supported
    default:
      return;
  }
};

/**
 * @summary get authorization header from request
 * @description currently only support bearer type
 *
 * @see {@link https://www.rfc-editor.org/rfc/rfc6750.html}
 */
export const Authorization = createParamDecorator(getAuthorization);
