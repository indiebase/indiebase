const { kDevMode } = require('@deskbtm/gadgets');

module.exports = {
  debug: kDevMode,
  reloadOnPrerender: kDevMode,
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'zh'],
  },
};
