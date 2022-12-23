import { FC, Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { projectsQuery } from '@letscollab/app-utils';
import { IProject } from '@letscollab-nest/trait';
import {
  Group,
  Text,
  Box,
  Input,
  Grid,
  MediaQuery,
  Avatar,
  Stack,
  Title,
  Divider,
} from '@mantine/core';
import { ProjectTile } from '../../components';
import { Link } from 'react-router-dom';
import { CoreProjects } from './CoreProjects';
import { IconLink, IconMail } from '@tabler/icons';
import { useQuery } from '@tanstack/react-query';

export interface CoreProjectCardProps extends Partial<IProject> {}

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
            href=" www.baidu.com"
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

  return (
    <>
      <Grid mt={30} grow style={{ flexWrap: 'nowrap' }}>
        <Grid.Col span={9}>
          <Box>
            <Text
              component="span"
              variant="gradient"
              gradient={{ from: 'red', to: 'cyan', deg: 45 }}
              size="lg"
              weight={400}
            >
              Main
            </Text>
            <CoreProjects list={data.d} />
            <Text
              component="span"
              variant="gradient"
              gradient={{ from: 'red', to: 'cyan', deg: 45 }}
              size="lg"
              weight={400}
            >
              Utils
            </Text>
            <Input
              mt={20}
              style={{ width: 300 }}
              variant="default"
              placeholder="Search project"
            />
            <Box my={20}>
              {data.d.map((e, i) => {
                return (
                  <ProjectTile
                    key={i}
                    name={e.name}
                    members={e.members}
                    updateTime={e.updateTime}
                    status={e.status}
                    description={e.description}
                  />
                );
              })}
            </Box>
          </Box>
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
