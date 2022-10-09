const { WebpackPnpExternals } = require('webpack-pnp-externals');
const { RunScriptWebpackPlugin } = require('run-script-webpack-plugin');
const webpack = require('webpack');
const path = require('path');

/**@type {import('webpack').Configuration}*/
module.exports = {
  entry: ['webpack/hot/poll?100', './src/main.ts'],
  target: 'node',
  externals: [
    WebpackPnpExternals({
      exclude: ['webpack/hot/poll?100'],
    }),
  ],
  externalsPresets: {
    node: true,
  },
  devtool: 'eval-cheap-source-map',
  module: {
    rules: [
      {
        test: /.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  mode: 'production',
  resolve: {
    extensions: ['.js', '.json', '.node', '.mjs', '.ts', '.tsx'],
    plugins: [
      {
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
                if (
                  request.endsWith('.js') &&
                  context.issuer &&
                  (context.issuer.endsWith('.ts') ||
                    context.issuer.endsWith('.tsx'))
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
                        __dirname +
                          '/@@notfound.js?' +
                          (externalMap.get(request) || request),
                        request,
                      );
                    },
                  );
                }
                // make not found errors runtime errors
                callback(
                  null,
                  __dirname +
                    '/@@notfound.js?' +
                    (externalMap.get(request) || request),
                  request,
                );
              },
            );
          };
        },
      },
    ],
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new RunScriptWebpackPlugin({ name: 'main.js', autoRestart: false }),
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'main.js',
    clean: true,
  },
};
