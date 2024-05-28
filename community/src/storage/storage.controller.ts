import { ResultCode } from '@indiebase/sdk';
import {
  ApiUnionResponse,
  ApiUnionType1Header,
  data,
  OkedResponseSchema,
  Project,
  // FilesSizeValidationPipe,
  PublicApiGuard,
} from '@indiebase/server-shared';
import { PrimitiveProject } from '@indiebase/trait';
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
  constructor(private readonly storage: StorageService) {}

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
    @Param('bucket') bucket: string,
  ): Promise<OkedResponseSchema<FileDTO[]>> {
    const results = await this.storage.save(bucket, req);

    return data({
      code: ResultCode.SUCCESS,
      body: results,
    });
  }

  @ApiOperation({
    summary: 'Create a bucket',
    description: 'Receives a bucket name and creates the bucket.',
  })
  @ApiUnionResponse('created')
  @ApiUnionType1Header()
  @UseGuards(PublicApiGuard, PasetoAuthGuard)
  @ApiBearerAuth('paseto')
  @Post('bucket')
  async create(
    @Project() project: PrimitiveProject,
    @Body() bucket: CreateBucketDTO,
  ): Promise<OkedResponseSchema> {
    await this.storage.create(bucket.bucket, bucket.description!, project);

    return data({
      code: ResultCode.SUCCESS,
      message: 'Create successfully',
    });
  }

  @ApiOperation({
    summary: 'Get project buckets',
    description: 'Get project all buckets',
  })
  @ApiUnionResponse('array', BucketDTO)
  @ApiUnionType1Header()
  @UseGuards(PublicApiGuard, PasetoAuthGuard)
  @ApiBearerAuth('paseto')
  @Get('buckets')
  async getBuckets(
    @Project() project: PrimitiveProject,
  ): Promise<OkedResponseSchema<BucketDTO[]>> {
    const buckets = await this.storage.getBuckets(project);

    return data({
      code: ResultCode.SUCCESS,
      body: buckets,
    });
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
    const result = await this.storage.getFile(bucket, key);

    if (result) {
      res
        .header('Content-Disposition', result.ContentDisposition)
        .header('ETag', result.ETag)
        .header('Content-Length', result.ContentLength)
        .header('Accept-Ranges', result.AcceptRanges)
        .type(result.ContentType!)
        .send(result.Body);
    }
  }

  @ApiOperation({
    summary: 'Delete a bucket',
    description: 'Receives a bucket name and deletes the bucket.',
  })
  @ApiParam({
    name: 'bucket',
    type: 'string',
    schema: {
      default: 'publish',
    },
  })
  @ApiUnionResponse()
  @ApiUnionType1Header()
  @ApiBearerAuth('paseto')
  @UseGuards(PublicApiGuard, PasetoAuthGuard)
  @Delete('buckets/:bucket')
  async deleteBucket(
    @Param('bucket') bucket: string,
    @Project() project: PrimitiveProject,
  ): Promise<OkedResponseSchema> {
    await this.storage.softDeleteBucket(bucket, project);

    return data({
      code: ResultCode.SUCCESS,
    });
  }

  @ApiOperation({
    summary: 'Permanently delete a bucket',
    description: 'Receives a bucket name and permanently deletes the bucket.',
  })
  @ApiParam({
    name: 'bucket',
    type: 'string',
    schema: {
      default: 'publish',
    },
  })
  @ApiUnionResponse()
  @ApiUnionType1Header()
  @ApiBearerAuth('paseto')
  @UseGuards(PublicApiGuard, PasetoAuthGuard)
  @Delete('buckets/:bucket/permanent')
  async deleteBucketPermanently(
    @Param('bucket') bucket: string,
    @Project() project: PrimitiveProject,
  ): Promise<OkedResponseSchema> {
    await this.storage.deleteBucket(bucket, project);

    return data({
      code: ResultCode.SUCCESS,
    });
  }
}
