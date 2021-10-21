// import { EggAppConfig, EggAppInfo, PowerPartial } from 'egg';

// export type DefaultConfig = PowerPartial<EggAppConfig>;

export default appInfo => {
  const config: any = {};

  config.keys = appInfo.name + '%$@!~3249kooltuo@';

  config.bodyParser = {
    enable: true,
  };

  // config.middleware = [];

  config.midwayFeature = {
    replaceEggLogger: true,
  };

  config.view = {
    root: `${appInfo.baseDir}/app/view,${appInfo.baseDir}/app/view2`,
  };

  return config;
};
