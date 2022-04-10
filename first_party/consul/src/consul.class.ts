import {
  IConsul,
  Acl,
  Agent,
  Catalog,
  Health,
  Kv,
  Session,
  Status,
  Watch,
  CommonOptions,
  ConsulEvent,
  Options,
} from './interfaces/consul-options.interface';

export class Consul implements IConsul {
  acl: Acl;
  agent: Agent;
  catalog: Catalog;
  event: ConsulEvent;
  health: Health;
  kv: Kv;
  session: Session;
  status: Status;

  lock(opts: Options): Lock {
    return undefined;
  }

  watch(opts: WatchOptions): Watch {
    return undefined;
  }
}

interface WatchOptions {
  method: Function;
  options?: CommonOptions & { key?: string };
  backoffFactor?: number;
  backoffMax?: number;
  maxAttempts?: number;
}
