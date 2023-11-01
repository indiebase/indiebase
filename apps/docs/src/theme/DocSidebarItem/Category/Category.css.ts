import { style, styleVariants } from '@vanilla-extract/css';

export const collapseBase = style({
  transition: 'transform .25s cubic-bezier(.4,0,.2,1)',
});

export const collapseBtn = styleVariants({
  primary: [collapseBase, { transform: 'rotate(0deg)' }],
  collapsed: [collapseBase, { transform: 'rotate(90deg)' }],
});
