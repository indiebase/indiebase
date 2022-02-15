import { useContext, FC, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { getUserProfile, loginWithJaccountCode } from '@/api';
import { GlobalContext } from '@/provider';
import localforage from 'localforage';
import { is } from '@/common';
import { observer } from 'mobx-react-lite';

function usePageViews() {
  const local = useLocation();
  useEffect(() => {
    (async () => {
      const t = await localforage.getItem('t');
      const logout = await localforage.getItem('logout');
      if (!t && !logout) {
        await localforage.setItem('logout', true);
        location.href = '/';
      }
    })();
  }, [local.pathname]);
}

export const Guard: FC<any> = observer(function (props) {
  const ctx = useContext(GlobalContext);
  const h = useNavigate();

  usePageViews();

  useEffect(() => {
    (async function () {
      const t = await localforage.getItem('t');
      const j_ac = await localforage.getItem('j_ac');

      if (t) {
        const profile = await getUserProfile().catch(() => {});
        console.log(profile);
        if (profile && profile.code > 0) {
          ctx.setUser(Object.assign({}, profile.data, { t, j_ac }));
          ctx.setLogin(true);
        } else {
          ctx.setLogin(false);
        }
        location.pathname === '/' && h.push('/home');
        return;
      }
      ctx.setLogin(false);

      const code = new URL(location.href)?.searchParams.get('code');
      const referer = new URL(location.href)?.searchParams.get('referer');
      if (!!code && referer === 'oauth') {
        const res = await loginWithJaccountCode({
          code,
          redirect_uri: `${process.env.REACT_APP_SITE_URI}/?referer=oauth`,
        });
        // token
        await localforage.setItem('t', res.data.t);
        // jaccount的token
        await localforage.setItem('j_ac', res.data.j_ac);

        location.href = '/home';
      }
      location.pathname === '/' && h.push('/home');
    })();
  }, []);

  return is.boolean(ctx.isLogin) ? props.children : <div></div>;
});
