declare module 'nacos' {
  import Base from 'sdk-base';
  export * from 'nacos-config';

  export interface NacosNamingClientOptions {
    logger?: any;
    namespace?: string;
    /**
     * @example
     * ```
     *  '127.0.0.1,127.0.0.2', ['127.0.0.1', '127.0.0.2']
     * ```
     */
    serverList?: string[] | string;

    httpclient: any;
    ssl?: boolean;
    ak?: string;
    sk?: string;
    appName?: string;
    endpoint?: string;
    vipSrvRefInterMillis?: number;
  }

  export class NacosNamingClient extends Base {
    constructor(options?: NacosNamingClientOptions);

    async registerInstance(
      serviceName: string,
      instance: any,
      groupName?: string,
    ): Promise<void>;

    async deregisterInstance(
      serviceName: string,
      instance: any,
      groupName?: string,
    ): Promise<void>;

    async getAllInstances(
      serviceName: string,
      instance: any,
      groupName?: string,
      clusters?: string,
      subscribe?: boolean,
    ): Promise<[]>;

    async selectInstances(
      serviceName: string,
      instance: any,
      groupName?: string,
      clusters?: string,
      subscribe?: boolean,
    ): Promise<[]>;

    async getServerStatus(): Promise<'UP' | 'DOWN'>;

    subscribe(serviceName: string, listener?: (...args: any) => void): void;

    unSubscribe(serviceName: string, listener?: (...args: any) => void): void;
  }
}
