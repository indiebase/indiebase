import { style } from '@vanilla-extract/css';
import { cssVars } from '@site/src/theme/Layout/maintine-theme';

export const toggle = style({
  '@media': {
    [`(max-width: ${cssVars.breakpoints.lg})`]: {
      display: 'block',
    },
  },
});
