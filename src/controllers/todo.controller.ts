import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { TodoService } from '@service';

import { ModelResponseInterceptor } from '@interceptor';

import { CreateTodoDto, UpdateTodoDto } from '@dto/todo';

@ApiTags('todo')
@UseInterceptors(ModelResponseInterceptor)
@Controller({ path: 'todo', version: '1' })
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Get()
  async findAll() {
    return this.todoService.findAll();
  }

  @Get('/user/:id')
  async findUserTodo(@Param('id', ParseIntPipe) id: number) {
    return this.todoService.findUserTodo(id);
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return this.todoService.findById(id);
  }

  @Post(':id/add')
  async addTodo(@Body() creationTodo: CreateTodoDto, @Param('id', ParseIntPipe) id: number) {
    return this.todoService.create(creationTodo, id);
  }

  @Patch(':id')
  async update(@Param('id', ParseIntPipe) id: number, @Body() updateTodoDto: UpdateTodoDto) {
    return this.todoService.update(id, updateTodoDto);
  }

  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id: number) {
    return this.todoService.delete(id);
  }
}
