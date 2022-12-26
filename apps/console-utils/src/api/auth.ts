import { req } from './request';

/**
 * @deprecated
 */
export const sendCaptcha = async () => {
  const { data } = await req.get('/api/v1/msg/mail/send-captcha');
  return data;
};
