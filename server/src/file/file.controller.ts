import {
  Controller,
  Delete,
  InternalServerErrorException,
  Put,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileService } from './file.service';
import { ProtectGuard, ResultCode } from '@letscollab-nest/helper';
import { ApiBody, ApiConsumes, ApiOperation } from '@nestjs/swagger';
import {
  FileInterceptor,
  FilesInterceptor,
  MemoryStorageFile,
  UploadedFiles,
} from '@letscollab-nest/file-fastify';
import { FilesUploadDto } from './file.dto';

@Controller({
  path: 'file',
  version: '1',
})
export class FileController {
  constructor(private readonly fileService: FileService) {}

  @Put('upload')
  @ApiConsumes('multipart/form-data')
  @ApiBody({ type: FilesUploadDto })
  @UseInterceptors(FilesInterceptor('files'))
  @ApiOperation({
    summary: 'Upload file',
  })
  @UseGuards(ProtectGuard)
  async uploadFiles(@UploadedFiles() files: MemoryStorageFile[]) {
    const d = await this.fileService.save2Bucket(files).catch((err) => {
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
