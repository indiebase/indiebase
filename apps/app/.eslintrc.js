module.exports = {
  extends: 'next/core-web-vitals',
  plugins: ['eslint-plugin-react'],
  rules: {
    'react/self-closing-comp': [
      'error',
      {
        component: true,
        html: true,
      },
    ],
  },
};
