/* eslint-disable @typescript-eslint/no-require-imports */

const { createWebpackConfig } = require('@indiebase/dev/nestjs/webpack');
const path = require('node:path');

module.exports = async () => {
  return createWebpackConfig({
    swc: false,
    cwd: __dirname,
    externalsAllowList: [
      'webpack/hot/poll?100',
      /^ky/,
      /^@octokit/,
      /^octokit/,
      /^universal-user-agent/,
      /^before-after-hook/,
      /^universal-github-app-jwt/,
    ],
    additionalExternals: [path.resolve(__dirname, '../node_modules')],
  });
};
