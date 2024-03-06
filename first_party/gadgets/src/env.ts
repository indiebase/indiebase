/* eslint-disable @typescript-eslint/no-namespace */
/**
 * Copyright (C) 2023 Han
 * SPDX-License-Identifier: Apache-2.0
 */

// Preset env modes.

declare global {
  /**
   * Determine if it is a development environment..
   */
  const kDevMode: boolean;
  /**
   * Determine if it is a production environment..
   */
  const kProdMode: boolean;

  /**
   * Determine if it is a test environment.
   */
  const kTestMode: boolean;
}

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
 *  kMode('custom', process.env.NODE_ENV, 'custom_env')
 *  assert.ok(kCustomMode);
 * ```
 *
 * @param name
 * @param env
 * @param value
 */
export const kMode = (name: string, env: string, value: string) => {
  if (!name || typeof name !== 'string') {
    throw new Error('Illegal arguments: the first parameter should be string');
  }

  const key = name[0].toUpperCase() + name.slice(1);
  globalThis[`k${key}Mode`] = value === env;
};
