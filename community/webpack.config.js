const { createWebpackConfig } = require('@indiebase/dev/nestjs/webpack');
const path = require('node:path');

module.exports = async () => {
  return createWebpackConfig({
    cwd: __dirname,
    externalsAllowList: ['webpack/hot/poll?100', /^ky/, /^@casl\/ability/],
    additionalExternals: [path.resolve(__dirname, '../node_modules')],
  });
};
