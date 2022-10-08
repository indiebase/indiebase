module.exports = {
  apply(resolver) {
    const resolve = resolver.resolve;
    resolver.resolve = function (
      context,
      path,
      request,
      resolveContext,
      callback,
    ) {
      const self = this;
      resolve.call(
        self,
        context,
        path,
        request,
        resolveContext,
        function (err, innerPath, result) {
          if (result) return callback(null, innerPath, result);
          if (err && !err.message.startsWith("Can't resolve"))
            return callback(err);
          // Allow .js resolutions to .tsx? from .tsx?
          if (
            request.endsWith('.js') &&
            context.issuer &&
            (context.issuer.endsWith('.ts') || context.issuer.endsWith('.tsx'))
          ) {
            return resolve.call(
              self,
              context,
              path,
              request.slice(0, -3),
              resolveContext,
              function (err, innerPath, result) {
                if (result) return callback(null, innerPath, result);
                if (err && !err.message.startsWith("Can't resolve"))
                  return callback(err);
                // make not found errors runtime errors
                callback(
                  null,
                  __dirname + '/@@notfound.js?' + request,
                  request,
                );
              },
            );
          }
          // make not found errors runtime errors
          callback(null, __dirname + '/@@notfound.js?' + request, request);
        },
      );
    };
  },
};
