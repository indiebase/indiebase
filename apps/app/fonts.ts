import localFont from 'next/font/local';

export const fonts = localFont({
  src: [
    {
      path: './public/fonts/Inter-Light.woff2',
      weight: '300',
      style: 'normal',
    },
    {
      path: './public/fonts/Inter-LightItalic.woff2',
      weight: '300',
      style: 'italic',
    },
    {
      path: './public/fonts/Inter-Regular.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: './public/fonts/Inter-Italic.woff2',
      weight: '400',
      style: 'italic',
    },
    {
      path: './public/fonts/Inter-Medium.woff2',
      weight: '500',
      style: 'normal',
    },
    {
      path: './public/fonts/Inter-MediumItalic.woff2',
      weight: '500',
      style: 'italic',
    },
    {
      path: './public/fonts/Inter-SemiBold.woff2',
      weight: '600',
      style: 'normal',
    },
    {
      path: './public/fonts/Inter-SemiBoldItalic.woff2',
      weight: '600',
      style: 'italic',
    },
    {
      path: './public/fonts/Inter-Bold.woff2',
      weight: '700',
      style: 'normal',
    },
    {
      path: './public/fonts/Inter-BoldItalic.woff2',
      weight: '700',
      style: 'italic',
    },
  ],
});
