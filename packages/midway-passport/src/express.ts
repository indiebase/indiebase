import * as passport from 'passport';
import { IWebMiddleware, Middleware } from '@midwayjs/express';

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

export interface ExpressPassportMiddleware {
  setOptions?(...args: any[]): Promise<null | Record<string, any>>;
}

/**
 *
 * Express Passport 中间件
 *
 */
export abstract class ExpressPassportMiddleware implements IWebMiddleware {
  /**
   *
   * @param args  verify() 中返回的参数 @see {ExpressPassportStrategyAdapter}
   */
  protected abstract auth(...args: any[]): Promise<Record<any, any>>;

  /**
   * 鉴权名
   */
  protected abstract strategy: string;

  protected abstract onError(...args: any[]): void;
  //@ts-ignore
  protected abstract setOptions(...args: any[]): Promise<null | Record<string, any>>;

  resolve(): Middleware {
    return async (req, res, next) => {
      ['strategy', 'auth'].forEach(n => {
        if (this[n]) {
          throw new Error(`[PassportMiddleware]: missing ${n} property`);
        }
      });

      const options = (await this.setOptions()) as any;

      passport.authenticate(this.strategy, this?.setOptions() as any, async (...d) => {
        const user = await this.auth(...d);
        req.user = user;
        next();
      })(req, res, this?.onError);
    };
  }
}
