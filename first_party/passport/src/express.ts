import * as passport from 'passport';
import { Context, IWebMiddleware, Middleware } from '@midwayjs/express';
import { Init } from '@midwayjs/decorator';
import DefaultConfig from './config/default.config';

interface Class<T = any> {
  new (...args: any[]): T;
}

type ExternalOverride = {
  inspect(...args: any[]): Promise<Record<string, any>>;
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
  ...params: any[]
): { new (...args): InstanceType<T> & ExternalOverride } {
  /**
   * @abstract
   * @private
   */
  abstract class InnerStrategy extends Strategy {
    private strategy: passport.Strategy;

    @Init()
    protected init() {
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

      const strategyParams = params.length > 0 ? params : this?.useParams();

      // 优先使用同步参数
      this.strategy = new Strategy(strategyParams, cb);

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
    protected abstract inspect(...args: any[]): Record<string, any>;

    protected abstract useParams(): any[];

    /**
     *
     * @returns passport.Strategy
     */
    public getStrategy(): passport.Strategy {
      return this.strategy;
    }
  }
  return InnerStrategy;
}

abstract class AbstractExpressPassportMiddleware {
  /**
   *
   * @param args  verify() 中返回的参数 @see {ExpressPassportStrategyAdapter}
   */
  protected abstract auth(...args: any[]): Promise<any>;
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  //@ts-ignore
  protected useOptions(): Promise<typeof DefaultConfig | Record<string, any>>;
}

export interface ExpressPassportMiddlewareImpl {
  new (): AbstractExpressPassportMiddleware;
}

/**
 *
 * Express Passport 中间件
 *
 */

export const ExpressPassportMiddleware = function (
  strategy: string
): ExpressPassportMiddlewareImpl {
  abstract class InnerExpressPassportMiddleware
    extends AbstractExpressPassportMiddleware
    implements IWebMiddleware
  {
    resolve(): Middleware {
      return async (req, res, next) => {
        ['strategy', 'auth'].forEach(n => {
          if (!this[n]) {
            throw new Error(`[PassportMiddleware]: missing ${n} property`);
          }
        });

        const options = {
          ...(this.useOptions ? await this.useOptions() : null),
        };

        passport.authenticate(strategy, options, async (...d) => {
          const user = await this.auth(req as any, ...d);
          req[options.presetProperty] = user;
          next();
        })(req, res);
      };
    }
  }

  return InnerExpressPassportMiddleware as any;
};
