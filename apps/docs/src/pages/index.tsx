import React, { FC } from 'react';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';

import * as styles from '@site/src/css/home.css.ts';
import {
  Box,
  Button,
  Card,
  Text,
  rem,
  Group,
  MantineColor,
  Flex,
  Stack,
  useMantineTheme,
  Title,
} from '@mantine/core';
import { IndiebaseSVG, NawbSVG, PlugKitSVG } from '@site/src/components/Icons';
import { useMediaQuery } from '@mantine/hooks';

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

        <Text size={rem(24)}>{props.productName}</Text>
      </Group>

      <Text mt={rem(13)} size="sm" c="dark" lineClamp={3}>
        {props.desc}
      </Text>

      <Button variant="light" color={props.color ?? 'cyan'} fullWidth mt={14}>
        Go
      </Button>
    </Card>
  );
};

const Screen2 = function () {
  return (
    <Stack align="center" mt={rem(100)}>
      <Title order={2}>The Deskbtm products under Indiebase</Title>
      <Group justify="center" mb={rem(40)} mt={rem(20)} gap={rem(30)}>
        <DeskbtmProductsCard
          color="pink"
          productName={'Indiebase'}
          desc={`Indiebase is a self-hosted platform explicitly designed for indie
          developers or teams. Providing BaaS and financial services.`}
          icon={<IndiebaseSVG style={{ width: rem(50), height: rem(50) }} />}
        />
        <DeskbtmProductsCard
          color="grape"
          productName={'Nawb'}
          desc={`Indiebase is a self-hosted platform explicitly designed for indie
            hackers or teams. Providing BaaS and financial services.`}
          icon={<NawbSVG style={{ width: rem(50), height: rem(50) }} />}
        />
        <DeskbtmProductsCard
          productName={'PlugKit'}
          desc={`Indiebase is a self-hosted platform explicitly designed for indie
            hackers or teams. Providing BaaS and financial services.`}
          icon={<PlugKitSVG style={{ width: rem(50), height: rem(50) }} />}
        />
      </Group>
      <Text size={rem(24)}>
        Join&nbsp;
        <Text
          component="a"
          target="_blank"
          href="https://deskbtm.com/en"
          fw={600}
          td="underline"
          size={rem(36)}
        >
          Deskbtm
        </Text>
        &nbsp;now&nbsp;
        <Box
          component="span"
          style={{ transform: 'rotate(15deg)', display: 'inline-block' }}
        >
          !!!
        </Box>
      </Text>
    </Stack>
  );
};

const Screen1 = function () {
  const theme = useMantineTheme();
  const isMobile = useMediaQuery(`(max-width: ${theme.breakpoints.sm})`);

  return (
    <Flex
      className={styles.header}
      my={rem(160)}
      gap="md"
      justify="center"
      align="center"
      direction="column"
      wrap="wrap"
      ml="auto"
      mr="auto"
    >
      <Text
        size={rem(80)}
        fw={500}
        variant="gradient"
        gradient={{ from: 'red', to: 'violet', deg: 0 }}
      >
        Indiebase
      </Text>
      <Text
        maw={isMobile ? null : '50%'}
        size="xl"
        mt={rem(30)}
        ta="center"
        variant="gradient"
        gradient={{ from: 'dark', to: 'gray', deg: 90 }}
      >
        Indiebase is a self-hosted platform explicitly designed for indie
        hackers or teams. Providing BaaS and financial services.
      </Text>
    </Flex>
  );
};

export default function Home(): JSX.Element {
  const { siteConfig } = useDocusaurusContext();

  return (
    <Layout title="Home" description="Indiebase homepage">
      <main className={styles.main}>
        <IndiebaseSVG className={styles.gearHeader} />
        <Background />

        <Screen1 />
        <Screen2 />
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
