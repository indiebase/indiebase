通过 `ProtectGuard` 来保护接口调用，
前端调用接口需要带上 `Access-Control-Allow-Credential`
Header (不同于 Access-Control-Allow-Credentials)。
<br />
格式：

```yaml
Access-Control-Allow-Credential: 1650884292;7RikC4;80d995638fcce7122ddf65bba87c9741
                                                      时间戳           随机           md5
过期时间和salt可以在配置中心设置。前端推荐使用隐写术隐藏salt。
```
