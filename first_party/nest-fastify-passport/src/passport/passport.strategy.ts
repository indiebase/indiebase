import { OnModuleInit } from '@nestjs/common';
import passport from '@fastify/passport';
import { Type } from '../interfaces';
type UseStrategyHook = (
  strategy: (options) => Type<any>,
  fn: (p) => void,
) => Promise<void> | void;

/**
 *
 * Dynamic configurable
 *
 * @example
 * ```ts
 * export class GithubStrategy extends PassportStrategy(Strategy) implements PassportStrategyFactory {
 *    async useStrategy(AppStrategy, use) {
 *       this.remoteConfigService.on('xx', (event)=>{
 *          use(AppStrategy(event.options))
 *       })
 *    }
 * }
 * ```
 */
export interface PassportStrategyFactory {
  validate: (...args: any[]) => any;

  /**
   * It is very useful for dynamic configuration.
   *
   * ```ts
   *  useStrategy(appStrategy, use){   // e.g appStrategy is the LocalStrategy
   *    remoteConfig.subscribe('xxx-config',(config)=>{
   *      use(appStrategy(config));    // ->  use(LocalStrategy({usernameField: config.usernameField}))
   *    })
   *  }
   * ```
   */
  useStrategy?: UseStrategyHook;

  /**
   *
   * @returns
   */
  useStrategyOptions?: () => Promise<Record<string, any>> | Record<string, any>;
}

export function PassportStrategy<T extends Type<any> = any>(
  Strategy: T,
  name?: string | undefined,
) {
  abstract class MixinStrategy implements OnModuleInit {
    abstract validate(...args: any[]): any;
    abstract useStrategy?: UseStrategyHook;
    abstract useStrategyOptions?: () =>
      | Promise<Record<string, any>>
      | Record<string, any>;

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
            passportInstance.use(name, strategy);
          } else {
            passportInstance.use(strategy);
          }
        };

        // Support Dynamic configurable.
        if (this.useStrategy) {
          this.useStrategy((options) => new Strategy(options, callback), use);
        } else {
          const options = (await this.useStrategyOptions?.()) ?? {};
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
