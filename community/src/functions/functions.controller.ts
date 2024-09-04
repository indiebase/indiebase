import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@Controller({
  path: 'functions',
  version: '1',
})
@ApiTags('Functions/v1')
export class FunctionsController {
  constructor() {}
}
