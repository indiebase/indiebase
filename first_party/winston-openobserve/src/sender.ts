import ky from "ky";
import { LogEntity, OpenObserveTransportOptions } from "./interface";
import { KyInstance } from "ky/distribution/types/ky";

export class Sender {
  #options: OpenObserveTransportOptions;
  #req: KyInstance;
  #data: Record<string, any>;
  #timer: NodeJS.Timer;

  constructor(options: OpenObserveTransportOptions) {
    this.#options = options;
    this.#data = {};
    const { basicAuth } = options;
    let authVal;

    if (basicAuth) {
      authVal =
        "Basic " +
        Buffer.from(`${basicAuth.username}:${basicAuth.password}`).toString(
          "base64"
        );
    }

    this.#req = ky.create({
      prefixUrl: options.host,
      timeout: options.timeout,
      headers: Object.assign(
        {},
        { contentType: "application/json" },
        options.headers,
        {
          Authorization: authVal,
        }
      ),
    });

    const interval = Number(this.#options.interval) * 1000;
    this.#timer = setInterval(this.#batchSend, interval);
  }

  public async push(entity: LogEntity, bulk?: boolean) {
    let { orgId, streamName } = entity;
    let slug = `${orgId}/${streamName}`;

    if (bulk) {
      if (Array.isArray(this.#data[slug])) {
        this.#data[slug].push(entity);
      } else {
        this.#data[slug] = [entity];
      }
    } else {
      await this.#send(orgId, streamName, [entity]);
    }
  }

  async #batchSend() {
    if (this.#data) {
      for await (const [key, value] of Object.entries(this.#data)) {
        const [orgId, streamName] = key.split("/");
        await this.#send(orgId, streamName, value);
      }
    }
  }

  async #send(orgId: string, streamName: string, body: unknown) {
    return this.#req
      .post(`api/${orgId}/${streamName}/_json`, {
        json: body,
      })
      .catch((err) => {
        this.#options.cleanOnError && this.clean();
        this.#options?.onRequestError(err);
        return Promise.reject(err);
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
