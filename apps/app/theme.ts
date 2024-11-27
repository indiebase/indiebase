'use client';

import {
  createTheme,
  type CSSVariablesResolver,
  localStorageColorSchemeManager,
  type MantineTheme,
  rem,
} from '@mantine/core';
import { type PartialDeep } from 'type-fest';

export const theme: PartialDeep<MantineTheme> = createTheme({
  fontFamily: `Inter, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Helvetica, Arial,
    sans-serif, Apple Color Emoji, Segoe UI Emoji`,
  other: {
    gradients: {
      peach: { from: '#ed6ea0', to: '#ec8c69', deg: 35 },
      success: { from: '#16BC88', to: '#009C63', deg: 35 },
    },
    dashBorder: `${rem(1.5)} dashed var()`,
    backdropFilter: 'saturate(180%) blur(10px)',
    backdropBlurColorLight: 'hsla(0,0%,100%,.6)',
    backdropBlurColorDark: 'hsla(0,0%,100%,.6)',
    dashBorderColorLight: 'var(--mantine-color-gray-3)',
    dashBorderColorDark: 'var(--mantine-color-white)',
  },
});

export const cssVariablesResolver: CSSVariablesResolver = (theme) => {
  return {
    variables: {
      '--indiebase-backdrop-filter': theme.other.backdropFilter,
    },
    light: {
      '--indiebase-dash-border-color': theme.other.dashBorderColorLight,
      '--indiebase-backdrop-blur-color': theme.other.backdropBlurColorLight,
    },
    dark: {
      '--indiebase-dash-border-color': theme.other.dashBorderColorDark,
      '--indiebase-backdrop-blur-color': theme.other.backdropBlurColorDark,
    },
  };
};

export const colorSchemeManager = localStorageColorSchemeManager({
  key: 'indiebase-color-scheme',
});
