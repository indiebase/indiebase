import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@letscollab/passport';

@Injectable()
export class LocalAuthGuard extends AuthGuard('local') {}
