import { ResultCode } from '@indiebase/sdk';
import {
  ApiUnionResponse,
  ApiUnionType1Header,
  data,
  OkedResponseSchema,
  PaginatedResponseSchema,
  Project,
  // FilesSizeValidationPipe,
  PublicApiGuard,
} from '@indiebase/server-shared';
import { PrimitiveProject } from '@indiebase/trait';
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
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { FastifyReply, FastifyRequest } from 'fastify';

import { PasetoAuthGuard } from '../auth';
import { BucketDTO, CreateBucketDTO, FileDTO } from './storage.dto';
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
  @ApiParam({
    name: 'bucket',
    type: 'string',
    schema: {
      default: 'publish',
    },
  })
  @ApiUnionResponse('array', FileDTO)
  @ApiUnionType1Header()
  @ApiConsumes('multipart/form-data')
  @ApiBody({ type: FilesUploadDTO })
  @UseGuards(PublicApiGuard)
  @Put(':bucket/upload/files')
  async uploadFiles(
    @Req() req: FastifyRequest,
    @Project() project: PrimitiveProject,
    @Param('bucket') bucket: string,
  ): Promise<OkedResponseSchema<FileDTO[]>> {
    const files = await req.files();
    const results = await this.storage.save(bucket, files);

    return data({
      code: ResultCode.SUCCESS,
      body: results,
    });
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
  @ApiUnionResponse('created')
  @ApiUnionType1Header()
  @UseGuards(PublicApiGuard, PasetoAuthGuard)
  @ApiBearerAuth('paseto')
  @Post('bucket')
  async createBucket(
    @Project() project: PrimitiveProject,
    @Body() bucket: CreateBucketDTO,
  ): Promise<OkedResponseSchema> {
    await this.storage.createBucket(
      project,
      bucket.bucket,
      bucket.description!,
    );

    return data({
      message: 'Create successfully',
      code: ResultCode.SUCCESS,
    });
  }

  @ApiOperation({
    summary: 'Get buckets',
  })
  @ApiUnionResponse('paginated')
  @ApiUnionType1Header()
  @UseGuards(PublicApiGuard, PasetoAuthGuard)
  @Get('buckets')
  async getBuckets(): Promise<PaginatedResponseSchema<BucketDTO>> {
    return data({
      code: ResultCode.SUCCESS,
      body: [],
    }) as any;
  }

  @ApiOperation({
    summary: 'Get an object from Object-based storage device',
  })
  @ApiParam({
    name: 'bucket',
    type: 'string',
    schema: {
      default: 'publish',
    },
  })
  @Get(':bucket/:key')
  @ApiUnionResponse()
  @ApiUnionType1Header()
  @UseGuards(PublicApiGuard)
  async getFile(
    @Res() res: FastifyReply,
    @Param('bucket') bucket: string,
    @Param('key') key: string,
  ) {
    const r = await this.storage.getFile(bucket, key);

    return r;
    // if (r) {
    //   res
    //     .header('Content-Disposition', r.ContentDisposition)
    //     .header('ETag', r.ETag)
    //     .header('Content-Length', r.ContentLength)
    //     .header('Accept-Ranges', r.AcceptRanges)
    //     .type(r.ContentType!)
    //     .send(r.Body);
    // }
  }

  @Delete('buckets/:bucket')
  @ApiOperation({
    summary: 'Delete a bucket',
    description: 'Receives a bucket name and deletes the bucket.',
  })
  @UseGuards(PublicApiGuard)
  async deleteBucket(@Param('bucket') bucket: string) {
    // await this.storage.softDeleteBucket(name);
    return {
      code: ResultCode.SUCCESS,
    };
  }
}
