//@ts-ignore:ts(1479)
import ky from 'ky';
import { LogEntity, OpenObserveTransportOptions } from './interface';

export class Sender {
  #options: OpenObserveTransportOptions;
  #req: typeof ky;
  #data: Record<string, any>;
  #tmpData: Record<string, any>;
  #timer: NodeJS.Timer;
  #isSending: boolean;

  constructor(options: OpenObserveTransportOptions) {
    this.#options = options;
    this.#data = {};
    this.#tmpData = {};
    this.#isSending = false;
    const { basicAuth } = options;
    let authVal;

    if (basicAuth) {
      authVal =
        'Basic ' +
        Buffer.from(`${basicAuth.username}:${basicAuth.password}`).toString(
          'base64',
        );
    }

    this.#req = ky.create({
      prefixUrl: options.host,
      timeout: options.timeout,
      headers: Object.assign(
        {},
        { contentType: 'application/json' },
        options.headers,
        {
          Authorization: authVal,
        },
      ),
    });

    const interval = Number(this.#options.interval);
    this.#timer = setInterval(this.#batchSend.bind(this), interval);
  }

  #pushBatch(data: Record<string, any>, slug: string, entity: LogEntity) {
    if (Array.isArray(this.#data[slug])) {
      data[slug].push(entity);
    } else {
      data[slug] = [entity];
    }
  }

  public async push(entity: LogEntity, bulk?: boolean) {
    let { orgId, streamName } = entity;
    let slug = `${orgId}/${streamName}`;

    if (bulk) {
      this.#pushBatch(
        this.#isSending ? this.#tmpData : this.#data,
        slug,
        entity,
      );
    } else {
      await this.#send(orgId, streamName, [entity]);
    }
  }

  async #batchSend() {
    try {
      for await (const [key, value] of Object.entries(this.#data)) {
        const [orgId, streamName] = key.split('/');
        await this.#send(orgId, streamName, value);
      }
    } catch (error) {
      console.error(error);
    }
  }

  async #send(orgId: string, streamName: string, body: unknown) {
    this.#isSending = true;
    return this.#req
      .post(`api/${orgId}/${streamName}/_json`, {
        json: body,
      })
      .then(() => {
        const v = Object.values(this.#tmpData);
        if (Array.isArray(v) && v.length > 0) {
          this.#data = this.#tmpData;
          this.#tmpData = {};
        }
        this.clean();
      })
      .catch((err) => {
        console.error(err);
        if (err?.cause?.code === 'ECONNREFUSED') {
          this.#options.onConnectionError?.(err, this.close.bind(this));
        }
        this.#options.cleanOnRequestError && this.clean();
        this.#options.onRequestError?.(err);
      })
      .finally(() => {
        this.#isSending = false;
      });
  }

  public clean() {
    this.#data = null;
    this.#data = {};
  }

  public close() {
    console.debug('OpenObserve closed');
    this.clean();
    clearInterval(this.#timer);
  }
}
