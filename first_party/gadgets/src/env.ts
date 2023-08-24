// Preset env modes.

import assert from 'assert';

/**
 * Development env.
 */
export const kDevMode =
  process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'dev';
/**
 * Test env.
 */
export const kTestMode = process.env.NODE_ENV === 'test';
/**
 * Release env.
 */
export const kReleaseMode =
  process.env.NODE_ENV === 'production' || process.env.NODE_ENV === 'prod';

/**
 * This function should be initialized at the beginning of program.
 *
 *  @example
 * ```ts
 *  declare const kCustomMode: boolean;
 *
 *  initCustomMode('custom', process.env.NODE_ENV, 'custom_env')
 *  assert.ok(kCustomMode);
 * ```
 *
 * @param name
 * @param env
 * @param value
 */
export const initCustomMode = (name: string, env: string, value: string) => {
  assert.ok(name);
  assert.ok(env);

  const key = name[0].toUpperCase() + name.slice(1);
  globalThis[`k${key}Mode`] = value === env;
};
