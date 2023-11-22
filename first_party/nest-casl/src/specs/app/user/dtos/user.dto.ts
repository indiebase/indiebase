import { Field, ObjectType } from '@nestjs/graphql';
import { Roles } from '../../app.roles';
import { AuthorizableUser } from '@indiebase/nest-casl';

@ObjectType()
export class User implements AuthorizableUser<Roles> {
  @Field()
  id: string;

  roles: Roles[];

  name?: string;
}
