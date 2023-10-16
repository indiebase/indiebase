import React, { FC, useRef } from 'react';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';

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
import { useIntersection, useMediaQuery } from '@mantine/hooks';

import * as styles from '@site/src/css/home.css.ts';

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

const Screen3 = function () {
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
      <Group mt={rem(20)} maw={isMobile ? '50%' : 'null'}>
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
  const { siteConfig } = useDocusaurusContext();

  return (
    <Layout title="Home" description="Indiebase homepage">
      <main className={styles.main}>
        <Background />
        <Screen1 />
        <Screen2 />
        <Title order={1}>Collective</Title>
        {/* <ScrollPage>
            <Box>Start self hosted</Box>

            <Box style={{ width: '100%' }}>
              <Box
                style={{
                  width: 200,
                  height: 400,
                  border: '1px solid #000',
                  borderRadius: '20px',
                  backdropFilter: 'blur(6.25rem)',
                  background:
                    'linear-gradient(136deg,rgba(255,255,255,.04) 0%,rgba(255,255,255,.04) 30.91%,rgba(255,255,255,0) 100%,rgba(255,255,255,.01) 100%)',
                }}
              ></Box>
            </Box>
          </ScrollPage> */}
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
        筹集资金 + 合规审查 + 资金管理 undraising + legal status + money
        management
        <Text>
          Make revenue generation easier for indie hackers and teams with
          software projects. Private Open Collective + Firebase Successor
        </Text>
      </main>
    </Layout>
  );
}
