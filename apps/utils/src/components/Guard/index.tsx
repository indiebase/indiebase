import React, { useContext, useState } from 'react';
import { FC, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function usePageViews() {
  React.useEffect(() => {}, [location.pathname]);
}

export const Guard: FC = function (props) {
  usePageViews();
  let navigate = useNavigate();

  useEffect(() => {
    (async function () {
      // const t = localStorage.getItem('t');
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
  // return shouldRender ? (props.children as any) : null;
};
