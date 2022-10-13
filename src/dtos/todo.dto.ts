import { ApiProperty, PartialType } from '@nestjs/swagger';

import { IsNotEmpty, IsString } from 'class-validator';
import { CreationAttributes } from 'sequelize/types';

import M from '@model';

export class CreateTodoDto implements CreationAttributes<M.Todo> {
  @ApiProperty()
  @IsString()
  todo: string;

  @ApiProperty()
  @IsNotEmpty()
  successState: boolean;
}

export class UpdateTodoDto extends PartialType(CreateTodoDto) {}
