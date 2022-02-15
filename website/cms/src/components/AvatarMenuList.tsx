import { FC, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Menu, Avatar, Dropdown } from 'antd';
import localforage from 'localforage';
import { is } from '@/common';
import { GlobalContext } from '@/provider';
import { observer } from 'mobx-react-lite';

export const CommonSettingMenu: FC<any> = (props) => {
  const h = useNavigate();

  return (
    <Menu style={{ padding: '6px 10px' }}>
      <Menu.Item key="username">用户：{props.name}</Menu.Item>
      <Menu.Item
        key="setting"
        onClick={() => {
          // h.push('/dash/profile');
        }}
      >
        个人设置
      </Menu.Item>
      <Menu.Item
        key="logout"
        onClick={async () => {
          await localforage.clear();
          location.href = '/';
        }}
      >
        退出登录
      </Menu.Item>
    </Menu>
  );
};

export const AvatarMenuList: FC<any> = observer((props) => {
  const ctx = useContext(GlobalContext);
  const name = ctx.user?.jaccount.name;

  return (
    <Dropdown
      overlay={<CommonSettingMenu name={name} />}
      placement="bottomLeft"
      destroyPopupOnHide
      arrow={true}
      trigger={['click']}
    >
      <Avatar
        style={{
          backgroundColor: '#1890ff',
          position: 'relative',
          top: '-2px',
        }}
        shape="circle"
      >
        {is.string(name) ? ctx.user.jaccount.name[0].toUpperCase() : ''}
      </Avatar>
    </Dropdown>
  );
});
