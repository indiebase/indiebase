import { req } from './request';

export const sendCaptcha = async (id) => {
  const { data } = await req.get('/api/v1/msg/mail/send-captcha');
  return data;
};
