import {
  Controller,
  Delete,
  InternalServerErrorException,
  Logger,
  Param,
  Put,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileService } from './file.service';
import { PublicApiGuard } from '@letscollab/server-shared';
import { ApiBody, ApiConsumes, ApiOperation } from '@nestjs/swagger';
import {
  FileInterceptor,
  FilesInterceptor,
  MemoryStorageFile,
  UploadedFiles,
} from '@letscollab-nest/fastify-file';
import { FilesUploadDto } from './file.dto';
import { ResultCode } from '@letscollab/trait';

@Controller({
  path: 'file',
  version: '1',
})
export class FileController {
  constructor(
    private readonly fileService: FileService,
    private readonly logger: Logger,
  ) {}

  @Put('upload/:bucket')
  @ApiConsumes('multipart/form-data')
  @ApiBody({ type: FilesUploadDto })
  @UseInterceptors(FilesInterceptor('files'))
  @ApiOperation({
    summary: 'Upload file',
  })
  @UseGuards(PublicApiGuard)
  async uploadFiles(
    @UploadedFiles() files: MemoryStorageFile[],
    @Param('bucket') bucket: string,
  ) {
    const d = await this.fileService
      .save2Bucket(files, { bucket })
      .catch((err) => {
        this.logger.error(err);
        throw new InternalServerErrorException({
          code: ResultCode.ERROR,
          message: 'Upload file failed',
        });
      });
    return {
      code: ResultCode.SUCCESS,
      d,
    };
  }

  @Put('upload/signed')
  @ApiConsumes('multipart/form-data')
  @ApiBody({ type: FilesUploadDto })
  @ApiOperation({
    summary: 'Upload file and return the signed url',
  })
  @UseGuards(PublicApiGuard)
  @UseInterceptors(FilesInterceptor('files'))
  async uploadFilesSignedUrl(@UploadedFiles() files: MemoryStorageFile[]) {
    const d = await this.fileService
      .save2Bucket(files, { signedUrl: true })
      .catch((err) => {
        console.error(err);
        throw new InternalServerErrorException();
      });
    return {
      code: ResultCode.SUCCESS,
      d,
    };
  }

  @Delete()
  @UseInterceptors(FileInterceptor('file'))
  async deleteFile() {
    return {
      code: ResultCode.SUCCESS,
    };
  }
}
