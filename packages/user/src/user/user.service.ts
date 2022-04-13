import { UserRepository } from './user.repository';
import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SignupDto } from '@letscollab/common';
import { MAIL_RMQ, AUTH_RMQ } from '@/app.constants';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserRepository)
    private readonly userRepo: UserRepository,
    @Inject(AUTH_RMQ)
    private readonly authClient: ClientProxy,

    @Inject(MAIL_RMQ)
    private readonly mailClient: ClientProxy,
  ) {}

  public async signup(body: SignupDto) {
    // await this.userRepo.createUser(body);
  }
}
