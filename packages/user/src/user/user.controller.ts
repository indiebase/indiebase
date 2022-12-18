import { Controller, UseFilters } from '@nestjs/common';
import { UserService } from './user.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { MicroserviceExceptionFilter } from '@letscollab-nest/helper';

@Controller()
export class UserController {
  constructor(private readonly user: UserService) {}

  @MessagePattern({ cmd: 'get_complete_name' })
  async getFullUser(@Payload() username: string) {
    return this.user.getUser([{ username }], { full: true });
  }

  @MessagePattern({ cmd: 'get_name' })
  async getName(@Payload() username: string) {
    return this.user.getUser([{ username }]);
  }

  @MessagePattern({ cmd: 'get_id' })
  async getId(@Payload() id: number) {
    return this.user.getUser([{ id }]);
  }

  @UseFilters(MicroserviceExceptionFilter)
  @MessagePattern({ cmd: 'signIn_github' })
  async signInGithub(@Payload() user: any) {
    const { profile, accessToken } = user;
    const { _json: json, username, profileUrl, id, displayName } = profile;

    return this.user.signIn({
      username: username,
      profileUrl: profileUrl,
      githubId: id,
      nickname: displayName,
      email: json?.email,
      avatar: json?.avatar_url,
      bio: json?.bio,
      githubAccessToken: accessToken,
    });
  }
}
