import got, { Got } from 'got';
import { stringify } from 'querystring';
import * as md5 from 'md5';

export interface MdbpayOptions {
  baseUrl?: string;
  openIdUrl?: string;
}

export interface WeChatOptions {
  openid: string;
  share_code?: string;
  description: string;
  amount_total: number;
  out_trade_no?: string;
  callback_url: string;
}

export interface WeChatH5Options {
  channel?: string;
  share_code?: string;
  description: string;
  out_trade_no?: string;
  amount_total: number;
}

export interface AliOptions {
  url: string;
  share_code?: string;
  description: string;
  amount_total: number;
  out_trade_no?: string;
  callback_url?: string;
}

export interface RefundOptions {
  order_id: string;
}

export interface GetOrderOptions {
  out_trade_no: string;
}

export interface OpenIdOptions {
  target_url: string;
}

export class MbdPay {
  #BASE_URL = 'https://api.mianbaoduo.com';
  #OPENID_URL = 'https://mbd.pub/openid';

  #client: Got;

  private basicOptions: any = {};

  constructor(
    private readonly appId: string,
    private readonly appKey: string,
    private readonly options?: MdbpayOptions,
  ) {
    const prefixUrl = options?.baseUrl ?? this.#BASE_URL;
    this.#OPENID_URL = options?.openIdUrl ?? this.#OPENID_URL;
    this.basicOptions['api_id'] = appId;
    this.#client = got.extend({
      prefixUrl,
      responseType: 'json',
    });
  }

  #getSign(options: Record<string, any>, appKey: string) {
    const params = new URLSearchParams(options);
    params.sort();
    params.append('key', appKey);
    return md5(params.toString());
  }

  #getBody(options: Record<string, any>, addition?: Record<string, any>) {
    options = Object.assign({}, options, addition, this.basicOptions);
    const sign = this.#getSign(options, this.appKey);
    options = Object.assign({}, options, { sign });
    return stringify(options);
  }

  /**
   * @see {@link https://doc.mbd.pub/api/huo-qu-yong-hu-openid}
   */
  public async getOpenId(options: OpenIdOptions) {
    return got.get(this.#OPENID_URL, {
      searchParams: { target_url: options.target_url },
    });
  }

  /**
   * @see {@link https://doc.mbd.pub/api/wei-xin-zhi-fu}
   */
  public async weChatPay(options: WeChatOptions) {
    return this.#client.post('release/wx/prepay', {
      body: this.#getBody(options),
    });
  }

  /**
   * @see {@link https://doc.mbd.pub/api/wei-xin-h5-zhi-fu}
   */
  public weChatPayH5(options: WeChatH5Options) {
    return this.#client.post('release/wx/prepay', {
      body: this.#getBody(options, { channel: 'h5' }),
    });
  }

  /**
   * @see {@link https://doc.mbd.pub/api/zhi-fu-bao-zhi-fu}
   */
  public aliPay(options: AliOptions) {
    return this.#client.post('release/alipay/pay', {
      body: this.#getBody(options),
    });
  }

  /**
   * @see {@link https://doc.mbd.pub/api/tui-kuan}
   */
  public refund(options: RefundOptions) {
    return this.#client.post('release/main/refund', {
      body: this.#getBody(options),
    });
  }

  /**
   * @see {@link https://doc.mbd.pub/api/ding-dan-cha-xun}
   */
  public getOrder(options: GetOrderOptions) {
    return this.#client.post('release/main/refund', {
      body: this.#getBody(options),
    });
  }
}
