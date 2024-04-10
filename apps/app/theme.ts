import { createTheme, type MantineTheme } from '@mantine/core';
import { type PartialDeep } from 'type-fest';

export const theme: PartialDeep<MantineTheme> = createTheme({
  fontFamily: `Inter, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Helvetica, Arial,
    sans-serif, Apple Color Emoji, Segoe UI Emoji`,
  other: {
    peachGradient: { from: '#ed6ea0', to: '#ec8c69', deg: 35 },
  },
});
