const jsonParser = function () {
  return JSON.parse('');
};

export function NacosConfig(
  dataId: string,
  group = 'DEFAULT_GROUP',
  parser = jsonParser,
): PropertyDecorator {
  return (target, propertyKey) => {
    Reflect.set(target, propertyKey, null);
    Reflect.defineMetadata(
      'demo',
      { dataId, group, parser },
      target,
      propertyKey,
    );
  };
}

export function NacosConfigClient(
  dataId: string,
  group = 'DEFAULT_GROUP',
  parser = jsonParser,
): MethodDecorator {
  return (target, propertyKey) => {
    Reflect.set(target, propertyKey, null);
    Reflect.defineMetadata(
      'demo',
      { dataId, group, parser },
      target,
      propertyKey,
    );
  };
}
