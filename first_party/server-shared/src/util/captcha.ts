/**
 * captcha utils
 */
export const CaptchaUtils = {
  getSignupCaptchaToken(captcha, t) {
    return 'SIGNUP_' + captcha + '-' + t;
  },
};
