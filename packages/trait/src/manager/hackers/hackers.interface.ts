import { PrimitiveUser } from '../../user';
import { Visibility } from '../common';
export interface PrimitiveHacker extends PrimitiveUser {
  visibility: Visibility;
}
