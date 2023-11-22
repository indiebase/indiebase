import { Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { Box, Grid } from '@mantine/core';

const MY = function () {
  return (
    <>
      <Grid mt={30} grow style={{ flexWrap: 'nowrap' }}>
        <Grid.Col span={9}>{/* <UserActivity /> */}</Grid.Col>
        <Grid.Col span={3}>
          {/* <CoreProjects
            list={data.d as any}
            col={{ sm: 12 }}
            hiddenCover
            hiddenMember
          /> */}
        </Grid.Col>
      </Grid>
    </>
  );
};

export const Component = function () {
  return (
    <ErrorBoundary fallbackRender={() => <div>Error</div>}>
      <Suspense>
        <Box m={20} mt={10}>
          <MY />
        </Box>
      </Suspense>
    </ErrorBoundary>
  );
};
