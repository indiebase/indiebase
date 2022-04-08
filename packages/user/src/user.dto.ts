import { Rule, RuleType } from '@midwayjs/validate';
export class RegisterUserDto {
  @Rule(RuleType.string().required())
  username: string;

  @Rule(RuleType.string().min(8).max(16).required())
  password: string;
}
