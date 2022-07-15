import { PrjStatus, projectsQuery } from '@letscollab/app-utils';
import {
  Card,
  Group,
  Badge,
  Button,
  Image,
  Text,
  useMantineTheme,
  Box,
  Select,
  Input,
  Avatar,
  AvatarsGroup,
  MantineColor,
} from '@mantine/core';
import { useAtom } from 'jotai';
import { FC, Suspense, useMemo } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { useQuery } from 'react-query';
import RGL, { WidthProvider } from 'react-grid-layout';

const ReactGridLayout = WidthProvider(RGL);

export interface CoreProjectItemProps {
  type?: PrjStatus;
}

const CoreProjectItem: FC<CoreProjectItemProps> = function (props) {
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
          <Avatar
            src="https://images.unsplash.com/photo-1527004013197-933c4bb611b3?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=720&q=80"
            radius="xl"
            size="sm"
          />
          <Text lineClamp={1} size="sm" weight={500}>
            Norway Fjord Adventures
          </Text>
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
          />
          <Avatar src="avatar.png" />
          <Avatar src="avatar.png" />
          <Avatar src="avatar.png" />
          <Avatar src="avatar.png" />
          <Avatar src="avatar.png" />
          <Avatar src="avatar.png" />
          <Avatar src="avatar.png" />
          <Avatar src="avatar.png" />
          <Avatar src="avatar.png" />
          <Avatar src="avatar.png" />
          <Avatar src="avatar.png" />
        </AvatarsGroup>
      </Group>
    </Card>
  );
};

const Organization = function (props) {
  const { isError, data } = useQuery(['own-projects'], projectsQuery);
  // const theme = useMantineTheme();

  const gridLayout = useMemo(
    () =>
      Array.from({ length: 20 }).map((e, i) => {
        const y = Math.ceil(Math.random() * 4) + 1;

        console.log(i, i % 3);

        return {
          x: i % 3,
          y: 0,
          w: 1,
          h: 1.2,
          i: i.toString(),
        };
      }),
    [],
  );

  return (
    <>
      <Input
        style={{ width: 300 }}
        variant="default"
        placeholder="Search project"
      />

      <Box style={{ width: '75%' }}>
        <ReactGridLayout
          // autoSize={true}
          margin={[20, 20]}
          cols={3}
          layout={gridLayout}
          isResizable={false}
          isDraggable={false}
          isDroppable={false}
        >
          {Array.from({ length: 20 }).map((e, i) => {
            return (
              <span key={i}>
                <CoreProjectItem />
              </span>
            );
          })}
        </ReactGridLayout>
      </Box>
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
