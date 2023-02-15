import { Grid } from '@mantine/core';
import { RoleTable } from './RoleTable';
import { Suspense } from 'react';

export const AccessPage = function (props) {
  return (
    <Suspense>
      <Grid gutter="xs">
        <Grid.Col span={9}>
          <RoleTable />
        </Grid.Col>
        {/* <Grid.Col span={5}>
          <MemberTable />
        </Grid.Col> */}
      </Grid>
    </Suspense>
  );
};
