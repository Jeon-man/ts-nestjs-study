import { Module } from '@nestjs/common';

import { TodoController } from '@controller/todo';
import { TodoService } from '@service/todo';

import { UserModule } from './user.module';

@Module({
  imports: [UserModule],
  controllers: [TodoController],
  providers: [TodoService],
  exports: [TodoService],
})
export class TodoModule {}
