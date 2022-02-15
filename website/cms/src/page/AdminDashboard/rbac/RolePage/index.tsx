import { FC, MutableRefObject, useRef } from 'react';
import { Button, Popconfirm, message, FormInstance, Row, Col } from 'antd';
import ProTable, { ActionType, ProColumns } from '@ant-design/pro-table';
import {
  updateRoleReq,
  RoleFormData,
  createRoleReq,
  queryRolesReq,
  deleteRoleReq,
} from '@/api';
import { CreateRoleModal } from './CreateRoleModal';
import { PickPossessionsModal } from './PickPossessionsModal';

const valueEnum = {
  0: { text: '禁用中', status: 0 },
  1: { text: '运行中', status: 1 },
};

const columns: ProColumns<RoleFormData>[] = [
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
    valueType: 'radioButton',
    valueEnum,
    render: (_dom, row, _i) => {
      return (
        <span className={row.disable ? 'f-red' : 'f-green'}>
          {row.disable ? '禁用中' : '运行中'}
        </span>
      );
    },
  },
  {
    title: '创建时间',
    dataIndex: 'createTime',
    key: 'createTime',
    render: (_dom, row, _i) => {
      return <span>{new Date(row.createTime).toLocaleString()}</span>;
    },
  },
  {
    title: '更新时间',
    dataIndex: 'updateTime',
    key: 'updateTime',
    render: (_dom, row, _i) => {
      return <span>{new Date(row.updateTime).toLocaleString()}</span>;
    },
  },
  {
    title: '功能',
    dataIndex: 'type',
    key: 'address',
    // width: 200,
    render: (_dom, row, _i, action) => {
      const updateRole = async function (
        form: RoleFormData,
        fRef?: MutableRefObject<FormInstance>,
      ) {
        form.id = row.id;
        form.disable = Number(form.disable);
        const res = await updateRoleReq(form);

        if (res.code > 0) {
          message.success(res.message);
          action.reload();
          fRef?.current?.resetFields();
          return true;
        }
      };

      return (
        <div>
          <CreateRoleModal
            title="编辑"
            size="small"
            row={row}
            onFinish={updateRole}
            updateModal={true}
          />
          <Popconfirm
            title="确定删除?"
            onConfirm={async () => {
              const res = await deleteRoleReq({ id: row.id });
              if (res.code > 0) {
                message.success(res.message);
              }
              action.reload();
            }}
            okText="确认"
            cancelText="取消"
          >
            <Button
              style={{ margin: '0 10px' }}
              size="small"
              type="ghost"
              danger
            >
              删除
            </Button>
          </Popconfirm>

          <PickPossessionsModal
            title="编辑资源"
            size="small"
            row={row}
            onFinish={async () => {}}
          />
        </div>
      );
    },
  },
];

export const RolePage: FC = function () {
  const ref = useRef<ActionType>(null);

  const requestData = async function () {
    const res = await queryRolesReq();
    return {
      data: res.data?.list,
      success: true,
    };
  };

  const createRole = async function (
    form: RoleFormData,
    fRef?: MutableRefObject<FormInstance>,
  ) {
    console.log(form);
    const res = await createRoleReq(form);

    if (res.code > 0) {
      message.success(res.message);
      fRef?.current?.resetFields();
      ref.current.reloadAndRest();
      return true;
    }
  };

  return (
    <ProTable<RoleFormData>
      columns={columns}
      request={requestData}
      actionRef={ref}
      pagination={{
        showQuickJumper: true,
      }}
      rowKey="id"
      search={{
        defaultCollapsed: true,
      }}
      dateFormatter="string"
      toolbar={{
        title: '角色表格',
      }}
      toolBarRender={() => [
        <CreateRoleModal title="创建角色" onFinish={createRole} />,
      ]}
    />
    // <Row gutter={[16, 16]}>
    //   <Col span={14}>
    //     <ProTable<RoleFormData>
    //       columns={columns}
    //       request={requestData}
    //       actionRef={ref}
    //       pagination={{
    //         showQuickJumper: true,
    //       }}
    //       rowKey="id"
    //       search={{
    //         defaultCollapsed: true,
    //       }}
    //       dateFormatter="string"
    //       toolbar={{
    //         title: '角色表格',
    //       }}
    //       toolBarRender={() => [
    //         <CreateRoleModal title="创建角色" onFinish={createRole} />,
    //       ]}
    //     />
    //   </Col>
    //   <Col span={10}>
    //     <ProTable<RoleFormData>
    //       columns={columns}
    //       request={requestData}
    //       scroll={{ x: 1000 }}
    //       bordered
    //       actionRef={ref}
    //       pagination={{
    //         showQuickJumper: true,
    //       }}
    //       rowKey="id"
    //       search={{
    //         defaultCollapsed: true,
    //       }}
    //       dateFormatter="string"
    //       toolbar={{
    //         title: '角色表格',
    //       }}
    //       toolBarRender={() => [
    //         <CreateRoleModal title="创建角色" onFinish={createRole} />,
    //       ]}
    //     />
    //   </Col>
    // </Row>
  );
};
