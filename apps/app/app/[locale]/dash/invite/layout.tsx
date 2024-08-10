'use client';

import { type FC } from 'react';

export type BackendLayoutProps = React.PropsWithChildren;

const Layout: FC<BackendLayoutProps> = ({ children }) => {
  return <>{children}</>;
};

export default Layout;
