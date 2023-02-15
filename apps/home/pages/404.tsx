import { Center, Text, useMantineTheme } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import React from 'react';

export default function Custom404() {
  const theme = useMantineTheme();
  const matches = useMediaQuery(`(max-width: ${theme.breakpoints.sm}px)`);

  return (
    <Center
      sx={
        {
          // height: 'calc(100vh - 60px)',
        }
      }
    >
      <Text
        component="span"
        align="center"
        variant="gradient"
        gradient={{ from: '#FF00B3', to: '#EC0047', deg: 45 }}
        weight={700}
        style={{ fontSize: matches ? 120 : 200 }}
      >
        404
      </Text>
    </Center>
  );
}
