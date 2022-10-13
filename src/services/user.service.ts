import { Injectable } from '@nestjs/common';

import { Attributes, FindOptions } from 'sequelize';

import { CreateUserDto, UpdateUserDto } from '@dto/user';
import M from '@model';

import { DBService } from './db.service';

@Injectable()
export class UserService {
  constructor(private readonly db: DBService) {}

  async create(createUserDto: CreateUserDto) {
    return this.db.User.create(createUserDto);
  }

  async findAll() {
    return this.db.User.findAll();
  }

  async findByPk(id: number) {
    return this.db.User.findByPk(id);
  }

  async findOne(options?: FindOptions<Attributes<M.User>>) {
    return this.db.User.findOne(options);
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    return this.db.User.update(updateUserDto, { where: { id } });
  }

  async remove(id: number) {
    return this.db.User.destroy({ where: { id } });
  }
}
