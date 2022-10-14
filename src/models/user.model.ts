import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

import { Expose } from 'class-transformer';
import { CreationOptional, InferAttributes, InferCreationAttributes } from 'sequelize';
import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from 'sequelize-typescript';

import { Group } from './group.model';

@Table({
  tableName: 'User',
  timestamps: true,
  paranoid: true,
  comment: '유저 테이블',
})
export class User extends Model<InferAttributes<User>, InferCreationAttributes<User>> {
  @ApiProperty()
  @Expose()
  @Column({
    allowNull: false,
    comment: '유저 이름',
  })
  name: string;

  @ApiProperty()
  @Expose()
  @Column({
    allowNull: false,
    comment: '유저 이메일',
  })
  email: string;

  @ApiProperty()
  @Column({
    allowNull: false,
    comment: '유저 비밀번호',
  })
  password: string;

  @ApiProperty()
  @Column({
    allowNull: false,
    comment: '관리자 여부',
    type: DataType.BOOLEAN,
    defaultValue: false,
  })
  isAdmin: CreationOptional<boolean>;

  @ApiPropertyOptional({ type: () => Group })
  @BelongsTo(() => Group, { onDelete: 'CASCADE' })
  group?: Group;

  @ApiProperty()
  @Column({ allowNull: false })
  @ForeignKey(() => Group)
  groupId?: number;
}
