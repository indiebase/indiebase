import { FC, PropsWithChildren, useEffect, useState } from 'react';
import { useAuthz } from './use-authz';

export interface CanProps extends PropsWithChildren {
  i: string;
  the: string | string[];
  all?: boolean;
  any?: boolean;
}

export const Can: FC<CanProps> = function (props) {
  const { authorizer } = useAuthz();
  const [isOwn, setOwn] = useState(false);
  const { i, the, all, any, children } = props;

  useEffect(() => {
    (async () => {
      let p;
      if (all) {
        p = await authorizer.canAll(i, the as []);
      } else if (any) {
        p = await authorizer.canAny(i, the as []);
      } else {
        p = await authorizer.can(i, the as string);
      }
      setOwn(p);
    })();
  }, [i, the, all, any]);

  return <>{isOwn ? children : null}</>;
};
