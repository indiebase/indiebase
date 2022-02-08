import { ObsController } from './obs.controller';
import { Module } from '@nestjs/common';
import { ObsService } from './obs.service';
import { AuthModule } from '@/auth/auth.module';

@Module({
  imports: [AuthModule],
  controllers: [ObsController],
  providers: [ObsService],
})
export class ObsModule {}
