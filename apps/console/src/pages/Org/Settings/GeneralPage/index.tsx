import { Table } from '@letscollab-react/table';
import { Grid, useMantineTheme } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import { createColumnHelper } from '@tanstack/react-table';
import { Suspense, useState } from 'react';

type Person = {
  role: string;
  lastName: string;
  age: number;
  visits: number;
  status: string;
  progress: number;
};

const defaultData: any[] = [
  {
    role: 'tanner',
    lastName: 'linsley',
    age: 24,
    visits: 100,
    status: 'In Relationship',
    progress: 50,
  },
  {
    role: 'tandy',
    lastName: 'miller',
    age: 40,
    visits: 40,
    status: 'Single',
    progress: 80,
  },
  {
    role: 'joe',
    lastName: 'dirte',
    age: 45,
    visits: 20,
    status: 'Complicated',
    progress: 10,
  },
];

const columnHelper = createColumnHelper<Person>();

const columns = [
  columnHelper.accessor('role', {
    enableSorting: false,
    header: 'Role',
    enableColumnFilter: true,
  }),
  columnHelper.accessor((row) => row.lastName, {
    enableSorting: false,
    id: 'lastName',
  }),
  columnHelper.accessor('age', {
    header: () => 'Age',
  }),
  columnHelper.accessor('visits', {
    header: () => <span>Visits</span>,
  }),
  columnHelper.accessor('status', {
    enableSorting: false,
    header: 'Status',
  }),
  columnHelper.accessor('progress', {
    header: 'Profile Progress',
  }),
];

export const GeneralPage = function (props) {
  const [data, setData] = useState(() => [...defaultData]);

  const theme = useMantineTheme();
  const matches = useMediaQuery(`(max-width: ${theme.breakpoints.sm}px)`);

  return (
    <Suspense>
      <Grid gutter="xs">
        <Grid.Col span={matches ? 12 : 7}>
          <Table<Person> title="Role" columns={columns} data={data}></Table>
        </Grid.Col>
        {/* <Grid.Col span={5}>
          <MemberTable />
        </Grid.Col> */}
      </Grid>
    </Suspense>
  );
};
