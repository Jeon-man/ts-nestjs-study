import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';

import { IsString } from 'class-validator';
import { CreationAttributes } from 'sequelize/types';

import M from '@model';

export class CreateGroupDto implements CreationAttributes<M.Group> {
  @ApiProperty()
  @IsString()
  groupName: string;
}

export class UpdateGroupDto extends PartialType(CreateGroupDto) {}
