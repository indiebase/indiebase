import ky from 'ky';
import { LogEntity, OpenObserveTransportOptions } from './interface';
import { KyInstance } from 'ky/distribution/types/ky';

export class Sender {
  #options: OpenObserveTransportOptions;
  #req: KyInstance;
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
      this.#data[slug].push(entity);
    } else {
      this.#data[slug] = [entity];
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
    for await (const [key, value] of Object.entries(this.#data)) {
      const [orgId, streamName] = key.split('/');
      await this.#send(orgId, streamName, value);
    }
  }

  async #send(orgId: string, streamName: string, body: unknown) {
    this.#isSending = true;
    return this.#req
      .post(`api/${orgId}/${streamName}/_json`, {
        json: body,
      })
      .then(() => {
        this.#isSending = false;
        const v = Object.values(this.#tmpData);
        if (Array.isArray(v) && v.length > 0) {
          this.#data = this.#tmpData;
          this.#tmpData = {};
        }
        this.clean();
      })
      .catch((err) => {
        this.#isSending = false;
        this.#options.cleanOnError && this.clean();
        this.#options.onRequestError?.(err);
      });
  }

  public clean() {
    this.#data = null;
    this.#data = {};
  }

  public close() {
    this.clean();
    clearInterval(this.#timer);
  }
}
