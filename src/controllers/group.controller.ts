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

import { GroupService } from '@service';

import { ModelResponseInterceptor } from '@interceptor';

import { CreateGroupDto, UpdateGroupDto } from '@dto';

@ApiTags('Group')
@UseInterceptors(ModelResponseInterceptor)
@Controller({ path: 'group' })
export class GroupController {
  constructor(private readonly groupService: GroupService) {}

  @Get()
  async findAll() {
    return this.groupService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) groupId: number) {
    return this.groupService.findOne(groupId);
  }

  @Post('group-add')
  async createGroup(@Body() createGroupdto: CreateGroupDto) {
    return this.groupService.create(createGroupdto);
  }

  @Patch(':id')
  async updateGroup(@Param('id', ParseIntPipe) groupId: number, @Body() data: UpdateGroupDto) {
    return this.groupService.update(groupId, data);
  }

  @Delete(':id')
  async deleteGroup(@Param('id', ParseIntPipe) groupId: number) {
    return this.groupService.delete(groupId);
  }
}
