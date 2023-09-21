import React, { FC } from 'react';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';

import * as styles from './styles.css.ts';
import { Box, Title } from '@mantine/core';
import { IndiebaseSVG } from '@site/src/components/IndiebaseSVG.tsx';

const Background: FC = function () {
  return (
    <Box className={styles.background}>
      <IndiebaseSVG className={styles.gearXS} itemsColor={'#B0B0B0'} />
      <IndiebaseSVG className={styles.gearMD} />
    </Box>
  );
};

export default function Home(): JSX.Element {
  const { siteConfig } = useDocusaurusContext();

  return (
    <Layout title="Home" description="Indiebase homepage">
      <main className={styles.main}>
        <Background />
        <Title order={1} variant="gradient">
          Indiebase
        </Title>
      </main>
    </Layout>
  );
}
