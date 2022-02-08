import { ApiOperation } from '@nestjs/swagger';
import {
  CreatePossessionDto,
  QueryPossessionDto,
  DeletePossessionDto,
  TreePossessionDto,
} from './possession.dto';
import { PossessionService } from './possession.service';
import {
  Controller,
  Get,
  Post,
  Delete,
  Put,
  Body,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { StatusCode } from '@/common';

// @UseGuards(JwtAuthGuard)
@Controller('possession')
export class PossessionController {
  constructor(private readonly possessionSrv: PossessionService) {}

  @Post('create')
  @UsePipes(new ValidationPipe())
  async create(@Body() body: CreatePossessionDto) {
    let message = '创建成功',
      code = StatusCode.SUCCESS;
    const data = await this.possessionSrv
      .createPossession(body)
      .catch((err) => {
        console.error(err);
        message = '创建资源失败';
        code = StatusCode.ERROR;

        if (err.code === 'ER_DUP_ENTRY') {
          message = '资源参数重复';
        }
      });

    return {
      code,
      message,
      data,
    };
  }

  @Delete('delete')
  @UsePipes(new ValidationPipe())
  async delete(@Body() body: DeletePossessionDto) {
    let message = '删除成功',
      code = StatusCode.SUCCESS;

    const r = await this.possessionSrv.delPossession(body.id).catch((err) => {
      message = '删除失败';
      code = StatusCode.ERROR;
      console.error(err);
    });

    if (r && r.affected === 0) {
      message = '资源不存在';
      code = StatusCode.ERROR;
    }

    return {
      code,
      message,
    };
  }

  @Put('update')
  @UsePipes(new ValidationPipe())
  async update(@Body() body: CreatePossessionDto) {
    let message = '修改成功',
      code = StatusCode.SUCCESS;
    await this.possessionSrv.updatePossession(body).catch(() => {
      message = '修改失败';
      code = StatusCode.ERROR;
    });
    return {
      code,
      message,
    };
  }

  @Get('tree')
  @ApiOperation({ summary: '获取资源树' })
  async tree(@Query() query: TreePossessionDto) {
    let message,
      code = StatusCode.SUCCESS;
    // console.log(query.showLeaf, is.string(query.showLeaf));
    // const showLeaf = is.string(query.showLeaf) ? parseInt(query.showLeaf) : 1;
    const data = await this.possessionSrv
      .getPossessionsTree(parseInt(query.id))
      .catch((err) => {
        console.error(err);
        message = '获取资源失败';
        code = StatusCode.ERROR;
      });

    return {
      code,
      message,
      data,
    };
  }

  @Get('query')
  @UsePipes(new ValidationPipe())
  async query(@Query() query: QueryPossessionDto) {
    let message,
      code = StatusCode.SUCCESS;
    const data = await this.possessionSrv
      .queryPossessions(parseInt(query.pid))
      .catch((err) => {
        console.error(err);
        message = '获取资源失败';
        code = StatusCode.ERROR;
      });
    return {
      code,
      message,
      data,
    };
  }
}
