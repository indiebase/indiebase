import { BusinessLabels } from '../constants';

export class RedisUtils {
  /**
   * Generate redis key with namespace.
   * e.g. namespace-xxx:1031
   */
  public static createKey(
    label: BusinessLabels,
    namespace: string,
    suffix: string | number,
  ) {
    return `${label}:${namespace}:${suffix}`;
  }
}
