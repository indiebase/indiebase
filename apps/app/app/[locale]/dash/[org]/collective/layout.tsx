'use client';

import { type FC } from 'react';

export interface CollectiveLayoutProps extends React.PropsWithChildren {}

const CollectiveLayout: FC<CollectiveLayoutProps> = ({ children }) => {
  return <>{children}</>;
};

export default CollectiveLayout;
