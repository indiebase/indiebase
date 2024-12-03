'use client';

import NextTopLoader from 'nextjs-toploader';
import { type FC } from 'react';

export const RouterProgress: FC = () => {
  return <NextTopLoader color="#ff86aa" showSpinner={false} />;
};
