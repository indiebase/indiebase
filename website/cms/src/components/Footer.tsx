import React, { FC } from 'react';
import { Layout } from 'antd';
import './Footer.css';

const { Footer } = Layout;

export const AppFooter: FC<any> = function (props) {
  return (
    <Footer className="com-footer" style={{ textAlign: 'center' }}>
      Copyright©{new Date().getFullYear()} 上海交通大学网络信息中心
    </Footer>
  );
};
