import {
  Box,
  type BoxComponentProps,
  type PolymorphicComponentProps,
} from '@mantine/core';
import { memo } from 'react';

export interface BoxExForegroundProps
  extends PolymorphicComponentProps<'div', BoxComponentProps> {}

export const BoxExForeground = memo<BoxExForegroundProps>(function (props) {
  const { style, ...rest } = props;

  return (
    <Box
      style={Object.assign(
        {},
        {
          zIndex: 1,
        },
        style,
      )}
      {...rest}
    >
      {props.children}
    </Box>
  );
});
