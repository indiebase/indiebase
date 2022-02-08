import { JwtAuthGuard } from '@/auth/jwt.guard';
import { StatusCode } from '@/common';
import {
  Controller,
  InternalServerErrorException,
  Put,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ObsService } from './obs.service';
@Controller('obs')
@UseGuards(JwtAuthGuard)
export class ObsController {
  constructor(private readonly obsSrv: ObsService) {}

  @Put('upload')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(@UploadedFile() file: Express.Multer.File) {
    const data = await this.obsSrv.upload(file).catch((err) => {
      console.error(err);
      throw new InternalServerErrorException();
    });
    return {
      code: StatusCode.SUCCESS,
      data,
    };
  }

  @Put('delete')
  @UseInterceptors(FileInterceptor('file'))
  async deleteFile(@UploadedFile() file: Express.Multer.File) {
    const data = await this.obsSrv.upload(file).catch((err) => {
      console.error(err);
      throw new InternalServerErrorException();
    });
    return {
      code: StatusCode.SUCCESS,
      data,
    };
  }
}
