import axios from 'axios';
import { message } from 'antd';
import localforage from 'localforage';

export const req = axios.create({
  timeout: 8000,
  baseURL: process.env.REACT_APP_SJTU_MGMT_API as string,
});

req.interceptors.request.use(
  async function (config) {
    console.log('request....', config);
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
      message.error(data.message);
    }

    return response;
  },
  async function (error) {
    if (error.response) {
      const data = error.response.data;
      console.error(error.response);

      if (data.message) {
        message.error(data.message);
      }

      if (data.statusCode === 401) {
        await localforage.clear();
      }
    } else {
      message.error('无响应');
    }

    return Promise.reject(error.response);
  },
);
