import { style } from '@vanilla-extract/css';
import { cssVars } from '@site/src/theme/mantine-theme';

export const toggle = style({
  '@media': {
    [`(max-width: ${cssVars.breakpoints.lg})`]: {
      display: 'block',
    },
  },
});
