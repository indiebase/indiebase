import { Box, Center, Text } from '@mantine/core';
import React from 'react';

export default function Custom404() {
  return (
    <Center
      sx={{
        height: 'calc(100vh - 60px)',
      }}
    >
      <Text
        component="span"
        align="center"
        variant="gradient"
        gradient={{ from: '#FF00B3', to: '#EC0047', deg: 45 }}
        weight={700}
        style={{ fontSize: '120px' }}
      >
        404
      </Text>
    </Center>
  );
}
