import { OnModuleInit } from '@nestjs/common';
import * as passport from 'passport';
import { Type } from '../interfaces';

export interface IPassportStrategy {
  validate: (...args: any[]) => any;
  setOptions: () => Promise<Record<string, any>> | Record<string, any>;
}

export function PassportStrategy<T extends Type<any> = any>(
  Strategy: T,
  name?: string | undefined
) {
  abstract class MixinStrategy implements OnModuleInit {
    private strategy: T;
    abstract validate(...args: any[]): any;
    abstract setOptions(): Promise<Record<string, any>> | Record<string, any>;

    async onModuleInit() {
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

      const options = await this.setOptions();
      this.strategy = new Strategy(options, callback);

      const passportInstance = this.getPassportInstance();
      if (name) {
        passportInstance.use(name, this.strategy as any);
      } else {
        passportInstance.use(this.strategy as any);
      }
    }

    getPassportInstance() {
      return passport;
    }
  }
  return MixinStrategy as any;
}
