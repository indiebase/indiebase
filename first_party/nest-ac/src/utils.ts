/**
 *
 * @param o
 *
 *let grantsObject = {
    admin: {
      video: {
        'create:any': ['*', '!views'],
        'read:any': ['*'],
        'update:any': ['*', '!views'],
        'delete:any': ['*'],
      },
    },
  };
  
 */
export const grantsRecord2Array = function (o: Record<string, any>) {
  const grants = [];

  for (const key in o) {
    if (Object.prototype.hasOwnProperty.call(o, key)) {
      const res = o[key];
      for (const resKey in res) {
        if (Object.prototype.hasOwnProperty.call(res, resKey)) {
          const actions = res[resKey];
          for (const actionKey in actions) {
            if (Object.prototype.hasOwnProperty.call(actions, actionKey)) {
              const attrs = actions[actionKey];
              grants.push({
                role: key,
                resource: resKey,
                action: actionKey,
                attributes: attrs.join(','),
              });
            }
          }
        }
      }
    }
  }
  return grants;
};

export const action2CamelCase = function (action: string) {
  let [prefix, suffix] = action.split(':');
  suffix = suffix.replace(/^./, (v) => v.toUpperCase());
  return prefix + suffix;
};
