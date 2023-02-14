import {
  ConfirmButton,
  fetchRolesApi,
} from '@letscollab-community/console-utils';
import { RoleColumns } from '@letscollab-nest/trait';
import { Table } from '@letscollab-react/table';
import { Group } from '@mantine/core';
import { useQuery } from '@tanstack/react-query';
import {
  createColumnHelper,
  type PaginationState,
} from '@tanstack/react-table';
import { useMemo, useState } from 'react';

const columnHelper = createColumnHelper<RoleColumns>();

const columns = [
  columnHelper.accessor('name', {
    enableSorting: false,
    header: 'Name',
  }),
  columnHelper.accessor('description', {
    header: 'Description',
    enableColumnFilter: false,
    enableSorting: false,
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
  const [params, setParams] = useState({});
  const [{ pageIndex, pageSize }, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 20,
  });

  const fetchDataOptions = {
    pageIndex,
    pageSize,
    ...params,
  };

  const {
    data: { d, total },
  } = useQuery(
    ['get_org', fetchDataOptions],
    () =>
      fetchRolesApi({ domain: 'com.deskbtm.letscollab', ...fetchDataOptions }),
    { suspense: true, keepPreviousData: true },
  );

  const pagination = useMemo(
    () => ({
      pageIndex,
      pageSize,
    }),
    [pageIndex, pageSize],
  );

  return (
    <Table<RoleColumns>
      title="Role"
      columns={columns}
      data={d}
      onChangePagination={setPagination}
      pagination={pagination}
      total={Math.ceil(total / pageSize)}
      onRequestFilter={setParams}
    ></Table>
  );
};
