import { Controller, Get, Param, ParseIntPipe, UseInterceptors } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

import { UserService } from '@service';

import D from '@decorator';
import { ModelResponseInterceptor } from '@interceptor';

import M from '@model';

@ApiTags('User')
@UseInterceptors(ModelResponseInterceptor)
@Controller({ path: 'users', version: '1' })
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @D.Auth()
  async findAll() {
    return this.userService.findAll();
  }

  @ApiOperation({
    summary: '자기 정보 조회',
    description: '자신의 정보를 조회합니다.',
  })
  @ApiOkResponse({ type: M.User })
  @Get('me')
  @D.Auth()
  @D.Transactional
  async findMe(@D.User('id', ParseIntPipe) id: number) {
    return this.userService.findByPk(id);
  }

  @Get(':id')
  @D.Auth()
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return this.userService.findByPk(id);
  }
}
