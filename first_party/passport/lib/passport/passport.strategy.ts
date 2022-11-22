import { NacosConfigService, SubOptions } from '@letscollab/nest-nacos';
import { OnModuleInit } from '@nestjs/common';
import passport from '@fastify/passport';
import { Type } from '../interfaces';

type SubStrategy = Array<
  SubOptions & {
    getProperty: (options: Record<string, any>) => Record<string, any>;
  }
>;

export interface ObservablePassportStrategy {
  validate: (...args: any[]) => any;
  getConfigManager: () => Promise<NacosConfigService> | NacosConfigService;
  getProperties: () => Promise<SubStrategy>;
}
export interface StaticPassportStrategy {
  validate: (...args: any[]) => any;
  getStaticOptions: () => Promise<Record<string, any>>;
}

export function PassportStrategy<T extends Type<any> = any>(
  Strategy: T,
  name?: string | undefined
) {
  abstract class MixinStrategy implements OnModuleInit {
    private strategy: T;
    abstract validate(...args: any[]): any;
    abstract getConfigManager?: () =>
      | Promise<NacosConfigService>
      | NacosConfigService;
    abstract getProperties?: () => Promise<SubStrategy>;
    abstract getStaticOptions?: () => Promise<Record<string, any>>;

    async onModuleInit() {
      try {
        const callback = async (...params: any[]) => {
          const done = params[params.length - 1];
          try {
            const validateResult = await this.validate(...params);
            if (Array.isArray(validateResult)) {
              done(null, ...validateResult);
            } else {
              done(null, validateResult);
            }
          } catch (err) {
            done(err, null);
          }
        };

        const usePassport = (strategy) => {
          const passportInstance = this.getPassportInstance();
          if (name) {
            passportInstance.use(name, strategy as any);
          } else {
            passportInstance.use(strategy as any);
          }
        };

        // Dynamic configurable strategy based on Nacos.
        if (this.getConfigManager && this.getProperties) {
          const configManager = await this.getConfigManager();
          const subscriptions = await this.getProperties();

          for await (const sub of subscriptions) {
            const { getProperty, ...rest } = sub;
            await configManager.subscribe(rest, (config) => {
              const options = getProperty(config);
              const strategy = new Strategy(options, callback);

              usePassport(strategy);
            });
          }
        } else {
          const options = (await this.getStaticOptions?.()) ?? {};
          const strategy = new Strategy(options, callback);

          usePassport(strategy);
        }
      } catch (error) {
        throw error;
      }
    }

    getPassportInstance() {
      return passport;
    }
  }
  return MixinStrategy as any;
}
