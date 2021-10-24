/**
 * 这里加入这段是因为 egg 默认的安全策略，在 post 请求的时候如果不传递 token 会返回 403
 * 由于大部分新手用户不太了解这个机制，所以在本地和单测环境做了默认处理
 * 请注意，线上环境依旧会有该错误，需要手动开启
 * 如果想了解更多细节，请访问 https://eggjs.org/zh-cn/core/security.html#安全威胁-csrf-的防范
 */
export const security = {
  csrf: false,
};

// export const redis = {
//   HOST: 'localhost',
//   PORT: 6379,
//   AUTH: 'dev123456',
//   DB: 2,
// };

// export const secret = {
//   JWT: 'dev123456',
// };

// export const owner = {
//   NAME: 'dev@dev.com',
//   PWD: 'dev123456',
// };

// export const mailer = {
//   NAME: 'wanghan9423@163.com',
//   PWD: 'outlook9423',
//   PORT: 995,
// };

// export const other = {
//   NET_SPEED_LIMIT_MAX: 400,
// };

// export const security = {
//   csrf: false,
// };

// export const orm = {
//   type: 'mysql',
//   host: '127.0.0.1',
//   port: 3306,
//   username: 'root',
//   password: 'dev123456',
//   database: 'lonely-mgmt-midway-dev',
//   synchronize: true,
//   logging: false,
// };
