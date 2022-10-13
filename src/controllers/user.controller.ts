import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  UseInterceptors,
} from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

import { UserService } from '@service';

import D from '@decorator';
import { ModelResponseInterceptor } from '@interceptor';

import { UpdateUserDto, UpdateUserInfoDto } from '@dto';
import I from '@interface';
import M from '@model';

@ApiTags('User')
@UseInterceptors(ModelResponseInterceptor)
@Controller({ path: 'users', version: '1' })
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @D.Auth(I.AuthRole.Admin)
  async findAll() {
    return this.userService.findAll();
  }

  @ApiOperation({
    summary: '자기 정보 조회',
    description: '자신의 정보를 조회합니다.',
  })
  @ApiOkResponse({ type: M.User })
  @Get('me')
  @D.Auth(I.AuthRole.User)
  @D.Transactional
  async findMe(@D.User('id', ParseIntPipe) id: number) {
    return this.userService.findByPk(id);
  }

  @Get(':id')
  @D.Auth(I.AuthRole.Admin)
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return this.userService.findByPk(id);
  }

  @Patch('me')
  @D.Auth(I.AuthRole.User)
  async updateMe(@D.User('id', ParseIntPipe) id: number, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(id, updateUserDto);
  }

  @Patch(':id')
  @D.Auth(I.AuthRole.Admin)
  async update(@Param('id', ParseIntPipe) id: number, @Body() updateUserDto: UpdateUserInfoDto) {
    return this.userService.update(id, updateUserDto);
  }

  @Delete(':id')
  @D.Auth(I.AuthRole.Admin)
  async remove(@Param('id', ParseIntPipe) id: number) {
    return this.userService.remove(id);
  }
}
