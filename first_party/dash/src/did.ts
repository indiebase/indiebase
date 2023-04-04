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