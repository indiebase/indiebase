import {
  ActionType,
  ProColumns,
  ProTable,
} from '../../../components/MagicAntd/Table';
import '@ant-design/pro-table/dist/table.css';
import { Grid } from '@mantine/core';
import { useRef } from 'react';
import { RoleModal } from './RoleModal';

const columns: ProColumns<any>[] = [
  {
    title: '角色名',
    dataIndex: 'name',
    copyable: true,
    key: 'name',
  },
  {
    title: '状态',
    dataIndex: 'disable',
    key: 'disable',
    filters: [
      { text: 'Male', value: 'male' },
      { text: 'Female', value: 'female' },
    ],
    valueType: 'radioButton',
    hideInSearch: true,
  },
  {
    title: '创建时间',
    dataIndex: 'createTime',
    key: 'createTime',
    valueType: 'date',
    render: (_dom, row, _i) => {
      return <span>{new Date(row.createTime).toLocaleString()}</span>;
    },
  },
  {
    filters: false,
    title: '更新时间',
    dataIndex: 'updateTime',
    valueType: 'date',
    key: 'updateTime',
    render: (_dom, row, _i) => {
      return <span>{new Date(row.updateTime).toLocaleString()}</span>;
    },
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
      <Grid.Col span={6}>
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
          dateFormatter="string"
          toolBarRender={() => [<RoleModal />]}
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
