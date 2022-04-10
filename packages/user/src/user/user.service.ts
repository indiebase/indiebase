import { UserRepository } from './user.repository';
import { AUTH_SERVICE_NAME } from '@/app.constants';
import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRegisterDto } from './dto/user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserRepository)
    private readonly userRepo: UserRepository,
  ) {}
  public async register(body: UserRegisterDto) {
    await this.userRepo.createUser(body);
  }
}
