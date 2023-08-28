// Preset env modes.
/// <reference path="./env.d.ts" />

import assert from 'assert';

const NODE_ENV = globalThis.process.env.NODE_ENV;

/**
 * Determine if it is a development environment..
 */
export const kDevMode = NODE_ENV === 'development' || NODE_ENV === 'dev';
//@ts-ignore
globalThis.kDevMode = kDevMode;

/**
 * Determine if it is a test environment.
 */
export const kTestMode = NODE_ENV === 'test';
//@ts-ignore
globalThis.kTestMode = kTestMode;

/**
 * Determine if it is a production environment..
 */
export const kProdMode = NODE_ENV === 'production' || NODE_ENV === 'prod';
//@ts-ignore
globalThis.kProdMode = kProdMode;

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
