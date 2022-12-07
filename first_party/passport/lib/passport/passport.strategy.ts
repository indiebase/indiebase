import { OnModuleInit } from '@nestjs/common';
import passport from '@fastify/passport';
import { Type } from '../interfaces';

type UsePassportHook = (
  strategy: (options) => Type<any>,
  fn: (p) => void
) => void;

export interface ObservablePassportStrategy {
  validate: (...args: any[]) => any;
  usePassport?: UsePassportHook;
}

export interface StaticPassportStrategy {
  validate(...args: any[]): any;
  useStaticOptions?: () => Promise<Record<string, any>>;
}

export function PassportStrategy<T extends Type<any> = any>(
  Strategy: T,
  name?: string | undefined
) {
  abstract class MixinStrategy implements OnModuleInit {
    abstract validate(...args: any[]): any;
    abstract usePassport?: UsePassportHook;
    abstract useStaticOptions?: () => Promise<Record<string, any>>;

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

        const use = (strategy) => {
          const passportInstance = this.getPassportInstance();
          if (name) {
            passportInstance.use(name, strategy as any);
          } else {
            passportInstance.use(strategy as any);
          }
        };

        // Support Dynamic configurable.
        if (this.usePassport) {
          this.usePassport((options) => new Strategy(options, callback), use);
        } else {
          const options = (await this.useStaticOptions?.()) ?? {};
          const strategy = new Strategy(options, callback);

          use(strategy);
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
