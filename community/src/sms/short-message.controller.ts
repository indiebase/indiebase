import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@Controller({
  path: 'sms',
  version: '1',
})
@ApiTags('SMS/v1')
export class ShortMessageController {
  constructor() {}
}
