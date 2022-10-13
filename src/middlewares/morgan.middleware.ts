import { Injectable, Logger, NestMiddleware } from '@nestjs/common';

import morgan, { format } from 'morgan';

format(
  'custom',
  ':remote-addr ":method :url HTTP/:http-version" :status :res[content-length] ":referrer" ":user-agent" - :response-time ms',
);

@Injectable()
export class MorganMiddleware implements NestMiddleware {
  use = morgan('custom', {
    stream: {
      write: (message: string) => {
        Logger.log(message.substring(0, message.lastIndexOf('\n')), 'Morgan');
      },
    },
  });
}

export const MORGAN_MIDDLEWARE = Symbol('injectable:middleware:morgan');
