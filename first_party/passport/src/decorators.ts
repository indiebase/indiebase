import { Scope, ScopeEnum } from '@midwayjs/decorator';

/**
 *
 * 自启动 passport策略
 *
 * @param {Strategy} Target passport策略
 * @method
 */
export const BootStrategy = function (): any {
  return Target => {
    if (typeof Target === 'function') {
      // saveProviderId(generateRandomId(), Target);
      // /**
      //  * @see {@link PassportConfiguration}
      //  */
      // saveModule(BOOTSTRATEGY_KEY, Target);
      // saveClassMetadata(BOOTSTRATEGY_KEY, options, Target);
      Scope(ScopeEnum.Singleton)(Target);
    } else {
      throw new Error('[BootStrategy]: attach target must be class');
    }
  };
};
