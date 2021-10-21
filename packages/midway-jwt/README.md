## 开始

安装 `npm i @desbtm/midway-jwt `

可配合 [@deskbtm/midway-passport](https://github.com/Nawbc/megumin-mgmt/tree/master/packages/midway-passport) 使用

config.{env}.ts

```ts
config.jwt = {
  secret: 'dev123456',
};
```

```ts
@Provide()
class Demo {
  @Inject()
  jwt: Jwt;
}
```

## API

**请不要再 payload 存放任何敏感信息**

- public async sign(payload: JwtPayload, options?: SignOptions, secret?: Secret): Promise<string | void>
- public signSync(payload: JwtPayload, options?: SignOptions, secret?: Secret): string | void

- verifySync(token: string,options?: VerifyOptions & { complete: true },secret?: Secret): Jwt | string | JwtPayload
- public async verify(token: string,options?: VerifyOptions & { complete: true },secret?: Secret | GetPublicKeyOrSecret): Promise<JwtType | undefined | JwtPayload>

- decodeSync(token: string,options?: DecodeOptions & { complete: true } & { json: true }): Jwt | null | JwtPayload | string
