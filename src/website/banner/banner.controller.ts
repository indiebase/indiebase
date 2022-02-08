import {
  CreateBannerDto,
  DeleteBannerDto,
  QueryBannerDto,
  UpdateBannerDto,
} from './banner.dto';
import { StatusCode } from '@/common';
import {
  Get,
  Query,
  ValidationPipe,
  UsePipes,
  Post,
  Delete,
  Body,
  Put,
  UseGuards,
} from '@nestjs/common';

import { Controller } from '@nestjs/common';
import { BannerService } from './banner.service';
import { JwtAuthGuard } from '@/auth/jwt.guard';

@Controller('site/banner')
export class SiteBannerController {
  constructor(private readonly bannerSrv: BannerService) {}
  @Get('list')
  @UsePipes(new ValidationPipe())
  async list() {
    return this.bannerSrv.queryActiveBanners();
  }
}

@Controller('dash/banner')
@UseGuards(JwtAuthGuard)
export class DashBannerController {
  constructor(private readonly bannerSrv: BannerService) {}

  @Get('query')
  @UsePipes(new ValidationPipe())
  async query(@Query() query: QueryBannerDto) {
    let message,
      code = StatusCode.SUCCESS;
    const data = await this.bannerSrv.queryBanners(query).catch((err) => {
      console.error(err);
      message = '查询失败';
      code = StatusCode.ERROR;
    });

    return {
      code,
      message,
      data,
    };
  }

  @Post('create')
  @UsePipes(new ValidationPipe())
  async create(@Body() body: CreateBannerDto) {
    let message = '创建成功',
      code = StatusCode.SUCCESS;
    const data = await this.bannerSrv.createBanner(body).catch((err) => {
      console.error(err);
      message = '创建资源失败';
      code = StatusCode.ERROR;
    });

    return {
      code,
      message,
      data,
    };
  }

  @Delete('delete')
  @UsePipes(new ValidationPipe())
  async delete(@Body() body: DeleteBannerDto) {
    let message = '删除成功',
      code = StatusCode.SUCCESS;
    await this.bannerSrv.deleteBanner(body.id).catch((err) => {
      console.error(err);
      message = '删除失败';
      code = StatusCode.ERROR;
    });

    return {
      code,
      message,
    };
  }

  @Put('update')
  @UsePipes(new ValidationPipe())
  async update(@Body() body: UpdateBannerDto) {
    let message,
      code = StatusCode.SUCCESS;
    await this.bannerSrv.updateBanner(body).catch((err) => {
      console.error(err);
      message = '更新失败';
      code = StatusCode.ERROR;
    });

    return {
      code,
      message,
    };
  }
}
