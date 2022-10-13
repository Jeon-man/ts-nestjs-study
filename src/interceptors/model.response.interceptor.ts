import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';

import { instanceToPlain } from 'class-transformer';
import { Observable, map } from 'rxjs';
import { Model } from 'sequelize-typescript';

@Injectable()
export class ModelResponseInterceptor implements NestInterceptor {
  private async convertToPlain(data: any) {
    if (!(data instanceof Model)) return data;

    return instanceToPlain(data, {
      enableImplicitConversion: true,
      enableCircularCheck: false,
      strategy: 'excludeAll',
    });
  }

  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> | Promise<Observable<any>> {
    return next.handle().pipe(
      map(data => {
        if (Array.isArray(data)) return Promise.all(data.map(item => this.convertToPlain(item)));
        return this.convertToPlain(data);
      }),
    );
  }
}
