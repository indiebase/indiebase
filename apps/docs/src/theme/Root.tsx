import { ColorSchemeScript, MantineProvider } from '@mantine/core';
import { mantineTheme } from './mantine-theme';
import Head from '@docusaurus/Head';
import React from 'react';

// Default implementation, that you can customize
export default function Root({ children }) {
  return (
    <>
      <ColorSchemeScript />
      <MantineProvider theme={mantineTheme} defaultColorScheme="light">
        {children}
      </MantineProvider>
    </>
  );
}
