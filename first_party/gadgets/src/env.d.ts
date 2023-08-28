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
