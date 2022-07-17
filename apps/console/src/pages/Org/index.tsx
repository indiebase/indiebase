import { PrjStatus, projectsQuery } from '@letscollab/app-utils';
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
  Accordion,
  Button,
} from '@mantine/core';
import { FC, Suspense, useMemo, useState } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { useQuery } from 'react-query';
import { WidthProvider, Responsive } from 'react-grid-layout';
import { Link } from 'react-router-dom';
import { IconUser } from '@tabler/icons';

const ResponsiveGridLayout = WidthProvider(Responsive);

export interface CoreProjectCardProps {
  type?: PrjStatus;
}

const CoreProjectCard: FC<CoreProjectCardProps> = function (props) {
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
            Norway Fjord Adventures
          </Anchor>
        </Group>
        <Badge size="xs" color={color} variant="light">
          {props.type}
        </Badge>
      </Group>
      <Card.Section>
        <div style={{ width: '100%', height: '100%' }}></div>
        <Image
          src="https://images.unsplash.com/photo-1527004013197-933c4bb611b3?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=720&q=80"
          height={50}
          alt="cover"
        />
      </Card.Section>

      <Text lineClamp={2} mt={10} style={{ color: '#777777', fontSize: 10 }}>
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
            Norway Fjord Adventures
          </Anchor>
        </Group>
        <Badge size="xs" color={color} variant="light">
          {props.type}
        </Badge>
      </Group>
      <Card.Section>
        <div style={{ width: '100%', height: '100%' }}></div>
        <Image
          src="https://images.unsplash.com/photo-1527004013197-933c4bb611b3?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=720&q=80"
          height={50}
          alt="cover"
        />
      </Card.Section>

      <Text lineClamp={2} mt={10} style={{ color: '#777777', fontSize: 10 }}>
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
  const { lg, sm, xs, md } = theme.breakpoints;
  const [hideMore, setHideMore] = useState(true);

  const displayData = hideMore ? data.d.slice(0, 6) : data.d;
  const corePrjsLen = data.d.length;

  const gridLayout = useMemo(
    () =>
      displayData.map((e, i) => {
        return {
          x: i % 3,
          y: 0,
          w: 1,
          h: 1.2,
          i: i.toString(),
        };
      }),
    [displayData],
  );

  return (
    <>
      <Box mt={30} mb={20} style={{ width: '75%' }}>
        <ResponsiveGridLayout
          containerPadding={[0, 0]}
          margin={[20, 15]}
          breakpoints={{ lg, md, sm, xs, xxs: 0 }}
          cols={{
            lg: 3,
            sm: 3,
            xs: 3,
            md: 3,
            xxs: 0,
          }}
          layouts={{
            lg: gridLayout,
            xs: gridLayout,
            md: gridLayout,
            sm: gridLayout,
            xxs: gridLayout,
          }}
          isResizable={false}
          isDraggable={false}
          isDroppable={false}
        >
          {displayData.map((e, i) => {
            return (
              <span key={i}>
                <CoreProjectCard />
              </span>
            );
          })}
        </ResponsiveGridLayout>
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
      </Box>
      <Input
        style={{ width: 300 }}
        variant="default"
        placeholder="Search project"
      />
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
