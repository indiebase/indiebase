const { VanillaExtractPlugin } = require('@vanilla-extract/webpack-plugin');

module.exports = function (_, options) {
  return {
    name: 'docusaurus-plugin-vanilla-extract',
    configureWebpack() {
      return {
        plugins: [new VanillaExtractPlugin(options)],
      };
    },
  };
};
