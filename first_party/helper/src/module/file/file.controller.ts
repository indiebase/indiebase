import {
  Controller,
  Delete,
  InternalServerErrorException,
  Param,
  Put,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileService } from './file.service';
import { ProtectGuard } from '@letscollab-nest/helper';
import { ApiBody, ApiConsumes, ApiOperation } from '@nestjs/swagger';
import {
  FileInterceptor,
  FilesInterceptor,
  MemoryStorageFile,
  UploadedFiles,
} from '@letscollab-nest/file-fastify';
import { FilesUploadDto } from './file.dto';
import { ResultCode } from '@letscollab-nest/trait';

@Controller({
  path: 'file',
  version: '1',
})
export class FileController {
  constructor(private readonly fileService: FileService) {}

  @Put('upload/:bucket')
  @ApiConsumes('multipart/form-data')
  @ApiBody({ type: FilesUploadDto })
  @UseInterceptors(FilesInterceptor('files'))
  @ApiOperation({
    summary: 'Upload file',
  })
  @UseGuards(ProtectGuard)
  async uploadFiles(
    @UploadedFiles() files: MemoryStorageFile[],
    @Param('bucket') bucket: string,
  ) {
    const d = await this.fileService
      .save2Bucket(files, { bucket })
      .catch((err) => {
        console.error(err);
        throw new InternalServerErrorException();
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
  @UseGuards(ProtectGuard)
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
