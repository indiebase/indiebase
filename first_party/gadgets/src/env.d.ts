/**
 * Copyright (C) 2023 Han
 * SPDX-License-Identifier: Apache-2.0
 */

declare module globalThis {
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
