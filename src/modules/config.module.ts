import { Global, Module } from '@nestjs/common';
import { ConfigModule as OriginalConfigModule } from '@nestjs/config';

import { ConfigService, validateConfig } from '@service/config';

@Global()
@Module({
  imports: [
    OriginalConfigModule.forRoot({
      envFilePath: [`.env.${process.env.NODE_ENV || 'development'}`, '.env'],
      isGlobal: true,
      validate: validateConfig,
    }),
  ],
  providers: [ConfigService],
  exports: [ConfigService],
})
export class ConfigModule {}
