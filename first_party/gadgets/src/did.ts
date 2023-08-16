// Inspired by await-to-js

/**
 * Get the await result with tuple.
 *
 * @param {Promise} promise - Promise task.
 * @param defaultErr - default error.
 * @returns {Promise}
 *
 * @example
 * ```ts
 *  const [err, value] = await did(new Promise((resolve, reject)=>resolve("hello")));
 * ```
 */
export const did = function <T, U = Error>(
  promise: Promise<T>,
  defaultErr?: Record<any, any>,
): Promise<[U, undefined] | [null, T]> {
  return promise
    .then<[null, T]>((data: T) => [null, data])
    .catch<[U, undefined]>((err: U) => {
      if (defaultErr) {
        const mergedErr = Object.assign({}, err, defaultErr);
        return [mergedErr, undefined];
      }

      return [err, undefined];
    });
};
