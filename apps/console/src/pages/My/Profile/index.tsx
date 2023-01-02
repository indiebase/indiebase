import { FC, Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { projectsQuery } from '@letscollab-community/console-utils';
import { Box, Grid, MediaQuery } from '@mantine/core';
import { useQuery } from '@tanstack/react-query';

const UserActivity: FC<any> = function () {
  return <Box></Box>;
};

const My = function () {
  const { data } = useQuery(['own-projects'], projectsQuery, {
    suspense: true,
  });

  return (
    <>
      <Grid mt={30} grow style={{ flexWrap: 'nowrap' }}>
        <MediaQuery smallerThan="sm" styles={{ display: 'none' }}>
          <Grid.Col span={9}>
            <UserActivity />
          </Grid.Col>
        </MediaQuery>
      </Grid>
    </>
  );
};

export const MyPage = function () {
  return (
    <ErrorBoundary fallbackRender={() => <div>Error</div>}>
      <Suspense>
        <Box m={20} mt={40}>
          <My />
        </Box>
      </Suspense>
    </ErrorBoundary>
  );
};
