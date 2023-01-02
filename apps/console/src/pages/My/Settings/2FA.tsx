import { FC, Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { projectsQuery } from '@letscollab-community/console-utils';
import { Box, Grid, MediaQuery } from '@mantine/core';
import { useQuery } from '@tanstack/react-query';

const TwoFactorAuth = function () {
  // const { data } = useQuery(['2fa'], projectsQuery, {
  //   suspense: true,
  // });

  return (
    <>
      <Grid mt={30} grow style={{ flexWrap: 'nowrap' }}>
        a
      </Grid>
    </>
  );
};

export const TwoFactorAuthPage = function () {
  return (
    <ErrorBoundary fallbackRender={() => <div>Error</div>}>
      <Suspense>
        <Box m={20} mt={40}>
          <TwoFactorAuth />
        </Box>
      </Suspense>
    </ErrorBoundary>
  );
};
