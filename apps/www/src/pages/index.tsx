import React, { FC } from 'react';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';

import * as styles from './styles.css.ts';
import {
  Box,
  Button,
  Card,
  Title,
  Text,
  rem,
  Group,
  MantineColor,
} from '@mantine/core';
import {
  IndiebaseSVG,
  PlugKitSVG,
  TextIndiebaseSVG,
} from '@site/src/components/Icons';

const Background: FC = function () {
  return (
    <Box className={styles.background}>
      <IndiebaseSVG className={styles.gearXS} itemsColor={'#B0B0B0'} />
      <IndiebaseSVG className={styles.gearMD} />
    </Box>
  );
};

interface DeskbtmProductsCardProps {
  productName: string;
  desc: string;
  icon: React.ReactNode;
  color?: MantineColor;
}

const DeskbtmProductsCard: FC<DeskbtmProductsCardProps> = function (props) {
  return (
    <Card w={rem(350)} shadow="sm" p="lg">
      <Group justify="flex-start" align="center" gap="xs">
        {props.icon}

        <Text fw="bold" size={rem(24)}>
          {props.productName}
        </Text>
      </Group>

      <Text
        mt={rem(13)}
        size="sm"
        style={{ color: '#000', lineHeight: 1.5, height: 65 }}
        lineClamp={3}
      >
        {props.desc}
      </Text>

      <Button variant="light" color={props.color ?? 'cyan'} fullWidth mt={14}>
        Go
      </Button>
    </Card>
  );
};

export default function Home(): JSX.Element {
  const { siteConfig } = useDocusaurusContext();

  return (
    <Layout title="Home" description="Indiebase homepage">
      <main className={styles.main}>
        <Background />
        <Title order={1} size={88} variant="gradient">
          Indiebase
        </Title>
        <Title order={3} variant="gradient">
          Indiebase is a self-hosted platform explicitly designed for indie
          developers or teams. Providing BaaS and financial services.
        </Title>
        <Group justify="center" my={rem(100)} gap={rem(30)}>
          <DeskbtmProductsCard
            color="pink"
            productName={'Indiebase'}
            desc={`Indiebase is a self-hosted platform explicitly designed for indie
          developers or teams. Providing BaaS and financial services.`}
            icon={<IndiebaseSVG style={{ width: rem(50), height: rem(50) }} />}
          />
          <DeskbtmProductsCard
            productName={'PlugKit'}
            desc={`Indiebase is a self-hosted platform explicitly designed for indie
          developers or teams. Providing BaaS and financial services.`}
            icon={<PlugKitSVG style={{ width: rem(50), height: rem(50) }} />}
          />
        </Group>
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
      </main>
    </Layout>
  );
}
