const { createWebpackConfig } = require('@indiebase/dev/nestjs/webpack');
const path = require('node:path');

module.exports = async () => {
  return createWebpackConfig({
    swc: false,
    cwd: __dirname,
    externalsAllowList: ['webpack/hot/poll?100', /^ky/],
    additionalExternals: [path.resolve(__dirname, '../node_modules')],
  });
};
