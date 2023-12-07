import { MantineProvider } from '@mantine/core';
import { mantineTheme } from './mantine-theme';
import React from 'react';

// Default implementation, that you can customize
export default function Root({ children }) {
  return (
    <MantineProvider theme={mantineTheme} defaultColorScheme="light">
      {children}
    </MantineProvider>
  );
}
