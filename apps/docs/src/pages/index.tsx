import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import type { MantineColor } from '@mantine/core';
import {
  Box,
  Button,
  Card,
  Flex,
  Group,
  rem,
  Stack,
  Text,
  Title,
  useMantineTheme,
} from '@mantine/core';
import { useIntersection, useMediaQuery } from '@mantine/hooks';
import { IndiebaseSVG, NawbSVG, PlugKitSVG } from '@site/src/components/Icons';
import * as styles from '@site/src/css/home.css.ts';
import Layout from '@theme/Layout';
import type { FC } from 'react';
import React, { useRef } from 'react';

const Background: FC = function () {
  return (
    <Box className={styles.background}>
      <IndiebaseSVG className={styles.gearHeader} />
      <Box className={styles.background1}>
        <IndiebaseSVG className={styles.gearXS} itemsColor={'#B0B0B0'} />
        <IndiebaseSVG className={styles.gearMD} />
      </Box>
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

      <Box h={rem(74)}>
        <Text mt={rem(13)} size="sm" c="dark" lineClamp={3}>
          {props.desc}
        </Text>
      </Box>

      <Button variant="light" color={props.color ?? 'cyan'} fullWidth mt={14}>
        Go
      </Button>
    </Card>
  );
};

const Screen2 = function () {
  const containerRef = useRef<HTMLDivElement>(null);
  const { ref, entry } = useIntersection({
    root: containerRef.current,
    rootMargin: '50px',
    threshold: 0.5,
  });

  const {
    siteConfig: { customFields },
  } = useDocusaurusContext();

  return (
    <Stack align="center" mt={rem(80)}>
      <Title order={2} px={rem(20)}>
        The Deskbtm products under Indiebase
      </Title>
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
          desc={`Indiebase is a self-hosted platform explicitly.`}
          icon={<PlugKitSVG style={{ width: rem(50), height: rem(50) }} />}
        />
      </Group>
      <Text size={rem(24)}>
        Join&nbsp;
        <Text
          ref={ref}
          className={entry?.isIntersecting ? styles.deskbtmRotate : null}
          component="a"
          target="_blank"
          href={customFields.deskbtmURL as string}
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
      mt={rem(160)}
      mb={rem(110)}
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
        maw={!isMobile ? '50%' : null}
        size="xl"
        mt={rem(30)}
        ta="center"
        variant="gradient"
        gradient={{ from: 'dark', to: 'gray', deg: 90 }}
      >
        Indiebase is a self-hosted platform explicitly designed for indie
        hackers or teams. Providing BaaS and financial services.
      </Text>
      <Text c="gray" size="sm" ta="center">
        Private Open Collective + Firebase Successor. Make revenue generation
        easier for indie hackers and teams with software projects.
      </Text>
      <Group mt={rem(20)} maw={isMobile ? '50%' : 'null'} justify="center">
        <Button variant="light" size="lg" radius="xl">
          Getting started
        </Button>
        <Button variant="transparent" size="lg" radius="xl">
          Documentation
        </Button>
      </Group>
    </Flex>
  );
};

export default function Home(): JSX.Element {
  // const { siteConfig } = useDocusaurusContext();

  return (
    <Layout title="Home" description="Indiebase homepage">
      <main className={styles.main}>
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
