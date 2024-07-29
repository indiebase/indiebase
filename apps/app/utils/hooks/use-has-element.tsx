import { useEffect, useState } from 'react';

export const useHasElement = function <E extends HTMLElement>(
  selector: string,
  ref?: E,
) {
  const [has, setHas] = useState(false);

  useEffect(() => {
    const el = ref ?? document;
    const has = el?.querySelector(selector);
    setHas(!!has);
  });

  return {
    has,
  };
};
