import Document, { Html, Head, Main, NextScript } from 'next/document';
import React from 'react';
import { createGetInitialProps } from '@mantine/next';
const getInitialProps = createGetInitialProps();

class MyDocument extends Document {
  static override getInitialProps = getInitialProps;

  override render() {
    return (
      <Html>
        <Head />
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
