// Redis key prefix to differentiate business.
export enum BusinessLabels {
  accessToken = 'access-token',
  captcha = 'captcha',
}

/**
 * Storage constants.
 */
// Tmp bucket to store temp files. You can set up scheduled cleaning.
export const TMP_BUCKET = 'tmp';

/**
 * Database
 */

export const INDIEBASE_MGR = 'indiebase_mgr';
