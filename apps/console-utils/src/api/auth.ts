import { req } from './request';

/**
 * @deprecated
 */
export const sendCaptcha = async () => {
  const { data } = await req.get('/v1/msg/mail/send-captcha');
  return data;
};

export const generateOpt = async () => {
  const { data } = await req.get('/v1/auth/2fa/gen');
  return data;
};
