/* eslint-disable jsx-a11y/anchor-is-valid */
import { FC, useState } from 'react';
import ProLayout from '@ant-design/pro-layout';
import { Route, Switch, useHistory } from 'react-router-dom';
import { adminDashboardRoute, flatAdminDashboardRoutes } from './admin-route';
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import { AvatarMenuList, NavMenuHeader } from '@/components';

export const AdminDashboard: FC = function () {
  const h = useHistory();
  const [collapsed, setCollapsed] = useState(false);

  return (
    <ProLayout
      key="admin-dashboard-layout"
      className="admin-dashboard-layout"
      fixedHeader
      collapsedButtonRender={false}
      navTheme="light"
      menuHeaderRender={() => (
        <NavMenuHeader title={process.env.REACT_APP_ADMIN_TITLE} href="/dash" />
      )}
      title={process.env.REACT_APP_ADMIN_TITLE}
      // logo={Favicon}
      collapsed={collapsed}
      fixSiderbar={true}
      onCollapse={setCollapsed}
      rightContentRender={(_props) => (
        <div>
          <AvatarMenuList />
        </div>
      )}
      headerContentRender={() => {
        return (
          <div
            onClick={() => setCollapsed(!collapsed)}
            style={{
              cursor: 'pointer',
              fontSize: '16px',
              display: 'inline-block',
            }}
          >
            {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
          </div>
        );
      }}
      menuProps={{
        style: {
          fontSize: '15px',
        },
      }}
      route={adminDashboardRoute}
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
    >
      <Switch>
        {flatAdminDashboardRoutes.map((r, i) => {
          return <Route key={i} {...r} />;
        })}
      </Switch>
    </ProLayout>
  );
};
