import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import {
  ApiCookieAuth,
  ApiOkResponse,
  ApiTags,
  ApiOperation,
} from '@nestjs/swagger';
import {
  CreatePrjDto,
  DeletePrjDto,
  PrjListResDto,
  QueryPrjDto,
  UpdatePrjDto,
} from './prj.dto';

@Controller('v1/prj')
@ApiTags('v1/Project')
export class PrjController {
  constructor() {}

  @Get('list')
  @ApiCookieAuth('SID')
  @ApiOperation({
    summary: 'Get project list',
  })
  @ApiOkResponse({
    type: PrjListResDto,
  })
  async prjList(@Query() query: QueryPrjDto) {}

  @Post()
  @ApiCookieAuth('SID')
  async createPrj(@Body() body: CreatePrjDto) {}

  @Put()
  @ApiCookieAuth('SID')
  async updatePrj(@Body() body: UpdatePrjDto) {}

  @Delete()
  @ApiCookieAuth('SID')
  async deletePrj(@Body() body: DeletePrjDto) {}
}
