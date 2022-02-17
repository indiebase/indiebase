import { NacosConfigService } from '@letscollab/nestjs-nacos';

export const getNacosConfig = async function (
  service: NacosConfigService,
  dataId,
  group = 'DEFAULT_GROUP',
) {
  return JSON.parse(await service.client.getConfig(dataId, group));
};

export const NacosUtils = {
  async getConfig(
    service: NacosConfigService,
    dataId,
    group = 'DEFAULT_GROUP',
  ) {
    return JSON.parse(await service.client.getConfig(dataId, group));
  },
  async getConfigs(service: NacosConfigService) {
    return await service.client.getConfigs();
  },
};
