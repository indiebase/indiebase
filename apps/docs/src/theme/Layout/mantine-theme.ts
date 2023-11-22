import { createTheme } from '@mantine/core';
import { themeToVars } from '@mantine/vanilla-extract';

export const mantineTheme = createTheme({
  fontFamily: 'unset',
});

// CSS variables object, can be access in *.css.ts files
export const cssVars = themeToVars(mantineTheme);
