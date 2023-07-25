![workflow](https://img.shields.io/github/actions/workflow/status/Nawbc/passport-paseto/ci.yml?style=flat-square)

## This library is not free, it needs your star. 
## Note Bene
Only test with Fastify.

## Install

```shell
npm i passport-paseto
```

## Usage

### LocalPasetoStrategy (symmetric key)

```ts
const app = fastify();
// Must have due to @fastify/passport depends on @fastify/flash
app.register(fastifySession, {
  secret: "secret with minimum length of 32 characters",
});
app.register(fastifyPassport.initialize());

const key = await V3.generateKey("local");
const token = await V3.encrypt(
  {
    username: "test",
  },
  key,
  {
    expiresIn: "99999999s",
  }
);

fastifyPassport.use(
  "local-paseto",
  new LocalPasetoStrategy(
    {
      getToken: fromAuthBearer(),
      key,
    },
    (payload, done) => {
      done(null, { username: "username_test" });
    }
  )
);

app.get(
  "/test/bearer",
  {
    preValidation: fastifyPassport.authenticate("local-paseto", {
      authInfo: false,
      session: false,
    }),
  },
  async function (req, reply) {
    reply.send();
  }
);

app.listen();

```
### LocalPasetoStrategy(options: LocalPasetoStrategyOptions, verify);

#### LocalPasetoStrategyOptions:
- `key`: `<KeyObject>` The secret key to decrypt with. Alternatively a `'k3.local.[data]'` 
  PASERK string or any input that works for `crypto.createSecretKey()`.
- `passReqToCallback`: `<boolean>` default `false`.
- `getToken`: `<Function>` `(...args) => (req) => string`
  - `fromHeader`: extract token from header default `X-Paseto-Token`.
  - `fromAuthBearer`: extract token from Authorization Bearer.
  - `fromAuthScheme`: extract token from Authorization, e.g. Basic, Digest ...
  - `fromBody`: extract token from request body.
  - `fromQuery`: extract token from request query.
- `consumeOptions`: `<Object>`
  - `assertion`: `<string>` &vert; `<Buffer>` PASETO Implicit Assertion
  - `audience`: `<string>` Expected audience value. An exact match must be found in the payload.
  - `clockTolerance`: `<string>` Clock Tolerance for comparing timestamps, provided as timespan
    string e.g. `120s`, `2 minutes`, etc. **Default:** no clock tolerance
  - `complete`: `<Boolean>` When false only the parsed payload is returned, otherwise an object with
    a parsed payload and footer (as a Buffer) will be returned.
    **Default:** 'false'
  - `ignoreExp`: `<Boolean>` When true will not be validating the "exp" claim value to be in the
    future from now. **Default:** 'false'
  - `ignoreIat`: `<Boolean>` When true will not be validating the "iat" claim value to be in the
    past from now. **Default:** 'false'
  - `ignoreNbf`: `<Boolean>` When true will not be validating the "nbf" claim value to be in the
    past from now. **Default:** 'false'
  - `issuer`: `<string>` Expected issuer value. An exact match must be found in the payload.
  - `maxTokenAge`: `<string>` When provided the payload is checked to have the "iat" claim and its
    value is validated not to be older than the provided timespan string e.g. `30m`, `24 hours`.
  - `now`: `<Date>` Date object to be used instead of the current unix epoch timestamp.
    **Default:** 'new Date()'
  - `subject`: `<string>` Expected subject value. An exact match must be found in the payload.
#### Verify callback `([req], payload, next) => void`

### PublicPasetoStrategy (asymmetric key)

```ts
const fastifyPassport = require("@fastify/passport");
const { LocalPasetoStrategy, fromAuthBearer } = require("passport-paseto");
const { V3 } = require("paseto");

const { secretKey, publicKey } = await V3.generateKey("public", {
  format: "paserk",
});

const token = await V3.sign(
  {
    username: "test",
  },
  secretKey,
  {
    expiresIn: "99999999s",
  }
);

fastifyPassport.use(
  "public-paseto",
  new PublicPasetoStrategy(
    {
      getToken: fromAuthBearer(),
      publicKey,
    },
    (payload, done) => {
      done(null, { username: "username_test" });
    }
  )
);

app.get(
  "/test/bearer",
  {
    preValidation: fastifyPassport.authenticate("public-paseto", {
      authInfo: false,
      session: false,
    }),
  },
  async function (req, reply) {
    reply.send();
  }
);
```

[#Samples](https://github.com/Nawbc/passport-paseto/tree/main/spec)

## Tests

```shell
npm i
npm test
```