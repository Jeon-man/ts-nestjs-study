import { Inject, Injectable } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';

import { Expose } from 'class-transformer';
import cls from 'cls-hooked';
import { Transaction } from 'sequelize';
import { Model, Sequelize } from 'sequelize-typescript';

import { SEQUELIZE_PROVIDER } from '@provider/sequelize';

import M from '@model';

export type ModelTypes = typeof M;

type SequelizeWithModels = Omit<Sequelize, 'models'> & { models: ModelTypes };

@Injectable()
export class DBService {
  readonly ns;
  constructor(@Inject(SEQUELIZE_PROVIDER) private readonly _sequelize: SequelizeWithModels) {
    // TODO: 선택 가능하게 만들기
    this.ns = cls.createNamespace('sequelize_transaction');
    Sequelize.useCLS(this.ns);

    this.addDecorators();

    return new Proxy(this, {
      get(target: DBService, prop) {
        if (prop in target) return target[prop as keyof DBService];
        if (prop in target.sequelize.models)
          return target.sequelize.models[prop as keyof ModelTypes];
        return undefined;
      },
    });
  }

  // model class에 기본적인 decorator를 추가해줌
  private addDecorators() {
    ApiProperty({ type: Number })(Model, 'id');
    Expose()(Model, 'id');
    ApiProperty({ type: Date })(Model, 'createdAt');
    Expose()(Model, 'createdAt');
    ApiProperty({ type: Date })(Model, 'updatedAt');
    Expose()(Model, 'updatedAt');
    ApiProperty({ type: Date })(Model, 'deletedAt');
  }

  async bindTransaction(thisArg: any): Promise<Transaction> {
    const ctx = this.ns.createContext();
    this.ns.enter(ctx);
    this.ns.bind(thisArg, ctx);

    const transaction = await this._sequelize.transaction({ autocommit: false });
    this.ns.set('transaction', transaction);

    return {
      get LOCK() {
        return transaction.LOCK;
      },
      afterCommit: fn => transaction.afterCommit(fn),
      commit: async () => transaction.commit().finally(() => this.ns.exit(ctx)),
      rollback: async () => transaction.rollback().finally(() => this.ns.exit(ctx)),
    };
  }

  get sequelize() {
    return this._sequelize;
  }
}

export interface DBService extends ModelTypes {}
