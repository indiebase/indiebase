import { useLayoutEffect, useEffect } from 'react';
export const useBrowserLayoutEffect =
  typeof window !== 'undefined' ? useLayoutEffect : useEffect;
