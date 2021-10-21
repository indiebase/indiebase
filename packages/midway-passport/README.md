# midway-passport 使用文档

Passport 的目的是请求进行身份验证，其中它通过一组可扩展称为插件的*策略* 。`midway-passport` 对 passport 进行了封装，目前支持`Express`, `Koa` ,理论上支持`Egg` 未验证。此外请使用`Typescript`开发。

## 准备

1. 安装 `npm i @deskbtm/midway-passport`

```bash
Express
npm i passport
```

```bash
Koa, Egg
npm i koa-passport
```

2. 开启相对应框架的 bodyparser

## 开始

首先请对[Passport](https://www.npmjs.com/package/passport)进行简单了解

##### 以本地, Jwt 为例

首先我们用`ExpressPassportStrategyAdapter` 创建一个 Strategy，其次再用`@BootStrategy`来启动此策路

`local.strategy.ts`

```ts
import { BootStrategy } from '@deskbtm/midway-passport';
// koa 为 @deskbtm/midway-passport/koa KoaPassportStrategyAdapter
import { ExpressPassportStrategyAdapter } from '@deskbtm/midway-passport/express';
import { Strategy } from 'passport-local';

@BootStrategy({
  async useParams() {
    return {
      passwordField: 'pwd',
    };
  },
})
// ExpressPassportStrategyAdapter 支持自定义name
export class LocalStrategy extends ExpressPassportStrategyAdapter(Strategy, 'local') {
  // 通过 verify 钩子来获取有效负载  并且此函数必须有返回参数
  // 详情见对应的Strategy
  async verify(username, password) {
    return {
      username,
      password,
    };
  }
}
```

`jwt.strategy.ts`

```ts
import { BootStrategy } from '@deskbtm/midway-passport';
import { ExpressPassportStrategyAdapter } from '@deskbtm/midway-passport/express';
import { Strategy, ExtractJwt } from 'passport-jwt';

@BootStrategy({
  async useParams({ configuration }) {
    return {
      // 需要在config中配置secret
      secretOrKey: configuration.jwt.secret,
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    };
  },
})
export class JwtStrategy extends ExpressPassportStrategyAdapter(Strategy, 'jwt') {
  async verify(payload) {
    return payload;
  }
}
```

`local.control.ts`

```ts
import { PassportControl } from '@deskbtm/midway-passport';

export class LocalPassportControl extends PassportControl {
  name = 'local';

  public onError(err): void {
    console.log(err);
  }
  // 具体请看 passport.authenticate
  public auth(_err, data): void {
    console.log('local authenticate data', data);
  }
}
```

`jwt.control.ts`

```ts
import { PassportControl } from '@deskbtm/midway-passport';

export class LocalPassportControl extends PassportControl {
  name = 'jwt';

  public onError(err): void {
    console.log(err);
  }

  public auth(_err, data): void {
    console.log('jwt authenticate data', data);
  }
}
```

`test.controller.ts`

```ts
import { Frontier } from '@deskbtm/midway-passport/express';
import { ALL, Provide, Logger, Get, Inject } from '@midwayjs/decorator';
import { Body, Controller, Post } from '@midwayjs/decorator';
import { LocalPassportControl } from './local.control';
import { JwtPassportControl } from './jwt.control';
import { ILogger } from '@midwayjs/logger';
import { Jwt } from '@deskbtm/midway-jwt';

@Provide()
@Controller('/test')
export class TestPackagesController {
  @Logger('dash')
  logger: ILogger;

  @Post('/local-passport')
  @Frontier(LocalPassportControl)
  async localPassport(@Body(ALL) body) {
    console.log(body);
    return body;
  }

  @Post('/jwt-passport')
  @Frontier(JwtPassportControl)
  async jwtPassport(@Body(ALL) body) {
    console.log(body);
    return body;
  }

  @Post('/gen-jwt')
  async genJwt() {
    return {
      t: await this.jwt.sign({ msg: 'Hello Midway' }),
    };
  }
}

@Provide()
@Controller('/test1')
@Frontier(JwtPassportControl)
export class Test1PackagesController {}
```

在 StrategyAdapter 中支持 1. 使用 BootStrategy 中的 useParams。2. 通过 StrategyAdapter 的第三个参数，两种方式传递 options。

## 相关

[@deskbtm/midway-jwt](../midway-jwt/README.md)
