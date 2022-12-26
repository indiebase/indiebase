import { useRef } from 'react';
import { RoleModal } from './RoleModal';
import { Container } from '@mantine/core';
import { ProColumns, ActionType, ProTable } from '@ant-design/pro-table';
import { RoleStatus } from '@letscollab-nest/trait';

const columns: ProColumns<any>[] = [
  {
    title: '角色名',
    dataIndex: 'name',
    copyable: true,
    key: 'name',
  },
  {
    title: '描述',
    dataIndex: 'description',
    key: 'description',
    hideInSearch: true,
    width: '20%',
  },
  {
    title: '状态',
    dataIndex: 'disable',
    key: 'disable',
    filters: [
      { text: RoleStatus.active, value: RoleStatus.active },
      { text: RoleStatus.inactive, value: RoleStatus.inactive },
    ],
    hideInSearch: true,
  },
  {
    title: '权限',
    dataIndex: 'disable',
    key: 'disable',
    hideInSearch: true,
  },
  {
    title: '创建时间',
    dataIndex: 'createTime',
    key: 'createTime',
    valueType: 'date',
    sorter: {
      compare: (a, b) => a.createTime - b.createTime,
    },
  },
  {
    filters: false,
    title: '更新时间',
    dataIndex: 'updateTime',
    valueType: 'date',
    key: 'updateTime',
    sorter: {
      compare: (a, b) => a.createTime - b.createTime,
    },
  },
];

export const RoleTable = function () {
  const ref = useRef<ActionType>(null);
  const requestData = async function () {
    return {
      data: [],
      success: true,
    };
  };

  return (
    <ProTable
      bordered
      search={{
        filterType: 'light',
      }}
      locale={{ emptyText: <Container my={20}>Empty</Container> }}
      showSorterTooltip={false}
      headerTitle="角色"
      columns={columns}
      request={requestData}
      actionRef={ref}
      options={{
        density: false,
        fullScreen: true,
        setting: false,
      }}
      pagination={{
        showQuickJumper: true,
      }}
      toolBarRender={() => [<RoleModal />]}
      dateFormatter={(value, valueType) => {
        return value.format('YYYY-MM-DD HH:mm:ss');
      }}
    />
  );
};
