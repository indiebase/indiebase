import { FC, Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { getOrgApi, projectsQuery } from '@letscollab-community/console-utils';
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
  Container,
  Button,
  useMantineTheme,
} from '@mantine/core';
import { ProjectFlow } from '../../components';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { IconLink, IconMail, IconTopologyRing2 } from '@tabler/icons';
import { useQuery } from '@tanstack/react-query';

const OrgProfile: FC<any> = function () {
  const { org } = useParams();
  const {
    data: { d },
  } = useQuery(['get_org', org], getOrgApi, { suspense: true });

  return (
    <Box ml={30}>
      <Group noWrap>
        <Avatar
          size="xl"
          src={d.avatarUrl}
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
        {d.homepage && (
          <Group noWrap spacing={8}>
            <IconLink size={15} />
            <Text
              style={{ maxWidth: 300 }}
              size="xs"
              component="a"
              href={d.homepage}
              target="_blank"
              lineClamp={1}
            >
              {d.homepage}
            </Text>
          </Group>
        )}
        {d.contactEmail && (
          <Group spacing={8}>
            <IconMail size={14} />
            <Text
              size="xs"
              component="a"
              href={`mailto:${d.contactEmail}`}
              target="_blank"
              lineClamp={1}
            >
              {d.contactEmail}
            </Text>
          </Group>
        )}
      </Stack>
    </Box>
  );
};

const OrgProjects = function () {
  const { data } = useQuery(['own-projects'], projectsQuery, {
    suspense: true,
  });

  return <ProjectFlow pins={data.d} list={data.d} />;
};

const Organization = function () {
  const theme = useMantineTheme();

  const navigate = useNavigate();

  return (
    <>
      <Grid mt={10} grow style={{ flexWrap: 'nowrap' }}>
        <Grid.Col span={9}>
          <Container m={0} p={0}>
            <Button
              variant="gradient"
              size="xs"
              type="submit"
              gradient={theme.other.buttonGradient}
              leftIcon={<IconTopologyRing2 size={18} />}
              onClick={() => {
                navigate('create/project', {
                  state: { menuImmutable: true },
                });
              }}
            >
              New
            </Button>
          </Container>
          <Box mt={20}>
            <ErrorBoundary fallbackRender={() => <div>Error</div>}>
              <OrgProjects />
            </ErrorBoundary>
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
        <Box m={20}>
          <Organization />
        </Box>
      </Suspense>
    </ErrorBoundary>
  );
};
