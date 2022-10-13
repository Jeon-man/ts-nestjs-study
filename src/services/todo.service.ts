import { Injectable } from '@nestjs/common';

import { CreateTodoDto, UpdateTodoDto } from '@dto/todo';

import { DBService } from './db.service';

@Injectable()
export class TodoService {
  constructor(private readonly db: DBService) {}

  async create(createTodoDto: CreateTodoDto) {
    return this.db.Todo.create(createTodoDto);
  }

  async findAll() {
    return this.db.Todo.findAll();
  }

  async findById(todoId: number) {
    return this.db.Todo.findByPk(todoId);
  }

  async update(todoId: number, updateTodoDto: UpdateTodoDto) {
    return this.db.Todo.update(updateTodoDto, { where: { id: todoId } });
  }

  async delete(todoId: number) {
    return this.db.Todo.destroy({ where: { id: todoId } });
  }
}
