import {
  Box,
  type BoxComponentProps,
  type PolymorphicComponentProps,
} from '@mantine/core';
import { memo } from 'react';

export interface BoxExBackgroundProps
  extends PolymorphicComponentProps<'div', BoxComponentProps> {}

export const BoxExBackground = memo<BoxExBackgroundProps>(function (props) {
  const { style, ...rest } = props;

  return (
    <Box
      style={Object.assign(
        {},
        {
          position: 'absolute',
          top: 0,
          right: 0,
          bottom: 0,
          left: 0,
          zIndex: -1,
        },
        style,
      )}
      {...rest}
    >
      {props.children}
    </Box>
  );
});
