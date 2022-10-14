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
import { ApiOperation, ApiTags } from '@nestjs/swagger';

import { TodoService } from '@service';

import { ModelResponseInterceptor } from '@interceptor';

import { CreateTodoDto, UpdateTodoDto } from '@dto/todo';

@ApiTags('todo')
@UseInterceptors(ModelResponseInterceptor)
@Controller({ path: 'todo', version: '1' })
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @ApiOperation({
    summary: '모든 투두',
    description: '모든 todo를 불러옵니다.',
  })
  @Get()
  async findAll() {
    return this.todoService.findAll();
  }

  @ApiOperation({
    summary: '유저 todo',
    description: '유저의 모든 todo를 불러옵니다.',
  })
  @Get('/user/:id')
  async findUserTodo(@Param('id', ParseIntPipe) id: number) {
    return this.todoService.findUserTodo(id);
  }

  @ApiOperation({
    summary: '투두',
    description: 'todo 한 개를 불러옵니다.',
  })
  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return this.todoService.findById(id);
  }

  @ApiOperation({
    summary: 'Todo 추가',
    description: 'todo 한 개를 만듭니다.',
  })
  @Post(':id/add')
  async addTodo(@Body() creationTodo: CreateTodoDto, @Param('id', ParseIntPipe) id: number) {
    return this.todoService.create(creationTodo, id);
  }

  @ApiOperation({
    summary: 'todo 수정',
    description: 'todo의 내용을 수정합니다.',
  })
  @Patch(':id')
  async update(@Param('id', ParseIntPipe) id: number, @Body() updateTodoDto: UpdateTodoDto) {
    return this.todoService.update(id, updateTodoDto);
  }

  @ApiOperation({
    summary: 'todo 삭제',
    description: 'todo를 삭제합니다.',
  })
  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id: number) {
    return this.todoService.delete(id);
  }
}
