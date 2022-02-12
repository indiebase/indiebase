import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';

@Controller()
export default class AuthController {
  @MessagePattern({ cmd: 'sum' })
  async demo() {
    return 'demo';
  }
}
