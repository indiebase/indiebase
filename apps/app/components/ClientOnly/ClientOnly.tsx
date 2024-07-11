'use client';

import { useEffect, useState } from 'react';

export interface ClientOnlyProps {}

export const ClientOnly = function ({ children, ...delegated }) {
  const [hasMounted, setHasMounted] = useState(false);
  useEffect(() => {
    setHasMounted(true);
  }, []);
  if (!hasMounted) {
    return null;
  }
  return <div {...delegated}>{children}</div>;
};
