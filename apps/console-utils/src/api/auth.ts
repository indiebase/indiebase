import { req } from './request';

/**
 * @deprecated
 */
export const sendCaptcha = async () => {
  const { data } = await req.get('/v1/msg/mail/send-captcha');
  return data;
};

export const generateOptApi = async () => {
  const { data } = await req.post('/v1/auth/2fa');
  return data;
};

export const deleteOptApi = async () => {
  const { data } = await req.delete('/v1/auth/2fa');
  return data;
};

export const optVerifyApi = async (params) => {
  const { data } = await req.post('/v1/auth/2fa/verify', params);
  return data;
};
