import { Injectable } from '@nestjs/common';

import { CreateGroupDto, UpdateGroupDto } from '@dto';

import { DBService } from './db.service';

@Injectable()
export class GroupService {
  constructor(private readonly db: DBService) {}

  async create(createGroupDto: CreateGroupDto) {
    return this.db.Group.create(createGroupDto);
  }

  async findAll() {
    return this.db.Group.findAll();
  }

  async findOne(groupId: number) {
    return this.db.Group.findByPk(groupId);
  }

  async update(groupId: number, updateGroupDto: UpdateGroupDto) {
    return this.db.Group.update(updateGroupDto, { where: { id: groupId } });
  }

  async delete(groupId: number) {
    return this.db.Group.destroy({ where: { id: groupId } });
  }
}
