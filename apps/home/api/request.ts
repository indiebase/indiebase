import axios from 'axios';
import localforage from 'localforage';

console.log('Api: ', process.env.NEXT_PUBLIC_API);

export const req = axios.create({
  timeout: 8000,
  baseURL: process.env.NEXT_PUBLIC_API,
});

req.interceptors.request.use(
  async function (config) {
    console.debug('request....', config);
    const jwt = await localforage.getItem('t');
    config.headers['Authorization'] = `Bearer ${jwt}`;
    return config;
  },
  function (error) {
    return Promise.resolve(error);
  },
);

req.interceptors.response.use(
  function (response) {
    const data = response.data;
    console.log('response.....', response.data);
    if (data.code <= 0 && data.message) {
    }

    return response;
  },
  async function (error) {
    if (error.response) {
      console.log(error);
      const data = error.response.data;
      console.error(error.response);

      // if (data.message) {
      // }

      // if (data.statusCode === 401) {
      //   await localforage.clear();
      // }
    } else {
    }

    return Promise.reject(error.response);
  },
);
