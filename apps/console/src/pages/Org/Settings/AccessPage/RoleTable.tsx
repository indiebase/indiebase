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
import { CreateRoleModal } from './RoleModal';

const columnHelper = createColumnHelper<RoleColumns>();

const columns = [
  columnHelper.accessor('name', {
    enableSorting: false,
    header: 'Name',
    ...{ filterType: 'text' },
  }),
  columnHelper.accessor('description', {
    header: 'Description',
    enableColumnFilter: false,
    enableSorting: false,
  }),

  columnHelper.accessor('domain', {
    header: 'Domain',
    enableColumnFilter: false,
    enableSorting: false,
  }),
  columnHelper.accessor('status', {
    enableColumnFilter: false,
    enableSorting: false,
    header: 'Status',
  }),
  columnHelper.accessor('createTime', {
    enableSorting: false,
    header: 'Create Time',
    enableGlobalFilter: false,
    ...{ filterType: 'dateRange' },
  }),
  columnHelper.accessor('actions', {
    enableSorting: false,
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
    ['get_roles', fetchDataOptions],
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
      onRequestFilter={(p: any) => {
        console.log(p);
        if (!!p?.createTime) {
          p.createStartAt = p.createTime[0];
          p.createEndAt = p.createTime[1];
        }

        delete p.createTime;
        setParams(p);
      }}
      toolbar={() => [<CreateRoleModal key="create-role-modal" />]}
    ></Table>
  );
};
