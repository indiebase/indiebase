const { RunScriptWebpackPlugin } = require('run-script-webpack-plugin');
const webpack = require('webpack');
const path = require('path');
const nodeExternals = require('webpack-node-externals');

/**@type {import('webpack').Configuration}*/
module.exports = {
  entry: ['webpack/hot/poll?100', './src/main.ts'],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'main.js',
    clean: true,
  },
  target: 'node',
  externals: [
    nodeExternals({
      allowlist: ['webpack/hot/poll?100'],
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
  mode: 'development',
  resolve: {
    extensions: ['.js', '.json', '.node', '.mjs', '.ts', '.tsx'],
  },
  optimization: {
    minimize: false,
    usedExports: true,
  },
  plugins: [
    // new webpack.IgnorePlugin({
    //   resourceRegExp: /npm|fsevents|bufferutil|utf-8-validate|cardinal/g,
    // }),
    new webpack.HotModuleReplacementPlugin(),
    new RunScriptWebpackPlugin({ name: 'main.js', autoRestart: false }),
  ],
};
