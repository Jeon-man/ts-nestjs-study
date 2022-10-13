import { Global, Module } from '@nestjs/common';

import { AuthController } from '@controller/auth';
import { TokenService } from '@service';
import { AuthService } from '@service/auth';

import { UserModule } from './user.module';

@Global()
@Module({
  imports: [UserModule],
  controllers: [AuthController],
  providers: [TokenService, AuthService],
  exports: [TokenService],
})
export class AuthModule {}
