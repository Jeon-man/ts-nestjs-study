import { CallHandler, ExecutionContext, Injectable, Logger, NestInterceptor } from '@nestjs/common';

import { Observable, catchError, tap } from 'rxjs';

import { DBService } from '@service';

@Injectable()
export class TransactionInterceptor implements NestInterceptor {
  constructor(private readonly db: DBService) {}

  async intercept(context: ExecutionContext, next: CallHandler<any>): Promise<Observable<any>> {
    const req = context.switchToHttp().getRequest();

    // start transaction
    const handler = context.getHandler();
    const transaction = await this.db.bindTransaction(handler);

    req.transaction = transaction;

    return next.handle().pipe(
      tap(async () => {
        await transaction.commit();
      }),
      catchError(async error => {
        Logger.error(error, 'Transaction');
        await transaction.rollback();
        // handle error
        throw error;
      }),
      // finalize(exitTransaction),
    );
  }
}
