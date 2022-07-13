import { Grid } from '@mantine/core';
import { RoleTable } from './RoleTable';
import { MemberTable } from './MemberTable';
import { Suspense } from 'react';
import { req, userProfileQuery } from '@letscollab/app-utils';
import { useAtom } from 'jotai';
import { useQuery } from 'react-query';
import { ErrorBoundary } from 'react-error-boundary';

export const AccessPage = function (props) {
  return (
    <Suspense>
      <Grid gutter="xs">
        <Grid.Col span={5}>
          <MemberTable />
        </Grid.Col>
        <Grid.Col span={7}>
          <RoleTable />
        </Grid.Col>
      </Grid>
    </Suspense>
  );
};
