/* eslint-disable jsx-a11y/alt-text */
import { FC } from 'react';
import FaviconSvg from '@/assets/favicon.svg';
import { useHistory } from 'react-router-dom';
import { RouteContext } from '@ant-design/pro-layout';

export const NavMenuHeader: FC<{ title?: string; href?: string }> = function (
  props,
) {
  const h = useHistory();

  return (
    <RouteContext.Consumer>
      {(ctx) => {
        return (
          <div
            style={{
              textAlign: 'center',
              display: ctx.isMobile ? 'none' : 'flex',
              alignItems: 'center',
              cursor: 'default',
            }}
            onClick={() => {
              props.href && h.replace(props.href);
            }}
          >
            <img style={{ width: 35, height: 35 }} src={FaviconSvg} />
            <h1 style={{ fontWeight: 600 }}>{props.title}</h1>
          </div>
        );
      }}
    </RouteContext.Consumer>
  );
};
