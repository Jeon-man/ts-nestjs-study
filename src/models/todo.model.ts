import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

import { Expose } from 'class-transformer';
import { BelongsTo, Column, ForeignKey, Model, Table } from 'sequelize-typescript';
import { InferAttributes, InferCreationAttributes } from 'sequelize/types';

import { User } from './user.model';

@Table({
  tableName: 'Todo',
  timestamps: true,
  paranoid: true,
  comment: 'todo table',
})
export class Todo extends Model<InferAttributes<Todo>, InferCreationAttributes<Todo>> {
  @ApiProperty()
  @Expose()
  @Column({ allowNull: false, comment: 'todo 내용' })
  todo: string;

  @ApiProperty()
  @Expose()
  @Column({ comment: '성공 상태' })
  successState: boolean = false;

  @ApiPropertyOptional({ type: () => User })
  @BelongsTo(() => User, { onDelete: 'CASCADE' })
  user?: User;

  @ApiProperty()
  @Column({ allowNull: false })
  @ForeignKey(() => User)
  userId?: number;
}
