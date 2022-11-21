import { NacosConfigService, SubOptions } from '@letscollab/nest-nacos';
import { OnModuleInit } from '@nestjs/common';
import * as passport from 'passport';
import { Type } from '../interfaces';
import { NacosConfigClient } from 'nacos-config';

type SubStrategy = Array<
  SubOptions & {
    getProperty: (options: Record<string, any>) => Record<string, any>;
  }
>;

export interface IPassportStrategy {
  validate: (...args: any[]) => any;
  getConfigManager: () => Promise<NacosConfigService> | NacosConfigService;

  getProperties: (options: any) => Promise<SubStrategy>;
}

export function PassportStrategy<T extends Type<any> = any>(
  Strategy: T,
  name?: string | undefined
) {
  abstract class MixinStrategy implements OnModuleInit {
    private strategy: T;
    abstract validate(...args: any[]): any;
    abstract getConfigManager():
      | Promise<NacosConfigService>
      | NacosConfigService;
    abstract getProperties: () => Promise<SubStrategy>;

    finalizers: NacosConfigClient[];

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
        /**
         * Commented out due to the regression it introduced
         * Read more here: https://github.com/nestjs/passport/issues/446

          const validate = new.target?.prototype?.validate;
          if (validate) {
            Object.defineProperty(callback, 'length', {
              value: validate.length + 1
            });
          }
        */

        const configManager = await this.getConfigManager();
        const subscriptions = await this.getProperties();

        for await (const sub of subscriptions) {
          const { getProperty, ...rest } = sub;
          const s = await configManager.subscribe(rest, (config) => {
            const options = getProperty(config);
            this.strategy = new Strategy(options, callback);

            const passportInstance = this.getPassportInstance();
            if (name) {
              passportInstance.use(name, this.strategy as any);
            } else {
              passportInstance.use(this.strategy as any);
            }
          });
          this.finalizers.push(s);
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
