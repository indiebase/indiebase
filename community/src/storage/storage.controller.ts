import { MemoryStorageFile } from '@indiebase/nest-fastify-file';
import { FilesInterceptor, UploadedFiles } from '@indiebase/nest-fastify-file';
import { ResultCode } from '@indiebase/sdk';
import {
  ApiUnionResponse,
  ApiUnionType1Header,
  OkResponseSchema,
  // FilesSizeValidationPipe,
  PublicApiGuard,
} from '@indiebase/server-shared';
import { Logger } from '@nestjs/common';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Req,
  Res,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { FastifyReply, FastifyRequest } from 'fastify';

import { PasetoAuthGuard } from '../auth';
import { CreateBucketDTO } from './storage.dto';
import { FilesUploadDTO } from './storage.dto';
import { StorageService } from './storage.service';

@Controller({
  path: 'storage',
  version: '1',
})
@ApiTags('Storage/v1')
export class StorageController {
  constructor(
    private readonly storage: StorageService,
    private readonly logger: Logger,
  ) {}

  // @Put(':bucket/upload/file')
  // @ApiConsumes('multipart/form-data')
  // @ApiBody({ type: FileUploadDTO })
  // @UseInterceptors(FileInterceptor('file'))
  // @ApiOperation({
  //   summary: 'Upload single file',
  //   description:
  //     'Receives a file and an associated bucket for uploading the file into the specified bucket.',
  // })
  // @UseGuards(PublicApiGuard)
  // async uploadFile(
  //   @UploadedFile() file: MemoryStorageFile,
  //   @Param('bucket') bucket: string,
  // ) {
  //   const d = await this.storage
  //     .save2Bucket([file], { bucket })
  //     .catch((err) => {
  //       this.logger.error(err);
  //       throw new InternalServerErrorException({
  //         code: ResultCode.ERROR,
  //         message: 'Upload file failed',
  //       });
  //     });
  //   return {
  //     code: ResultCode.SUCCESS,
  //     d,
  //   };
  // }

  @ApiOperation({
    summary: 'Upload multiple files',
    description:
      'Receives multiple files and an associated bucket for uploading the files into the specified bucket.',
  })
  @ApiUnionResponse()
  @ApiUnionType1Header()
  @ApiConsumes('multipart/form-data')
  @ApiBody({ type: FilesUploadDTO })
  @UseInterceptors(FilesInterceptor('files', Infinity))
  @UseGuards(PublicApiGuard)
  @Put(':bucket/upload/files')
  async uploadFiles(
    @Req() req: FastifyRequest,
    @UploadedFiles()
    files: MemoryStorageFile[],
    @Param('bucket') bucket: string,
  ) {
    console.log(files);

    // const d = await this.storage.save2Bucket(files, { bucket }).catch((err) => {
    //   this.logger.error(err);
    //   throw new InternalServerErrorException({
    //     code: ResultCode.ERROR,
    //     message: 'Upload file failed',
    //   });
    // });
    return {
      code: ResultCode.SUCCESS,
      // d,
    };
  }

  // @Put(':bucket/upload/file/')
  // @ApiConsumes('multipart/form-data')
  // @ApiBody({ type: FilesUploadDTO })
  // @ApiOperation({
  //   summary: 'Upload file and return the signed url',
  // })
  // @UseGuards(PublicApiGuard)
  // @UseInterceptors(FilesInterceptor('files'))
  // async uploadFilesSignedUrl(@UploadedFiles() files: MemoryStorageFile[]) {
  //   const d = await this.storage
  //     .save2Bucket(files, { signedUrl: true })
  //     .catch((err) => {
  //       console.error(err);
  //       throw new InternalServerErrorException();
  //     });
  //   return {
  //     code: ResultCode.SUCCESS,
  //     d,
  //   };
  // }

  @ApiOperation({
    summary: 'Create a bucket',
    description: 'Receives a bucket name and creates the bucket.',
  })
  @ApiUnionResponse()
  @ApiUnionType1Header()
  @UseGuards(PublicApiGuard, PasetoAuthGuard)
  @ApiBearerAuth('paseto')
  @Post('bucket')
  async createBucket(
    @Body() bucket: CreateBucketDTO,
  ): Promise<OkResponseSchema> {
    await this.storage.createBucket(bucket.bucket, bucket.description!);

    return {
      code: ResultCode.SUCCESS,
    };
  }

  @Get('buckets')
  @ApiOperation({
    summary: 'Get buckets list',
  })
  @UseGuards(PublicApiGuard)
  async getBuckets(): Promise<OkResponseSchema> {
    return {
      code: ResultCode.SUCCESS,
    };
  }

  @Get('buckets/:bucket/files/:id')
  @ApiOperation({
    summary: '',
  })
  @UseGuards(PublicApiGuard)
  async getFile(
    @Req() req: any,
    @Res() res: FastifyReply,
    @Param('bucket') bucket: string,
    @Param('id') id: string,
  ) {}

  @Delete('buckets/:bucket')
  @ApiOperation({
    summary: 'Delete a bucket',
    description: 'Receives a bucket name and deletes the bucket.',
  })
  @UseGuards(PublicApiGuard)
  async deleteBucket(@Param('bucket') name: string) {
    await this.storage.deleteBucket(name);
    return {
      code: ResultCode.SUCCESS,
    };
  }
}
