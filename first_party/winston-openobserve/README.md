## Install

```shell
npm i winston-openobserve
```

```ts
const openObserveTransport = new OpenObserveTransport({
  bulk: true, // Batch push. default true
  host: 'xxxx.com',
  defaultOrg: 'xxxx',
  defaultStream: 'xxxx',
  interval: 2000, // Batch push interval default. 10000(10s)
  timeout: 2000, // Request timeout. default 10000(10s)
  cleanOnRequestError: true, // Clean batch data when error. default false
  useNow: false, // Replace any log timestamps with Date.now()
  onConnectionError(_error, close) {
    close();
  },
  basicAuth: {
    username: 'username',
    password: 'password',
  },
});

...
transports: [
  openObserveTransport
]
...
```

## Tests

```shell
npm i
npm test
```
