import { useRef } from 'react';
import { RoleModal } from './RoleModal';
import { Container } from '@mantine/core';
import { ProColumns, ActionType, ProTable } from '@letscollab/ant-table';
import { RoleStatus } from '@letscollab-nest/trait';
import { fetchRolesApi } from '@letscollab-community/console-utils';
import { useTranslation } from 'react-i18next';

const columns: () => ProColumns<any>[] = () => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { t } = useTranslation(['common', 'setting']);
  return [
    {
      title: 'Role',
      dataIndex: 'name',
      key: 'name',
      copyable: true,
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
      dataIndex: 'status',
      key: 'status',
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
      valueType: 'dateTime',
      sorter: {
        compare: (a, b) => a.createTime - b.createTime,
      },
    },
    {
      title: '更新时间',
      hideInSearch: true,
      dataIndex: 'updateTime',
      key: 'updateTime',
      valueType: 'dateTime',
      sorter: {
        compare: (a, b) => a.createTime - b.createTime,
      },
    },
  ];
};

export const RoleTable = function () {
  const ref = useRef<ActionType>(null);
  const requestData = async function () {
    const { d, total } = await fetchRolesApi({
      domain: 'com.deskbtm.letscollab',
    });
    // console.log(data);
    return {
      data: d,
      success: true,
      total,
    };
  };

  return (
    <ProTable
      cardBordered={true}
      bordered
      search={{
        filterType: 'light',
      }}
      locale={{ emptyText: <Container my={20}>Empty</Container> }}
      showSorterTooltip={false}
      headerTitle="角色"
      columns={columns()}
      request={requestData as any}
      rowKey="name"
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
      dateFormatter={(value) => {
        return value.format('YYYY-MM-DD HH:mm:ss');
      }}
    />
  );
};
