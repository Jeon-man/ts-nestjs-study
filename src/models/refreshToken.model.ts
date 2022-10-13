import { InferAttributes, InferCreationAttributes } from 'sequelize';
import { BelongsTo, Column, Model, Table } from 'sequelize-typescript';

import { User } from './user.model';

@Table({
  tableName: 'RefreshToken',
  timestamps: true,
  paranoid: true,
  comment: '리프레시 토큰 저장용 테이블',
})
export class RefreshToken extends Model<
  InferAttributes<RefreshToken>,
  InferCreationAttributes<RefreshToken>
> {
  @Column({
    allowNull: false,
    comment: '같은 토큰에서 생성되면 같은 uuid값을 가짐',
  })
  uuid: string;

  @Column({
    allowNull: false,
    comment: '마지막으로 발급된 토큰 signature',
  })
  signature: string;

  @Column({
    allowNull: false,
  })
  userId: number;

  @BelongsTo(() => User, {
    foreignKey: 'userId',
    onDelete: 'CASCADE',
  })
  user?: User;
}
