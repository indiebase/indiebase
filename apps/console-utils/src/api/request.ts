import axios, { type AxiosRequestConfig } from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { nanoid } from 'nanoid';
import * as forge from 'node-forge';
const StegCloak = require('stegcloak');

const stegcloak = new StegCloak(true, false);

console.debug('Api: ', process.env.REACT_APP_API);

export const protectApiInterceptor = async function (
  config: AxiosRequestConfig<any>,
) {
  const a = [];
  a.push(Date.now());
  a.push(nanoid(6));

  try {
    const s = stegcloak.reveal(
      process.env.REACT_APP_PROTECT_MSG,
      process.env.REACT_APP_SALT,
    );
    const md = forge.md.md5.create();

    md.update(s);
    a.push(md.digest().toHex());

    config.headers['Access-Control-Allow-Credential'] = a.join(';');
  } catch (error) {
    console.log(error);
  }

  console.log('%c[Request]....', 'color:green', config);

  return config;
};

export const req = axios.create({
  timeout: 8000,
  baseURL: process.env.REACT_APP_API,
});

req.interceptors.request.use(protectApiInterceptor, function (error) {
  return Promise.reject(error);
});

req.interceptors.response.use(
  function (response) {
    const data = response.data;
    console.log('%c[Response].....', 'color:blue', response.data);

    if (data.code <= 0 && data.message) {
    }

    return response;
  },
  async function (error) {
    const { response } = error;
    console.log('[Response Error].....', error);
    if (response) {
      const data = response.data;
      console.log(data);

      if (data?.statusCode === 401 || response.status === 401) {
        // location.href = process.env.REACT_APP_LOGIN_SITE_URI;
      }
    } else {
    }

    return Promise.reject(error.response);
  },
);

export const mock = new MockAdapter(req);

process.env.NODE_ENV !== 'development' && mock.restore();
