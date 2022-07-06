import { ActionType, ProColumns, ProTable } from 'src/components/MagicAntd';
import { Grid } from '@mantine/core';
import { useRef } from 'react';
import { RoleModal } from './RoleModal';
import { RoleStatus } from 'src/common/enum';

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
    width: '25%',
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
  },
];

export const AccessPage = function (props) {
  const ref = useRef<ActionType>(null);

  const requestData = async function () {
    return {
      data: [],
      success: true,
    };
  };

  return (
    <Grid>
      <Grid.Col span={8}>
        <ProTable
          bordered
          search={{
            filterType: 'light',
          }}
          toolbar={{}}
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
          rowKey="id"
          toolBarRender={() => [<RoleModal />]}
          dateFormatter={(value, valueType) => {
            return value.format('YYYY-MM-DD HH:mm:ss');
          }}
        />
      </Grid.Col>
      {/* <Grid.Col span={6}>
        <ProTable
          columns={columns}
          request={requestData}
          actionRef={ref}
          pagination={{
            showQuickJumper: true,
          }}
          rowKey="id"
          options={{
            density: false,
            fullScreen: true,
          }}
          search={{
            filterType: 'light',
            defaultCollapsed: true,
          }}
          dateFormatter="string"
          toolbar={{
            title: '角色表格',
          }}
          toolBarRender={() => []}
        />
      </Grid.Col> */}
    </Grid>
  );
};
