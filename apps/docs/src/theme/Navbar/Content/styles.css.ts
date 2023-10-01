import { style } from '@vanilla-extract/css';
import { cssVars } from '@site/src/theme/Layout/maintine-theme';

export const colorModeToggle = style({
  '@media': {
    [`(max-width: ${cssVars.breakpoints.lg})`]: {
      display: 'none',
    },
  },
});

export const navbarItemsExt = style({
  flex: 1,
  vars: {
    '--ifm-navbar-item-padding-horizontal': '14px',
  },
});

export const navbarItemExt = style({
  fontWeight: 'var(--ifm-font-weight-normal)',
  fontSize: 'var(--mantine-font-size-sm)',
  transition: 'opacity 200ms',
  ':hover': {
    color: 'unset',
    opacity: 0.6,
  },
});
