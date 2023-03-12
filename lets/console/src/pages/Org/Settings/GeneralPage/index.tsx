import { Grid, useMantineTheme } from '@mantine/core';
import { RoleTable } from './RoleTable';
import { Suspense } from 'react';
import { useMediaQuery } from '@mantine/hooks';

export const GeneralPage = function (props) {
  const theme = useMantineTheme();
  const matches = useMediaQuery(`(max-width: ${theme.breakpoints.sm}px)`);

  return (
    <Suspense>
      <Grid gutter="xs">
        <Grid.Col span={matches ? 12 : 7}>
          <RoleTable />
        </Grid.Col>
        {/* <Grid.Col span={5}>
          <MemberTable />
        </Grid.Col> */}
      </Grid>
    </Suspense>
  );
};
