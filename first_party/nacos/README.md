## 开始

安装 `npm i @letscollab/midway-nacos`

导入

```ts
import * as nacos from '@letscollab/midway-nacos';
@Configuration({
  imports: [nacos],
  importConfigs: [resolve(__dirname, './config')],
})
export class AutoConfiguration implements ILifeCycle {}

```

## 配置

详情见 https://github.com/nacos-group/nacos-sdk-nodejs/blob/master/packages/nacos-config/src/interface.ts#L247

```ts
interface CustomConfig {
  nacosConfig: NacosConfigClientOptions;
  nacosNaming: NacosNamingClientOptions;
}

export default (appInfo: MidwayAppInfo): MidwayConfig & CustomConfig => {
  return {
    midwayLogger: {
      default: {
        level: 'none',
        consoleLevel: 'all', //development环境下推荐开启
      },
    },
    nacosConfig: {
      namespace: 'development',
      serverAddr: '0.0.0.0:13324',
    },
    nacosNaming: {
      namespace: 'development',
      serverList: '0.0.0.0:13324',
    },
  };
};
```


## 配置中心

```ts
@Provide()
export class Demo1Service{
  @Inject()
  nacosConfigService: NacosConfigService

  async foo(){
      const configs = await this.nacosConfigService.getConfig('demo.json');
  }

}

// Or

@Provide()
export class Demo2Service{
  @NacosConfig('service.json')
  configs1: {a: {b: string}}


  @NacosConfig('service.json', 'a.b')
  configs2: string

  // 自定义数据parser
  @NacosConfig('service.yaml', YAML.parse)
  configs3: {a: {b: string}}

  async foo(){
    console.log(await this.configs1)   
  }

}


```

数据传输默认使用json, 更换如下
```ts
import YAML from 'yaml';

{
  nacosConfig: {
    dataParser(data){
      return  YAML.parse(data);
    }
  }
}

```

## 服务发现

描述注册一个实例到服务。

```ts
@Configuration({
  imports: [express, nacos],
  importConfigs: [resolve(__dirname, './config')],
})
export class AutoConfiguration implements ILifeCycle {
  @Inject()
  nacosNamingService: NacosNamingService;

  async onReady(
    container: IMidwayContainer,
    mainApp?: IMidwayBaseApplication<Context>,
  ): Promise<void> {
    await this.nacosNamingService.registerInstance('service-name', {
      port: 8080,
      ip: '0.0.0.0',
    });
  }
}
```

其他参考请 https://www.npmjs.com/package/nacos 
