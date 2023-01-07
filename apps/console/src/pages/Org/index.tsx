import { FC, Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { projectsQuery } from '@letscollab-community/console-utils';
import {
  Group,
  Text,
  Box,
  Grid,
  MediaQuery,
  Avatar,
  Stack,
  Title,
  Divider,
} from '@mantine/core';
import { ProjectFlow } from '../../components';
import { Link } from 'react-router-dom';
import { IconLink, IconMail } from '@tabler/icons';
import { useQuery } from '@tanstack/react-query';

const OrgProfile: FC<any> = function () {
  return (
    <Box ml={30}>
      <Group noWrap>
        <Avatar
          size="xl"
          radius={1000}
          src={'https://images.opencollective.com/kingwl/1240df1/avatar.png'}
          component={Link}
          to="setting"
          reloadDocument={false}
        ></Avatar>
        <Stack justify="flex-start">
          <Title order={4}>Organization1</Title>
        </Stack>
      </Group>
      <Divider my="lg" variant="dashed" labelPosition="center" />
      <Stack spacing={6}>
        <Group noWrap spacing={8}>
          <IconLink size={15} />
          <Text
            style={{ maxWidth: 300 }}
            size="xs"
            component="a"
            href="https://www.baidu.com"
            target="_blank"
            lineClamp={1}
          >
            www.dsadasmdoeo.com
          </Text>
        </Group>
        <Group spacing={8}>
          <IconMail size={14} />
          <Text
            size="xs"
            component="a"
            href=" www.baidu.com"
            target="_blank"
            lineClamp={1}
          >
            www.baidu.com
          </Text>
        </Group>
      </Stack>
    </Box>
  );
};

const Organization = function () {
  const { data } = useQuery(['own-projects'], projectsQuery, {
    suspense: true,
  });

  console.log(data, '----------------');

  return (
    <>
      <Grid mt={30} grow style={{ flexWrap: 'nowrap' }}>
        <Grid.Col span={9}>
          <ProjectFlow pins={data.d} list={data.d} />
        </Grid.Col>
        <MediaQuery smallerThan="sm" styles={{ display: 'none' }}>
          <Grid.Col span={3}>
            <OrgProfile />
          </Grid.Col>
        </MediaQuery>
      </Grid>
    </>
  );
};

export const OrganizationPage = function () {
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
