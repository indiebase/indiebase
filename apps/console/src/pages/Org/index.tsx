import { IProject, PrjStatus, projectsQuery } from '@letscollab/app-utils';
import {
  Card,
  Group,
  Badge,
  Image,
  Text,
  Box,
  Input,
  Avatar,
  AvatarsGroup,
  MantineColor,
  Anchor,
  useMantineTheme,
  Grid,
  Title,
  Container,
  Center,
  Button,
} from '@mantine/core';
import { FC, Suspense, useState } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { useQuery } from 'react-query';
import { Link } from 'react-router-dom';
import { IconUser, IconWallet, IconArrowNarrowUp } from '@tabler/icons';
import CurrencyFormat from 'react-currency-format';

export interface CoreProjectCardProps extends Partial<IProject> {}

const OrgProfile: FC<any> = function (props) {
  return <Box style={{ background: 'red' }}>dsadsadsa</Box>;
};

const CoreProjectCard: FC<CoreProjectCardProps> = function (props) {
  let color: MantineColor;

  switch (props.status) {
    case PrjStatus.archive:
      color = 'grey';
      break;
    case PrjStatus.closed:
      color = 'pink';
      break;
    case PrjStatus.open:
      color = 'blue';
      break;
    case PrjStatus.wip:
      color = 'orange';
      break;
    default:
      color = 'blue';
  }

  return (
    <Card p="xs" style={{ border: '1px solid #E2E2E2' }}>
      <Group position="apart" mb={7}>
        <Group spacing={5}>
          <Anchor
            to="/pro"
            component={Link}
            reloadDocument={false}
            size="sm"
            style={{ color: '#228be6', fontWeight: 700 }}
          >
            {props.name}
          </Anchor>
        </Group>
        <Badge size="xs" color={color} variant="light">
          {props.status}
        </Badge>
      </Group>
      <Card.Section>
        <div style={{ width: '100%', height: '100%' }}></div>
        <Image
          src={props.cover ? props.cover : '/images/project-cover.svg'}
          height={50}
          alt="cover"
        />
      </Card.Section>

      <Box style={{ height: 30 }}>
        <Text lineClamp={2} mt={10} style={{ color: '#777777', fontSize: 10 }}>
          {props.description}
        </Text>
      </Box>

      <Group mt={9} position="apart">
        <AvatarsGroup
          styles={(t) => ({
            truncated: {
              color: t.colors.green,
            },
          })}
          ml={-5}
          size="sm"
          limit={8}
        >
          {props.members.map((u, i) => {
            return (
              <Avatar key={i} src={u.avatar} component="a" href={u.profileUrl}>
                <IconUser size={14} />
              </Avatar>
            );
          })}
        </AvatarsGroup>
        <Center>
          <Button
            color="dark"
            radius="xs"
            size="xs"
            style={{ padding: 0 }}
            compact
            variant="white"
          >
            <IconWallet size={14} />
            <CurrencyFormat
              value={0}
              displayType={'text'}
              thousandSeparator={true}
              prefix={'$'}
              renderText={(value) => (
                <Text ml={3} style={{ lineHeight: 1 }} lineClamp={1} size="xs">
                  {value}
                </Text>
              )}
            />
          </Button>
          <Button
            ml={3}
            color="dark"
            radius="xs"
            size="xs"
            style={{ padding: 0 }}
            compact
            variant="white"
          >
            <IconArrowNarrowUp size={12} color="green" />
            <Text
              color="green"
              style={{ lineHeight: 1, fontSize: 10 }}
              lineClamp={1}
            >
              0
            </Text>
          </Button>
        </Center>
      </Group>
      <Group mt={9} position="apart">
        <Center>
          <Text style={{ fontSize: 10 }} color="gray">
            Update
          </Text>
        </Center>
      </Group>
    </Card>
  );
};
export interface ProjectTileProps {
  type?: PrjStatus;
}

const ProjectTile: FC<ProjectTileProps> = function (props) {
  let color: MantineColor;

  switch (props.type) {
    case PrjStatus.archive:
      color = 'grey';
      break;
    case PrjStatus.closed:
      color = 'pink';
      break;
    case PrjStatus.open:
      color = 'blue';
      break;
    case PrjStatus.wip:
      color = 'orange';
      break;
    default:
      color = 'blue';
  }

  return (
    <Card p="xs" style={{ borderBottom: '1px solid #E2E2E2' }}>
      <Group position="apart">
        <Group spacing={5}>
          <Anchor
            to="/pro"
            component={Link}
            reloadDocument={false}
            size="sm"
            style={{ color: '#228be6', fontWeight: 700 }}
          >
            Norway Fjord Adventures
          </Anchor>
        </Group>
        <Badge size="xs" color={color} variant="light">
          {props.type}
        </Badge>
      </Group>
      <Text lineClamp={2} mt={8} style={{ color: '#777777', fontSize: 10 }}>
        With Fjord Tours you can explore more of the magical fjord landscapes
        with tours and activities on and around the fjords of Norway
      </Text>

      <Group position="apart">
        <AvatarsGroup
          styles={(t) => ({
            truncated: {
              color: t.colors.green,
            },
          })}
          mt={9}
          ml={-5}
          size="sm"
          limit={8}
        >
          <Avatar
            src="avatar.png"
            component="a"
            href="https://github.com/rtivital"
          >
            <IconUser size={14} />
          </Avatar>
        </AvatarsGroup>
      </Group>
    </Card>
  );
};

const Organization = function (props) {
  const { data } = useQuery(['own-projects'], projectsQuery, {
    suspense: true,
  });
  const theme = useMantineTheme();
  const [hideMore, setHideMore] = useState(true);

  const displayData = hideMore ? data.d.slice(0, 6) : data.d;
  const corePrjsLen = data.d.length;

  return (
    <>
      <Grid mt={30} grow>
        <Grid.Col span={9}>
          <Box>
            <Text
              component="span"
              variant="gradient"
              gradient={{ from: 'red', to: 'cyan', deg: 45 }}
              size="lg"
              weight={400}
              style={{ fontFamily: 'Greycliff CF, sans-serif' }}
            >
              Main
            </Text>
            <Grid mt={2}>
              {displayData.map((e, i) => {
                return (
                  <Grid.Col lg={4} md={6}>
                    <span key={i}>
                      <CoreProjectCard
                        cover={e.cover}
                        name={e.name}
                        members={e.members}
                        updateTime={e.updateTime}
                        status={e.status}
                        description={e.description}
                      />
                    </span>
                  </Grid.Col>
                );
              })}
            </Grid>
            {corePrjsLen > 6 ? (
              <Group mt={15} position="right">
                <Text
                  size="sm"
                  color="blue"
                  style={{
                    cursor: 'pointer',
                  }}
                  onClick={() => {
                    setHideMore(!hideMore);
                  }}
                >
                  {hideMore ? 'show more' : 'hide'}&nbsp;({corePrjsLen - 6})
                </Text>
              </Group>
            ) : null}
            <Input
              mt={20}
              style={{ width: 300 }}
              variant="default"
              placeholder="Search project"
            />
            <Box my={20}>
              <ProjectTile />
            </Box>
          </Box>
        </Grid.Col>
        <Grid.Col span={3}>
          <Box>
            <OrgProfile />
          </Box>
        </Grid.Col>
      </Grid>
    </>
  );
};

export const OrganizationPage = function (props) {
  return (
    <ErrorBoundary fallbackRender={() => <div>Error</div>}>
      <Suspense>
        <Box m={20} mt={40}>
          <Organization />
        </Box>
      </Suspense>
    </ErrorBoundary>
  );
};
