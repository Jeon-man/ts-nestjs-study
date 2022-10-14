import { OmitType, PartialType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';

import { IsEmail, IsNumber, IsString } from 'class-validator';
import { CreationAttributes } from 'sequelize/types';

import M from '@model';

export class CreateUserDto implements CreationAttributes<M.User> {
  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsString()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsString()
  password: string;

  @ApiProperty()
  @IsNumber()
  groupId?: number;
}

export class UpdateUserDto extends PartialType(CreateUserDto) {}

export class UpdateUserInfoDto extends OmitType(UpdateUserDto, ['password'] as const) {}
