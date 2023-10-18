import { Logger, Module } from '@nestjs/common';
import { HackersController } from './hackers.controller';
import { HackersService } from './hackers.service';

@Module({
  imports: [],
  controllers: [HackersController],
  providers: [Logger, HackersService],
  exports: [HackersService],
})
export class HackersModule {}
