import {
  Box,
  type BoxComponentProps,
  type Factory,
  factory,
  type PolymorphicComponentProps,
} from '@mantine/core';
import { type FC } from 'react';

import { BoxExBackground, type BoxExBackgroundProps } from './BoxExBackground';
import { BoxExForeground, type BoxExForegroundProps } from './BoxExForeground';

export interface BoxExProps
  extends PolymorphicComponentProps<'div', BoxComponentProps> {}

export type BoxExFactory = Factory<{
  props: BoxExProps;
  ref: HTMLDivElement;
  staticComponents: {
    Background: FC<BoxExBackgroundProps>;
    Foreground: FC<BoxExForegroundProps>;
  };
}>;

export const BoxEx = factory<BoxExFactory>((props, ref) => {
  return <Box ref={ref} {...props} pos="relative" />;
});

BoxEx.displayName = '@indiebase/desktop/BoxEx';

BoxEx.Background = BoxExBackground;
BoxEx.Background.displayName = '@indiebase/desktop/BoxExBackground';

BoxEx.Foreground = BoxExForeground;
BoxEx.Foreground.displayName = '@indiebase/desktop/BoxExForeground';
