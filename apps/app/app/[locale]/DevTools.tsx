'use client';

import 'jotai-devtools/styles.css';
import '@deskbtm/gadgets/env';

import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { DevTools as JotaiDevTools } from 'jotai-devtools';
import { type FC } from 'react';
import { scan } from 'react-scan';

if (typeof window !== 'undefined') {
  scan({
    enabled: kDevMode,
    log: true,
  });
}

export const DevTools: FC = function () {
  return kDevMode ? (
    <>
      <JotaiDevTools />
      <ReactQueryDevtools initialIsOpen={kDevMode} position="bottom" />
    </>
  ) : null;
};
