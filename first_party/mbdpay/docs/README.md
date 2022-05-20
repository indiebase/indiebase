@letscollab/mbdpay / [Exports](modules.md)

## Miaobao Pay Sdk

1. 支付相关sdk
2. 支持nestjs

## SDK

```ts

const pay = new MbdPay('appId', 'appKey');

// 支付宝
pay.aliPay({
  url: '',
  description: '',
  amount_total: 0,
});

pay.getOrder({
  out_trade_no: '',
});

pay.getOpenId({
  target_url: '',
});

pay.refund({
  order_id: '',
});

pay.weChatPay({
  openid: '',
  description: '',
  amount_total: 0,
  callback_url: '',
});

pay.weChatPayH5({
  description: '',
  amount_total: 0,
});

```

## Nestjs
