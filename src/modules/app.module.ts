import { Module } from '@nestjs/common';

import * as Modules from './modules';

@Module({
  imports: [...Object.values(Modules).filter(m => m && m !== AppModule)],
})
export class AppModule {}
