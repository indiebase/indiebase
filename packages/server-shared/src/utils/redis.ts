import { BusinessTags } from '../constants';

export class RedisUtils {
  /**
   * Generate redis key with namespace.
   * e.g. namespace-xxx:1031
   */
  public static formatNamespaceKey(
    tag: BusinessTags,
    namespace: string,
    suffix: string | number,
  ) {
    return `${tag}:${namespace}:${suffix}`;
  }
}
