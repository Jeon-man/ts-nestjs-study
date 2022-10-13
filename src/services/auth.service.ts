import { Injectable, NotFoundException } from '@nestjs/common';

import bcrypt from 'bcrypt';

import { LoginDto } from '@dto/auth';
import { CreateUserDto } from '@dto/user';

import { DBService } from './db.service';
import { UserIdentifier } from './token.service';
import { UserService } from './user.service';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService, private readonly db: DBService) {}

  async validate({ email, password }: LoginDto): Promise<UserIdentifier> {
    const user = await this.userService.findOne({ where: { email } });
    if (!user) throw new NotFoundException('Authentication failed');

    const result = await bcrypt.compare(password, user.password);
    if (!result) throw new NotFoundException('Authentication failed');

    return user.id;
  }

  async register(createUserDto: CreateUserDto): Promise<UserIdentifier> {
    createUserDto.password = await bcrypt.hash(createUserDto.password, 10);

    const user = await this.userService.create(createUserDto);
    return user.id;
  }
}
