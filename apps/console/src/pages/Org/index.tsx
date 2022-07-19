import { useQuery } from 'react-query';
import { FC, Suspense, useState } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { IProject, projectsQuery } from '@letscollab/app-utils';
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
} from '@mantine/core';
import { ProjectTile } from '../../components';
import { Link } from 'react-router-dom';
import { CoreProjects } from './CoreProjects';

export interface CoreProjectCardProps extends Partial<IProject> {}

const OrgProfile: FC<any> = function () {
  return (
    <Box ml={30}>
      <Group>
        <Avatar
          size="xl"
          radius={1000}
          src={'https://images.opencollective.com/kingwl/1240df1/avatar.png'}
          component={Link}
          to="setting"
          reloadDocument={false}
        ></Avatar>
        <Stack>
          <Title order={3}>Organization1</Title>
        </Stack>
      </Group>
    </Box>
  );
};

const Organization = function () {
  const { data } = useQuery(['own-projects'], projectsQuery, {
    suspense: true,
  });
  const [hideMore, setHideMore] = useState(true);

  // const displayData = hideMore ? data.d.slice(0, 6) : data.d;
  // const corePrjsLen = data.d.length;

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
            <Box>
              <OrgProfile />
            </Box>
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
