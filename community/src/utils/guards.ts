import { ProtectGuard as InnerProtectGuard } from '@letscollab-nest/helper';

export const CoProtectGuard = InnerProtectGuard('mutable.json');
