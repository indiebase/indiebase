import got from 'got';
const JAACOUNT_URI = 'https://jaccount.sjtu.edu.cn';
const PROFILE_URI = 'https://api.sjtu.edu.cn';

export const requestJAccount = got.extend({
  prefixUrl: JAACOUNT_URI,
  responseType: 'json',
  hooks: {
    beforeRequest: [
      (options) => {
        options.headers['Connection'] = 'keep-alive';
        options.headers['Content-Type'] =
          'application/x-www-form-urlencoded; charset=UTF-8';
      },
    ],
  },
});

export const requestJacApi = got.extend({
  prefixUrl: PROFILE_URI,
  responseType: 'json',
  hooks: {
    beforeRequest: [
      (options) => {
        options.headers['Connection'] = 'keep-alive';
        options.headers['Content-Type'] =
          'application/x-www-form-urlencoded; charset=UTF-8';
      },
    ],
  },
});

export type SJTUCommonResponse = {
  errno: number;
  error: 'string';
  total: 'string';
  nextToken: 'string';
  entities: Record<string, any>[];
};

export type JAccountAuth = {
  access_token: string;
  refresh_token: string;
  id_token: string;
  token_type: string;
  expires_in: number;
};
