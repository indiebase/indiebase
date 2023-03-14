import { Logger, Module } from '@nestjs/common';
import { IsEntityExistedConstraint } from '@letscollab/server-shared';

@Module({
  providers: [Logger, IsEntityExistedConstraint],
})
export class AppModule {}
