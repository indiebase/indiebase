import { EffectCallback, useEffect, useRef } from 'react';

/**
 * Only execute once at first time.It has the both `firstRender` and `useEffectOnce` function.
 *
 * @param {EffectCallback} effect
 * @returns {boolean}
 * @example
 * ```ts
 * const isFirst = useFirstRender()
 *
 * // or
 *
 * useFirstRender(()=>{
 *
 * })
 *
 * ```
 *
 *
 */
export function useFirstRender(effect?: EffectCallback): boolean {
  const ref = useRef(true);
  useEffect(effect, []);

  if (ref.current) {
    ref.current = false;
    return true;
  }
  return ref.current;
}
