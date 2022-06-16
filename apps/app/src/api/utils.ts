import { req } from './request';

export const sendCaptcha = async (d) => {
  const { data } = await req.post('/api/v1/msg/mail/send-captcha', d);
  return data;
};
