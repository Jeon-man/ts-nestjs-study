import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';

import { MorganMiddleware } from '@middleware/morgan';

import * as RouteModules from './routes';

@Module({
  imports: [...Object.values(RouteModules)],
})
export class ApiModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(MorganMiddleware).forRoutes('*');
  }
}
