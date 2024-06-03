import { Box } from '@mantine/core';
import type { PropsWithChildren } from 'react';
import { memo } from 'react';

export const Shape = memo<PropsWithChildren>(function (props) {
  return (
    <Box
      style={{
        zIndex: 1,
      }}
    >
      {props.children}
    </Box>
  );
});
