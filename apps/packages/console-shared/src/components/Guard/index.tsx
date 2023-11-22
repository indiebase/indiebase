import { PropsWithChildren } from 'react';
import { FC, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';

export const Guard: FC<PropsWithChildren> = function (props) {
  // let navigate = useNavigate();

  // const [data] = useAtom(userProfileQuery);

  useEffect(() => {
    (async function () {
      // if (!t) {
      //   setRender(true);
      //   h.replace('/login');
      //   return;
      // }
      // const { data } = await loginJwt();
      // setRender(true);
      // if (data.code > 0) {
      //   // data.data && ctx.setUser(data.data);
      //   if (h.location.pathname.trim() === '/') h.replace('/dash');
      // } else {
      //   h.replace('/login');
      // }
    })();
  }, []);
  return <></>;
};
