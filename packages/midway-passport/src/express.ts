import { REQUEST_OBJ_CTX_KEY } from '@midwayjs/core';
import { PassportControlConstructor } from './control';
import * as passport from 'passport';

export interface Class<T = any> {
  new (...args: any[]): T;
}

type ExternalOverride = {
  verify(...args: any[]): Promise<{}>;
};

/**
 * Express
 * passport strategy 适配器
 *
 * @param Strategy passport策略
 * @param name
 * @param rest Strategy 其余参数
 * @returns {Strategy}
 */
export function ExpressPassportStrategyAdapter<T extends Class<any> = any>(
  Strategy: T,
  name?: string,
  ...syncArgs: any[]
): { new (...args): InstanceType<T> & ExternalOverride } {
  /**
   * @abstract
   * @private
   */
  abstract class TmpStrategy extends Strategy {
    constructor(...asyncArgs: any[]) {
      const cb = async (...params: any[]) => {
        const done = params[params.length - 1];
        try {
          const result = await this.verify(...params);
          if (Array.isArray(result)) {
            done(null, ...result);
          } else {
            done(null, result);
          }
        } catch (err) {
          done(err, null);
        }
      };

      // 优先使用同步参数
      super(...(syncArgs.length > 0 ? syncArgs : asyncArgs), cb);

      if (name) {
        passport.use(name, this as any);
      } else {
        passport.use(this as any);
      }
    }

    /**
     *
     * @protected
     * @param args
     */
    protected abstract verify(...args: any[]): {};
  }
  return TmpStrategy;
}

/**
 *
 * Express
 *
 * @param {PassportControlConstructor} Sentry 处理校验
 * @param options 请查看相应策略authenticate的参数
 *
 */
export function Frontier(Control: PassportControlConstructor, options?: {}): MethodDecorator & ClassDecorator {
  return function (Target, _targetKey: string, descriptor: TypedPropertyDescriptor<any>) {
    const control = new Control();
    if (!control.name) {
      throw new Error('[Sentry]: target needs name property');
    }

    const handle = function (method) {
      return function (...args) {
        const { req, res } = this[REQUEST_OBJ_CTX_KEY];
        passport.authenticate(control.name, options, control.auth)(req, res, control.onError);
        return method.apply(this, [...args]);
      };
    };

    if (descriptor) {
      const method = descriptor.value;
      if (typeof method === 'function') {
        descriptor.value = handle(method);
      } else {
        throw new Error('[Frontier]: target needs to be function');
      }
    } else {
      for (const key of Reflect.ownKeys(Target.prototype)) {
        const method = Target.prototype[key];
        if (key === 'constructor' || typeof method !== 'function') {
          continue;
        }

        Target.prototype[key] = handle(method);
      }
    }
  } as any;
}
