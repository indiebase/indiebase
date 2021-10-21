import { Rule, RuleType } from '@midwayjs/decorator';

export class UserRegisterDto {
  @Rule(RuleType.string().required())
  email: string;

  @Rule(RuleType.string())
  username: string;

  @Rule(RuleType.string().max(6))
  captcha: string;
}
