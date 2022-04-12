import { UserRepository } from './user.repository';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SignupDto } from '@letscollab/common';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserRepository)
    private readonly userRepo: UserRepository,
  ) {}

  public async signup(body: SignupDto) {
    


    await this.userRepo.createUser(body);
  }
}
