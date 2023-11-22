/**
 * captcha utils
 */
export const CaptchaUtils = {
  getSignupCaptchaToken(captcha: string, t: string) {
    return 'SIGNUP_' + captcha + '-' + t;
  },
};
