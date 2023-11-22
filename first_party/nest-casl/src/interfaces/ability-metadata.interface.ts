import { AnyClass, AnyObject } from '../interfaces/common';
import {
  SubjectBeforeFilterHook,
  SubjectBeforeFilterTuple,
} from './hooks.interface';
import { AuthorizableRequest } from './request.interface';

export interface AbilityMetadata<
  Subject = AnyObject,
  Request = AuthorizableRequest,
> {
  action: string;
  subject: AnyClass<Subject>;
  subjectHook?:
    | AnyClass<SubjectBeforeFilterHook<Subject, Request>>
    | SubjectBeforeFilterTuple<Subject, Request>;
}
