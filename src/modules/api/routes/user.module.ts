import { Module } from '@nestjs/common';

import { UserController } from '@controller/user';
import { UserService } from '@service/user';

@Module({
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
