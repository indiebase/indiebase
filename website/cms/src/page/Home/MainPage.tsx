import { FC, useContext } from 'react';
import ProLayout, {
  RouteContext,
  RouteContextType,
} from '@ant-design/pro-layout';
import { Route, Switch, useHistory } from 'react-router-dom';
import { GlobalContext } from '@/provider';
import { Button } from 'antd';
import { getJaccountAuthCode } from '@/common';
import { observer } from 'mobx-react-lite';
import { AvatarMenuList, NavMenuHeader } from '@/components';
import { flatHomeRoutes, mainRoute } from './home-route';

export const HomeRightNav: FC<any> = (props) => {
  const ctx = useContext(GlobalContext);
  const h = useHistory();

  console.log(ctx);

  if (typeof ctx.isLogin !== 'boolean') {
    return <div></div>;
  }

  return (
    <RouteContext.Consumer>
      {(value: RouteContextType) => {
        return (
          <div
            style={{ display: 'flex', alignItems: 'center', height: '48px' }}
          >
            {ctx.isLogin ? (
              <>
                <Button
                  type="ghost"
                  style={{ marginRight: value.isMobile ? 10 : 20 }}
                  onClick={() => {
                    console.log(h);
                    h.push('/dash');
                  }}
                >
                  进入管理台
                </Button>
                <div style={{ marginRight: value.isMobile ? 0 : 40 }}>
                  <AvatarMenuList />
                </div>
              </>
            ) : (
              [
                <Button
                  style={{ marginRight: 30 }}
                  type="ghost"
                  onClick={() => {
                    // window.open(
                    //   'https://127.0.0.1:6666/auth/github-oauth',
                    //   '_self',
                    // );
                    window.open(
                      getJaccountAuthCode(
                        `${process.env.REACT_APP_SITE_URI}/?referer=oauth`,
                      ),
                      '_self',
                    );
                  }}
                >
                  登录
                </Button>,
                // <Button
                //   style={{ marginRight: 30 }}
                //   type="ghost"
                //   onClick={() => {
                //     window.open(
                //       'https://127.0.0.1:6666/auth1/google-oauth',
                //       '_self',
                //     );
                //     // window.open(
                //     //   getJaccountAuthCode(
                //     //     `${process.env.REACT_APP_SITE_URI}/?referer=oauth`,
                //     //   ),
                //     //   '_self',
                //     // );
                //   }}
                // >
                //   google
                // </Button>,
              ]
            )}
          </div>
        );
      }}
    </RouteContext.Consumer>
  );
};

const OHomeRightNav = observer(HomeRightNav);

export const MainPage: FC = function () {
  const h = useHistory();

  return (
    <ProLayout
      key="home-pro-layout"
      className="home-pro-layout"
      route={mainRoute}
      fixedHeader
      layout="top"
      menuItemRender={(item, dom) => {
        return (
          <a
            onClick={() => {
              h.push(item.path || '/');
            }}
          >
            {dom}
          </a>
        );
      }}
      rightContentRender={(_props) => <OHomeRightNav />}
      navTheme="light"
      title={process.env.REACT_APP_TITLE}
      menuHeaderRender={(_l, title) => (
        <NavMenuHeader title={process.env.REACT_APP_TITLE} href="/home" />
      )}
      menuProps={{
        style: {
          fontSize: '15px',
        },
      }}
    >
      <Switch>
        {flatHomeRoutes.map((r, i) => {
          return <Route key={i} {...r} />;
        })}
      </Switch>
    </ProLayout>
  );
};
