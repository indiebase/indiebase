import { Box } from '@mantine/core';
import { FC, PropsWithChildren } from 'react';

export const GPUAccel: FC<PropsWithChildren> = function (props) {
  return (
    <Box
      className="gpu-accel"
      sx={{
        '*': {
          willChange: 'transform, opacity',
          backfaceVisibility: 'hidden',
          transform: 'translate3d(0, 0, 0)',
        },
      }}
    >
      {props.children}
    </Box>
  );
};
