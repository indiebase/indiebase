/*
Hide color mode toggle in small viewports
 */

import { style } from '@vanilla-extract/css';

export const colorModeToggle = style({
  '@media': {
    '(max-width: 996px)': {
      display: 'none',
    },
  },
});

export const navbarItemsExt = style({
  flex: 1,
  vars: {
    '--ifm-navbar-item-padding-horizontal': '24px',
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
