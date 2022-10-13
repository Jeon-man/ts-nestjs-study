import { FactoryProvider, Logger, Provider } from '@nestjs/common';

import { Sequelize } from 'sequelize-typescript';

import { ConfigService } from '@service/config';

import { models } from '@model';

export const SEQUELIZE_PROVIDER = Symbol('injectable:provider:sequelize');

export const sequelizeProvider: Provider[] = [
  <FactoryProvider<Sequelize>>{
    provide: SEQUELIZE_PROVIDER,
    inject: [ConfigService],
    useFactory: async (configService: ConfigService) => {
      const sequelize = new Sequelize({
        dialect: configService.get('DB_DIALECT'),
        host: configService.get('DB_HOST'),
        port: configService.get('DB_PORT'),
        username: configService.get('DB_USERNAME'),
        password: configService.get('DB_PASSWORD'),
        database: configService.get('DB_DATABASE'),

        models: models,

        logging:
          configService.get('NODE_ENV') == 'development' ? sql => Logger.debug(sql, 'Sql') : false,
        timezone: '+09:00',
        dialectOptions: {
          supportBigNumbers: true,
          bigNumberStrings: true,
          allowPublicKeyRetrieval: true,
        },
        pool: {
          max: 50,
          min: 0,
          acquire: 30000,
          idle: 10000,
        },
      });

      await sequelize.authenticate();
      // U.logger.log('🟢 The database is connected.');
      await sequelize.sync({ force: false, alter: true });
      // U.logger.log('🟢 The database is synced.');

      return sequelize;
    },
  },
];
