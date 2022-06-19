import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@letscollab/passport';

@Injectable()
export class SessionGuard extends AuthGuard('cookie') {}
