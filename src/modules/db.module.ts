import { Global, Module } from '@nestjs/common';

import { SEQUELIZE_PROVIDER, sequelizeProvider } from '@provider/sequelize';
import { DBService } from '@service';

@Global()
@Module({
  providers: [...sequelizeProvider, DBService],
  exports: [SEQUELIZE_PROVIDER, DBService],
})
export class DBModule {}
