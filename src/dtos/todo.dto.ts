import { ApiProperty, PartialType } from '@nestjs/swagger';

import { IsString } from 'class-validator';

export class CreateTodoDto {
  @ApiProperty()
  @IsString()
  todo: string;
}

export class UpdateTodoDto extends PartialType(CreateTodoDto) {}
