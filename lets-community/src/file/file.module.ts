import { Logger, Module } from '@nestjs/common';
import { FileController } from './file.controller';
import { FileService } from './file.service';

@Module({
  controllers: [FileController],
  providers: [Logger, FileService],
  exports: [FileService],
})
export class FileModule {}
