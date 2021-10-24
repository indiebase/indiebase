import { REQUEST_OBJ_CTX_KEY } from '@midwayjs/core';
import * as koaPassport from 'koa-passport';
import { PassportControlConstructor } from './control';

export interface Class<T = any> {
  new (...args: any[]): T;
}

type ExternalOverride = {
  verify(...args: any[]): Promise<any>;
};

/**
 * Koa
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

      super(...(syncArgs.length > 0 ? syncArgs : asyncArgs), cb);

      if (name) {
        koaPassport.use(name, this as any);
      } else {
        koaPassport.use(this as any);
      }
    }
    protected abstract verify(...args: any[]): any;
  }
  return TmpStrategy;
}

/**
 * Koa
 * @param check 校验策略的name
 * @param options 请查看相应策略authenticate的参数
 *
 */

export function Frontier(Control: PassportControlConstructor, options?: {}): MethodDecorator & ClassDecorator {
  return function (Target, _targetKey: string, descriptor: TypedPropertyDescriptor<any>) {
    const control = new Control();
    if (!control.name) {
      throw new Error('[Frontier]: target needs name property');
    }

    const handle = function (method) {
      return function (...args) {
        const { ctx, request } = this[REQUEST_OBJ_CTX_KEY];
        try {
          if (ctx) {
            koaPassport.authenticate(control.name, options, control.auth)(ctx, null);
          } else {
            // 支持 Egg
            if (request) {
              koaPassport.authenticate(control.name, options, control.auth)(request.ctx, null);
            } else {
              throw new Error('[Frontier]: not support current Framework');
            }
          }
        } catch (error) {
          control.onError(error);
        }
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
