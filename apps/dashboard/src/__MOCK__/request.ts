import axios, { type AxiosRequestConfig } from 'axios';
import MockAdapter from 'axios-mock-adapter';

console.debug('API: ', process.env.VITE_API);

export const protectApiInterceptor = async function (
  config: AxiosRequestConfig,
) {
  try {
    // const s = stegcloak.reveal(
    //   process.env.REACT_APP_PROTECT_MSG,
    //   process.env.REACT_APP_SALT,
    // );
    // const md = forge.md.md5.create();

    // md.update(s);
    // a.push(md.digest().toHex());

    config.headers['Access-Control-Allow-Credential'] = 'xxx';
  } catch (error) {
    console.log(error);
  }

  console.log('%c[Request]....', 'color:green', config);

  return config;
};

export const req = axios.create({
  timeout: 8000,
  baseURL: process.env.VITE_API,
  withCredentials: true,
  headers: {
    Domain: process.env.REACT_APP_PACKAGENAME,
  },
});

req.interceptors.request.use(protectApiInterceptor, function (error) {
  return Promise.reject(error);
});

req.interceptors.response.use(
  function (response) {
    const data = response.data;
    console.log('%c[Response].....', 'color:blue', response.data);

    return response;
  },
  async function (error) {
    const { response } = error;
    console.log('[Response Error].....', error);
    if (response) {
      const data = response.data;

      const message = Array.isArray(data?.message)
        ? data.message.join(';\n')
        : data?.message;

      if (data?.statusCode === 401 || response.status === 401) {
        // location.href = process.env.REACT_APP_LOGIN_SITE_URI;
      }
    }

    return Promise.reject(error.response);
  },
);

export const mock = new MockAdapter(req);

process.env.REACT_APP_IS_MOCK !== 'true' && mock.restore();
