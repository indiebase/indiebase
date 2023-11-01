import { style, styleVariants } from '@vanilla-extract/css';

export const navMenuTileBase = style({});

export const navMenuTile = styleVariants({
  inactive: [navMenuTileBase],
  active: [navMenuTileBase, { transform: 'rotate(90deg)' }],
});
