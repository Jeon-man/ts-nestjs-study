import { Global, Module } from '@nestjs/common';

import '@colors/colors';
import rootPath from 'app-root-path';
import { WinstonModule, utilities as nestWinstonModuleUtilities } from 'nest-winston';
import winston from 'winston';
import 'winston-daily-rotate-file';

import { ConfigService } from '@service/config';

const { combine, splat, printf, colorize, uncolorize, timestamp } = winston.format;

const WinstonLoggerModule = WinstonModule.forRootAsync({
  inject: [ConfigService],
  useFactory: async (configService: ConfigService) => {
    const isTest = configService.get('NODE_ENV') === 'test';
    const logDir = rootPath + '/logs';

    const consoleFormat = combine(
      nestWinstonModuleUtilities.format.nestLike(configService.get('APP_NAME'), {
        colors: true,
        prettyPrint: true,
      }),
    );
    const fileFormat = combine(
      nestWinstonModuleUtilities.format.nestLike(configService.get('APP_NAME'), {
        colors: false,
        prettyPrint: false,
      }),
      uncolorize(),
    );

    return {
      level: 'debug',
      format: combine(splat(), timestamp({ format: 'YYYY-MM-DD HH:mm:ss' })),
      transports: [
        new winston.transports.Console({
          silent: isTest,
          format: consoleFormat,
        }),
        new winston.transports.DailyRotateFile({
          level: 'info',
          datePattern: 'YYYY-MM-DD',
          dirname: `${logDir}/info`,
          filename: `%DATE%.log`,
          maxFiles: 30,
          json: false,
          zippedArchive: true,
          format: fileFormat,
          silent: isTest,
        }),
        new winston.transports.DailyRotateFile({
          level: 'error',
          datePattern: 'YYYY-MM-DD',
          dirname: `${logDir}/error`,
          filename: `%DATE%.error.log`,
          maxFiles: 30,
          handleExceptions: true,
          json: false,
          zippedArchive: true,
          format: fileFormat,
          silent: isTest,
        }),
        new winston.transports.DailyRotateFile({
          level: 'warn',
          datePattern: 'YYYY-MM-DD',
          dirname: `${logDir}/warn`,
          filename: `%DATE%.log`,
          maxFiles: 30,
          json: false,
          zippedArchive: true,
          format: fileFormat,
          silent: isTest,
        }),
      ],
    };
  },
});

@Global()
@Module({
  imports: [WinstonLoggerModule],
})
export class LoggerModule {}
