letscollab 中部分接口会对请求进行校验

1. 隐写salt: .env 中 `REACT_APP_SALT`  `REACT_APP_PROTECT_MSG` 是非正常的unicode。 详情参考 [stegcloak](https://github.com/KuroLabs/stegcloak)
生成的token会被存放在 `Access-Control-Allow-Credentialc` header中。

