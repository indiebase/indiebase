import { Provider } from '@nestjs/common';
import { MetaService } from './meta.service';

export const createMetadataProvider = function (): Provider {
  return {
    provide: MetaService,
    async useFactory() {},
    inject: [],
  };
};
