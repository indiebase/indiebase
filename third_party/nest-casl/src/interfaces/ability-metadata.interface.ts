import { AnyClass, AnyObject } from '@casl/ability/dist/types/types';
import { SubjectBeforeFilterHook, SubjectBeforeFilterTuple } from './hooks.interface';
import { AuthorizableRequest } from './request.interface';

export interface AbilityMetadata<Subject = AnyObject, Request = AuthorizableRequest> {
  action: string;
  subject: AnyClass<Subject>;
  subjectHook?: AnyClass<SubjectBeforeFilterHook<Subject, Request>> | SubjectBeforeFilterTuple<Subject, Request>;
}
