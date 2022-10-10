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
  },
  plugins: [
    new webpack.IgnorePlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new RunScriptWebpackPlugin({ name: 'main.js', autoRestart: false }),
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'main.js',
    clean: true,
  },
};
