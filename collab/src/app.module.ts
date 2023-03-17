import { Logger, Module } from '@nestjs/common';
import { IsEntityExistedConstraint } from '@letscollab/server-shared';
import { OctokitModule } from '@letscollab/nest-octokit';

@Module({
  imports: [
    OctokitModule.forRootAsync({
      async useFactory() {
        return {
          optionsFactory(req) {
            return {
              auth: req.session?.user?.githubAccessToken,
            };
          },
        };
      },
    }),
  ],
  providers: [Logger, IsEntityExistedConstraint],
})
export class AppModule {}
