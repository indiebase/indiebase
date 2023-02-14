import {
  ConfirmButton,
  fetchRolesApi,
} from '@letscollab-community/console-utils';
import { RoleColumns } from '@letscollab-nest/trait';
import { Table } from '@letscollab-react/table';
import { Group } from '@mantine/core';
import { useQuery } from '@tanstack/react-query';
import { createColumnHelper } from '@tanstack/react-table';
import { useState } from 'react';

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

const columnHelper = createColumnHelper<RoleColumns>();

const columns = [
  columnHelper.accessor('name', {
    enableSorting: false,
    filterFn: 'fuzzy' as any,
    header: 'Name',
  }),
  columnHelper.accessor('description', {
    header: 'Description',
    enableColumnFilter: false,
  }),
  columnHelper.accessor('domain', {
    header: 'Domain',
    enableColumnFilter: false,
  }),
  columnHelper.accessor('status', {
    enableColumnFilter: false,
    enableSorting: false,
    header: 'Status',
  }),
  columnHelper.accessor('createTime', {
    enableColumnFilter: false,
    header: 'Create Time',
  }),
  columnHelper.accessor('actions', {
    enableColumnFilter: false,
    header: 'Actions',
    minSize: 200,
    cell() {
      return (
        <Group noWrap>
          <ConfirmButton
            color="red"
            variant="light"
            content="Are you sure want to delete?"
            onConfirm={() => {}}
          >
            delete
          </ConfirmButton>
        </Group>
      );
    },
  }),
];

export const RoleTable = function (props) {
  const [data, setData] = useState(() => [...defaultData]);
  const {
    data: { d },
  } = useQuery(
    ['get_org'],
    () => fetchRolesApi({ domain: 'com.deskbtm.letscollab' }),
    { suspense: true },
  );

  return (
    <Table<RoleColumns>
      title="Role"
      columns={columns}
      data={d}
      onFuzzyFilter={(row, columnId, value, addMeta) => {
        console.log(row, columnId, value, addMeta, '==========');
        return false;
      }}
    ></Table>
  );
};
