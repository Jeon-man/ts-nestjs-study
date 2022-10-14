import { ApiProperty } from '@nestjs/swagger';

import { Expose } from 'class-transformer';
import { Column, Model, Table } from 'sequelize-typescript';
import { InferAttributes, InferCreationAttributes } from 'sequelize/types';

@Table({
  tableName: 'Group',
  timestamps: true,
  paranoid: true,
  comment: '유저 소속 그룹 테이블',
})
export class Group extends Model<InferAttributes<Group>, InferCreationAttributes<Group>> {
  @ApiProperty()
  @Expose()
  @Column({
    allowNull: false,
    comment: '그룹 이름',
    unique: true,
  })
  groupName: string;
}
