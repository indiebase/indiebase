import { style } from '@vanilla-extract/css';
import { cssVars } from '@site/src/theme/Layout/mantine-theme';

export const toggle = style({
  '@media': {
    [`(max-width: ${cssVars.breakpoints.lg})`]: {
      display: 'block',
    },
  },
});
