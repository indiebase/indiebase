import { ensureDir, writeJson } from 'fs-extra';
import { resolve } from 'path';

/**
 *
 * 持久化Swagger Api
 */
export const writeOpenApiDoc = async ({
  name,
  pkgName,
  pkgVersion,
  content,
}) => {
  const dir = resolve(`./docs/api/${pkgName}-${pkgVersion}`);
  await ensureDir(dir);
  await writeJson(resolve(dir, `${name}.json`), content);
};

/**
 * 验证码相关工具
 */
export const Captcha = {
  getSignupCaptchaToken(captcha, username) {
    return 'SIGNUP_' + Date.now() + '_' + captcha + '-' + username;
  },
};
