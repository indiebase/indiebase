[@letscollab/mbdpay](../README.md) / [Exports](../modules.md) / MbdPay

# Class: MbdPay

## Table of contents

### Constructors

- [constructor](MbdPay.md#constructor)

### Properties

- [#BASE_URL](MbdPay.md##base_url)
- [#OPENID_URL](MbdPay.md##openid_url)
- [#client](MbdPay.md##client)
- [basicOptions](MbdPay.md#basicoptions)

### Methods

- [#getBody](MbdPay.md##getbody)
- [#getSign](MbdPay.md##getsign)
- [aliPay](MbdPay.md#alipay)
- [getOpenId](MbdPay.md#getopenid)
- [getOrder](MbdPay.md#getorder)
- [refund](MbdPay.md#refund)
- [weChatPay](MbdPay.md#wechatpay)
- [weChatPayH5](MbdPay.md#wechatpayh5)

## Constructors

### constructor

• **new MbdPay**(`appId`, `appKey`, `options?`)

#### Parameters

| Name       | Type                                              |
| :--------- | :------------------------------------------------ |
| `appId`    | `string`                                          |
| `appKey`   | `string`                                          |
| `options?` | [`MdbpayOptions`](../interfaces/MdbpayOptions.md) |

#### Defined in

[sdk.ts:56](https://github.com/deskbtm-letscollab/mbdpay/blob/b88957d/src/sdk.ts#L56)

## Properties

### #BASE_URL

• `Private` **#BASE_URL**: `string` = `'https://api.mianbaoduo.com'`

#### Defined in

[sdk.ts:49](https://github.com/deskbtm-letscollab/mbdpay/blob/b88957d/src/sdk.ts#L49)

---

### #OPENID_URL

• `Private` **#OPENID_URL**: `string` = `'https://mbd.pub/openid'`

#### Defined in

[sdk.ts:50](https://github.com/deskbtm-letscollab/mbdpay/blob/b88957d/src/sdk.ts#L50)

---

### #client

• `Private` **#client**: `Got`

#### Defined in

[sdk.ts:52](https://github.com/deskbtm-letscollab/mbdpay/blob/b88957d/src/sdk.ts#L52)

---

### basicOptions

• `Private` **basicOptions**: `any` = `{}`

#### Defined in

[sdk.ts:54](https://github.com/deskbtm-letscollab/mbdpay/blob/b88957d/src/sdk.ts#L54)

## Methods

### #getBody

▸ `Private` **#getBody**(`options`, `addition?`): `string`

#### Parameters

| Name        | Type                       |
| :---------- | :------------------------- |
| `options`   | `Record`<`string`, `any`\> |
| `addition?` | `Record`<`string`, `any`\> |

#### Returns

`string`

#### Defined in

[sdk.ts:77](https://github.com/deskbtm-letscollab/mbdpay/blob/b88957d/src/sdk.ts#L77)

---

### #getSign

▸ `Private` **#getSign**(`options`, `appKey`): `string`

#### Parameters

| Name      | Type                       |
| :-------- | :------------------------- |
| `options` | `Record`<`string`, `any`\> |
| `appKey`  | `string`                   |

#### Returns

`string`

#### Defined in

[sdk.ts:70](https://github.com/deskbtm-letscollab/mbdpay/blob/b88957d/src/sdk.ts#L70)

---

### aliPay

▸ **aliPay**(`options`): `CancelableRequest`<`Response`<`string`\>\>

**`see`** [https://doc.mbd.pub/api/zhi-fu-bao-zhi-fu](https://doc.mbd.pub/api/zhi-fu-bao-zhi-fu)

#### Parameters

| Name      | Type                                        |
| :-------- | :------------------------------------------ |
| `options` | [`AliOptions`](../interfaces/AliOptions.md) |

#### Returns

`CancelableRequest`<`Response`<`string`\>\>

#### Defined in

[sdk.ts:114](https://github.com/deskbtm-letscollab/mbdpay/blob/b88957d/src/sdk.ts#L114)

---

### getOpenId

▸ **getOpenId**(`options`): `Promise`<`Response`<`string`\>\>

**`see`** [https://doc.mbd.pub/api/huo-qu-yong-hu-openid](https://doc.mbd.pub/api/huo-qu-yong-hu-openid)

#### Parameters

| Name      | Type                                              |
| :-------- | :------------------------------------------------ |
| `options` | [`OpenIdOptions`](../interfaces/OpenIdOptions.md) |

#### Returns

`Promise`<`Response`<`string`\>\>

#### Defined in

[sdk.ts:87](https://github.com/deskbtm-letscollab/mbdpay/blob/b88957d/src/sdk.ts#L87)

---

### getOrder

▸ **getOrder**(`options`): `CancelableRequest`<`Response`<`string`\>\>

**`see`** [https://doc.mbd.pub/api/ding-dan-cha-xun](https://doc.mbd.pub/api/ding-dan-cha-xun)

#### Parameters

| Name      | Type                                                  |
| :-------- | :---------------------------------------------------- |
| `options` | [`GetOrderOptions`](../interfaces/GetOrderOptions.md) |

#### Returns

`CancelableRequest`<`Response`<`string`\>\>

#### Defined in

[sdk.ts:132](https://github.com/deskbtm-letscollab/mbdpay/blob/b88957d/src/sdk.ts#L132)

---

### refund

▸ **refund**(`options`): `CancelableRequest`<`Response`<`string`\>\>

**`see`** [https://doc.mbd.pub/api/tui-kuan](https://doc.mbd.pub/api/tui-kuan)

#### Parameters

| Name      | Type                                              |
| :-------- | :------------------------------------------------ |
| `options` | [`RefundOptions`](../interfaces/RefundOptions.md) |

#### Returns

`CancelableRequest`<`Response`<`string`\>\>

#### Defined in

[sdk.ts:123](https://github.com/deskbtm-letscollab/mbdpay/blob/b88957d/src/sdk.ts#L123)

---

### weChatPay

▸ **weChatPay**(`options`): `Promise`<`Response`<`string`\>\>

**`see`** [https://doc.mbd.pub/api/wei-xin-zhi-fu](https://doc.mbd.pub/api/wei-xin-zhi-fu)

#### Parameters

| Name      | Type                                              |
| :-------- | :------------------------------------------------ |
| `options` | [`WeChatOptions`](../interfaces/WeChatOptions.md) |

#### Returns

`Promise`<`Response`<`string`\>\>

#### Defined in

[sdk.ts:96](https://github.com/deskbtm-letscollab/mbdpay/blob/b88957d/src/sdk.ts#L96)

---

### weChatPayH5

▸ **weChatPayH5**(`options`): `CancelableRequest`<`Response`<`string`\>\>

**`see`** [https://doc.mbd.pub/api/wei-xin-h5-zhi-fu](https://doc.mbd.pub/api/wei-xin-h5-zhi-fu)

#### Parameters

| Name      | Type                                                  |
| :-------- | :---------------------------------------------------- |
| `options` | [`WeChatH5Options`](../interfaces/WeChatH5Options.md) |

#### Returns

`CancelableRequest`<`Response`<`string`\>\>

#### Defined in

[sdk.ts:105](https://github.com/deskbtm-letscollab/mbdpay/blob/b88957d/src/sdk.ts#L105)
