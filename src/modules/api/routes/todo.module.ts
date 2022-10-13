import { Module } from '@nestjs/common';

import { TodoController } from '@controller/todo';
import { TodoService } from '@service/todo';

@Module({
  controllers: [TodoController],
  providers: [TodoService],
  exports: [TodoService],
})
export class TodoModule {}
