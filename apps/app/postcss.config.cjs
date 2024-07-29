/* eslint-env node */

module.exports = {
  plugins: Object.assign(
    {},
    {
      'postcss-preset-mantine': {
        mixins: {
          clearfix: {
            '&::after': {
              content: '""',
              display: 'table',
              clear: 'both',
            },
          },
        },
      },
    },
    process.env.NODE_ENV !== 'development' && {
      'postcss-flexbugs-fixes': {},
      'postcss-preset-env': {
        autoprefixer: {
          flexbox: 'no-2009',
        },
        stage: 3,
        features: {
          'custom-properties': false,
        },
      },
    },
  ),
};
