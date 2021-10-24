import { Rule, RuleType } from '@midwayjs/decorator';

export class UserRegisterDto {
  @Rule(RuleType.string().email().required())
  username: string;

  @Rule(RuleType.string().required())
  password: string;

  @Rule(RuleType.string().max(6).required())
  captcha: string;
}
export class UserLoginPwdDto {
  @Rule(RuleType.string().email())
  username: string;

  @Rule(RuleType.string())
  passpord: string;

  @Rule(RuleType.string().max(6))
  captcha: string;
}
