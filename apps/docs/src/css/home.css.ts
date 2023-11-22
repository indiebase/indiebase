import { rem } from '@mantine/core';
import { keyframes, style } from '@vanilla-extract/css';

const rotate = keyframes({
  from: { transform: 'rotate(0deg)' },
  to: { transform: 'rotate(360deg)' },
});

const antiRotate = keyframes({
  from: { transform: 'rotate(360deg)' },
  to: { transform: 'rotate(0deg)' },
});

export const deskbtmRotate = style({
  animation: `${rotate} .8s ease-out`,
  display: 'inline-block',
});

export const main = style({
  position: 'relative',
});

export const background = style({
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  width: '100%',
  height: '100%',
  zIndex: -1,
});

export const background1 = style({
  position: 'relative',
  overflow: 'hidden',
  width: '100%',
  height: '100%',
});

export const gearMD = style({
  position: 'absolute',
  width: rem(600),
  height: rem(600),
  left: `calc(100% - ${rem(620)})`,
  top: `calc(100dvh - ${rem(300)} - var(--ifm-navbar-height))`,
  animation: `${rotate} 20s linear infinite`,
});

export const gearXS = style({
  position: 'absolute',
  width: rem(300),
  height: rem(300),
  right: rem(-150),
  top: `calc(100dvh - ${rem(520)} - var(--ifm-navbar-height))`,
  animation: `${antiRotate} 8s linear infinite`,
});

export const header = style({
  position: 'relative',
});

export const gearHeader = style({
  position: 'absolute',
  width: rem(300),
  height: rem(300),
  left: rem(-150),
  top: rem(-150),
  animation: `${rotate} 12s linear infinite`,
});
