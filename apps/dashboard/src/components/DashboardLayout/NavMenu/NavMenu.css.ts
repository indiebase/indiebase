import { rem } from '@mantine/core';
import { style, styleVariants } from '@vanilla-extract/css';

export const navMenuTileBase = style({
  display: 'block',
  width: '100%',
  padding: 'var(--mantine-spacing-xs)',
  paddingLeft: rem(15),
  borderRadius: 'var(--mantine-radius-sm)',
  fontSize: 'var(--mantine-font-size-sm)',
  textDecoration: 'none',
});

export const navMenuTile = styleVariants({
  inactive: [
    navMenuTileBase,
    {
      color: 'var(--mantine-color-gray-7)',
    },
  ],
  active: [
    navMenuTileBase,
    {
      color: 'var(--mantine-color-blue-6)',
      backgroundColor: 'var(--mantine-color-gray-0)',
    },
  ],
});
