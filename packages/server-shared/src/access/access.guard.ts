import {
  ExecutionContext,
  Injectable,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import { PrimitiveAccessGuard } from '@indiebase/nest-ac';

@Injectable()
export class AccessGuard extends PrimitiveAccessGuard {
  protected override useRole(context: ExecutionContext): Promise<string> {
    throw new Error('Method not implemented.');
  }

  protected override useNamespace(context: ExecutionContext): Promise<string> {
    throw new Error('Method not implemented.');
  }
}
