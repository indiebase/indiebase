import { FC, MutableRefObject, useRef } from 'react';
import { Button, Popconfirm, message, FormInstance, Row, Col } from 'antd';
import ProTable, { ActionType, ProColumns } from '@ant-design/pro-table';
import {
  updateUserReq,
  UserFormData,
  deleteUserReq,
  createUserReq,
  queryUserReq,
} from '@/api';
import { UserEditModal } from './UserEditModal';

const valueEnum = {
  0: { text: '禁用中', status: 0 },
  1: { text: '运行中', status: 1 },
};

const columns: ProColumns<UserFormData>[] = [
  {
    title: '账户',
    dataIndex: 'account',
    copyable: true,
    key: 'account',
  },
  {
    title: '用户名',
    dataIndex: 'username',
    copyable: true,
    key: 'username',
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
      const updateUser = async function (
        form: UserFormData,
        fRef?: MutableRefObject<FormInstance>,
      ) {
        form.id = row.id;
        form.disable = Number(form.disable);
        const res = await updateUserReq(form);

        if (res.code > 0) {
          message.success(res.message);
          action.reload();
          fRef?.current?.resetFields();
          return true;
        }
      };

      return (
        <div>
          <UserEditModal
            title="编辑"
            size="small"
            row={row}
            onFinish={updateUser}
            updateModal={true}
          />
          <Popconfirm
            title="确定删除?"
            onConfirm={async () => {
              const res = await deleteUserReq({ id: row.id });
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
        </div>
      );
    },
  },
];

export const UserPage: FC = function () {
  const ref = useRef<ActionType>(null);

  const requestData = async function () {
    const res = await queryUserReq();
    return {
      data: res.data?.list,
      success: true,
    };
  };

  const createUser = async function (
    form: UserFormData,
    fRef?: MutableRefObject<FormInstance>,
  ) {
    console.log(form);
    const res = await createUserReq(form);

    if (res.code > 0) {
      message.success(res.message);
      fRef?.current?.resetFields();
      ref.current.reloadAndRest();
      return true;
    }
  };

  return (
    <ProTable<UserFormData>
      columns={columns}
      request={requestData}
      actionRef={ref}
      pagination={{
        showQuickJumper: true,
      }}
      scroll={{
        x: 1000,
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
        <UserEditModal title="创建角色" onFinish={createUser} />,
      ]}
    />
  );
};
