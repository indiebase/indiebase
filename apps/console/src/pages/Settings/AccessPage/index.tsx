import { Grid } from '@mantine/core';
import { RoleTable } from './RoleTable';
import { MemberTable } from './MemberTable';

export const AccessPage = function (props) {
  return (
    <Grid gutter="xs">
      <Grid.Col span={5}>
        <MemberTable />
      </Grid.Col>
      <Grid.Col span={7}>
        <RoleTable />
      </Grid.Col>
    </Grid>
  );
};
