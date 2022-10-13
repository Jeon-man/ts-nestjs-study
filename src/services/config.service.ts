import { Injectable } from '@nestjs/common';
import { ConfigService as OriginalConfigService } from '@nestjs/config';

import {
  IsEnum,
  IsIP,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  ValidateIf,
} from 'class-validator';

import { createValidator } from '@util/validator';

enum Environment {
  Development = 'development',
  Production = 'production',
  Test = 'test',
  Provision = 'provision',
}

enum Dialect {
  MySQL = 'mysql',
  PostgreSQL = 'postgres',
  SQLite = 'sqlite',
  MariaDB = 'mariadb',
  MSSQL = 'mssql',
  DB2 = 'db2',
  Snowflake = 'snowflake',
}

export class EnvironmentVariables {
  // Common
  @IsOptional()
  @IsEnum(Environment)
  NODE_ENV: Environment = Environment.Development;

  @IsString()
  APP_NAME: string;

  @IsOptional()
  @IsNumber()
  PORT: number = 3000 as const;

  // DB
  @IsOptional()
  @IsEnum(Dialect)
  DB_DIALECT: Dialect = Dialect.MariaDB;

  @ValidateIf((_, val) => val !== 'localhost')
  @IsIP('4')
  DB_HOST: string;

  @IsOptional()
  @IsNumber()
  DB_PORT: number = 3306 as const;

  @IsString()
  @IsNotEmpty()
  DB_USERNAME: string;

  @IsString()
  @IsNotEmpty()
  DB_PASSWORD: string;

  @IsString()
  @IsNotEmpty()
  DB_DATABASE: string;

  // token
  @IsString()
  ACCESS_TOKEN_SECRET: string;

  @IsString()
  REFRESH_TOKEN_SECRET: string;
}

export const validateConfig = createValidator(EnvironmentVariables, {
  transformToInstanceOptions: { exposeDefaultValues: true },
  sync: true,
});

@Injectable()
export class ConfigService extends OriginalConfigService<EnvironmentVariables, true> {}
