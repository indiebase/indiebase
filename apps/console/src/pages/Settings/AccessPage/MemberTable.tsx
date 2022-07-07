import { ProTable, ActionType, ProColumns } from '@letscollab/app-utils';
import { Button } from '@mantine/core';
import { useRef, useMemo } from 'react';
import { RoleStatus } from 'src/common/enum';
import { MemberModal } from './MemberModal';

const columns: ProColumns<any>[] = [
  {
    title: '账户',
    dataIndex: 'name',
    copyable: true,
    key: 'name',
  },
  {
    title: '角色',
    dataIndex: 'role',
    key: 'role',
    filters: [
      { text: RoleStatus.active, value: RoleStatus.active },
      { text: RoleStatus.inactive, value: RoleStatus.inactive },
    ],
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
    title: '操作',
    valueType: 'option',
    key: 'option',
    render: (text, record, _, action) => [
      <Button
        size="xs"
        variant="light"
        color="blue"
        key="editable"
        onClick={() => {}}
      >
        编辑
      </Button>,
    ],
  },
];

export const MemberTable = function () {
  const ref = useRef<ActionType>(null);
  const requestData = async function () {
    return {
      data: [
        {
          name: 'deskbtm@outlook.com',
          role: 'Owner',
        },
      ],
      success: true,
    };
  };

  const rowSelection = useMemo(() => {
    return {
      onChange: (selectedRowKeys, selectedRows) => {
        console.log(
          `selectedRowKeys: ${selectedRowKeys}`,
          'selectedRows: ',
          selectedRows,
        );
      },
      onSelect: (record, selected, selectedRows) => {
        console.log(record, selected, selectedRows);
      },
      onSelectAll: (selected, selectedRows, changeRows) => {
        console.log(selected, selectedRows, changeRows);
      },
    };
  }, []);

  return (
    <ProTable
      bordered
      search={{
        filterType: 'light',
      }}
      showSorterTooltip={false}
      rowSelection={rowSelection}
      headerTitle="成员"
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
      toolBarRender={() => [<MemberModal />]}
      dateFormatter={(value, valueType) => {
        return value.format('YYYY-MM-DD HH:mm:ss');
      }}
    />
  );
};
