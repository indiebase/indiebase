## 面包多支付 SDK

支持nestjs

## Usage

```ts
const pay = new MbdPay('appId', 'appKey');

pay.aliPay({
  url: '',
  description: '',
  amount_total: 0,
});

```

见 [MbdPay](./docs/classes/MbdPay.md)

## Nestjs

```ts
@Module({
  imports: [
     MbdPayModule.forRoot({
      appId: 'xxxxxx',
      appKey: 'xxxxxx',
    }),
    MbdPayModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory(config: ConfigService) {
        return {
          appId: config.get('mbd.appId'),
          appKey: config.get('mbd.appKey'),
        };
      },
    }),
  ]
})
export class AppModule {
  constructor(
    private readonly mbdPayService: MbdPayService,
  ) {
    mbdPayService.client.aliPay({
      url: '',
      description: '',
      amount_total: 0,
    });
  }
}
```