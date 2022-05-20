import { MbdPay } from './sdk';
import {
  DynamicModule,
  ForwardReference,
  Global,
  Inject,
  Injectable,
  Module,
  OnModuleDestroy,
  Provider,
  Type,
} from '@nestjs/common';

export const MBD_PAY = 'mdb_pay';

export type MbdPayOptions = {
  appId: string;
  appKey: string;
};

export interface MbdPayAsyncOptions<T = MbdPayOptions> {
  /**
   * Factory function that returns an instance of the provider to be injected.
   */
  useFactory: (...args: any[]) => T;

  inject?: any[];

  imports?: Array<
    Type<any> | DynamicModule | Promise<DynamicModule> | ForwardReference
  >;
}

const createMbdPayProvider = function (options?: MbdPayOptions): Provider {
  return {
    provide: MBD_PAY,
    useValue: options,
  };
};

const createMbdPayProviderAsync = function (
  options?: MbdPayAsyncOptions,
): Provider {
  return {
    provide: MBD_PAY,
    useFactory: options.useFactory,
    inject: options.inject,
  };
};

@Injectable()
export class MbdPayService implements OnModuleDestroy {
  #client: MbdPay;

  constructor(
    @Inject(MBD_PAY)
    options?: MbdPayOptions,
  ) {
    this.#client = new MbdPay(options.appId, options.appKey);
  }

  async onModuleDestroy() {
    this.#client = null;
  }

  public get client() {
    return this.#client;
  }
}

@Module({})
@Global()
export class MbdPayModule {
  public static forRoot(options?: MbdPayOptions): DynamicModule {
    const provider = createMbdPayProvider(options);
    return {
      module: MbdPayModule,
      providers: [provider, MbdPayService],
      exports: [MbdPayService],
    };
  }

  public static forRootAsync(options?: MbdPayAsyncOptions): DynamicModule {
    const provider = createMbdPayProviderAsync(options);

    return {
      module: MbdPayModule,
      providers: [provider, MbdPayService],
      exports: [MbdPayService],
      imports: options.imports ?? [],
    };
  }
}
