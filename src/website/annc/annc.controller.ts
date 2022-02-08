import {
  Get,
  Query,
  ValidationPipe,
  UsePipes,
  Post,
  Delete,
  Body,
  Put,
} from '@nestjs/common';

import { Controller } from '@nestjs/common';
import { AnncService } from './annc.service';

@Controller('annc')
export class AnncController {
  constructor(private readonly bannerSrv: AnncService) {}

  @Get('query')
  @UsePipes(new ValidationPipe())
  async query(@Query() query) {}

  @Post('create')
  @UsePipes(new ValidationPipe())
  async create(@Body() body) {}

  @Delete('delete')
  @UsePipes(new ValidationPipe())
  async delete(@Body() body) {}

  @Put('update')
  @UsePipes(new ValidationPipe())
  async update(@Body() body) {}
}
