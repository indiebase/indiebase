import { FC, MutableRefObject, useRef, useState } from 'react';
import { Button, Popconfirm, message, FormInstance } from 'antd';
import ProTable, { ActionType, ProColumns } from '@ant-design/pro-table';
import {
  createPossessionReq,
  deletePossessionReq,
  fetchPossessionTree,
  PossessionFormData,
  PossessionType,
  updatePossessionReq,
} from '@/api';
import { CreatePossessionModal } from './CreatePossessionModal';
import { LimitTd } from '@/components';

const columns: ProColumns<PossessionFormData>[] = [
  {
    title: '名称',
    dataIndex: 'name',
    copyable: true,
    key: 'name',
  },
  {
    title: '路径',
    dataIndex: 'path',
    copyable: true,
    key: 'path',
  },
  {
    title: '状态',
    dataIndex: 'disable',
    copyable: true,
    key: 'disable',
    render: (_dom, row, _i) => {
      return (
        <span className={row.disable ? 'f-red' : 'f-green'}>
          {row.disable ? '禁用中' : '运行中'}
        </span>
      );
    },
  },
  {
    title: '类型',
    dataIndex: 'type',
    key: 'type',
    render: (_dom, row, _i) => {
      return (
        <span className={row.type === 2 ? 'f-orange' : 'f-green'}>
          {PossessionType[row.type]}
        </span>
      );
    },
  },
  {
    title: '备注',
    dataIndex: 'comment',
    key: 'comment',
    render: (_dom, row) => {
      return <LimitTd maxWidth={100} content={row.comment} />;
    },
  },
  {
    title: '功能',
    dataIndex: 'type',
    key: 'address',
    // width: 200,
    render: (_dom, row, _i, action) => {
      const updatePossession = async function (
        form: PossessionFormData,
        fRef?: MutableRefObject<FormInstance>,
      ) {
        form.type = parseInt(form.type as any);
        form.id = row.id;
        const res = await updatePossessionReq(form);

        if (res.code > 0) {
          message.success(res.message);
          action.reloadAndRest();
          fRef?.current?.resetFields();
          return true;
        }
      };

      return (
        <div>
          <CreatePossessionModal
            title="编辑"
            size="small"
            row={row}
            onFinish={updatePossession}
            updateModal={true}
          />
          <Button style={{ marginLeft: 10 }} size="small" type="primary">
            添加
          </Button>
          <Popconfirm
            title="确定删除?"
            onConfirm={async () => {
              const res = await deletePossessionReq({ id: row.id });
              if (res.code > 0) {
                message.success(res.message);
              }
              // action.reload();
            }}
            okText="确认"
            cancelText="取消"
          >
            <Button style={{ marginLeft: 10 }} size="small" type="ghost" danger>
              删除
            </Button>
          </Popconfirm>
        </div>
      );
    },
  },
];

const rowSelection = {
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

export const PossessionPage: FC = function () {
  const ref = useRef<ActionType>(null);

  const requestData = async function () {
    const res = await fetchPossessionTree({ id: 0 });
    return {
      data: res.data.children,
      success: true,
    };
  };

  const createPossession = async function (
    form: PossessionFormData,
    fRef?: MutableRefObject<FormInstance>,
  ) {
    form.type = parseInt(form.type as any);
    const res = await createPossessionReq(form);

    if (res.code > 0) {
      message.success(res.message);
      fRef?.current?.resetFields();
      ref.current.reloadAndRest();
      return true;
    }
  };

  return (
    <ProTable<PossessionFormData>
      columns={columns}
      rowSelection={rowSelection}
      request={requestData}
      actionRef={ref}
      // rowKey={(r) => {
      //   return r.id;
      // }}
      rowKey="id"
      pagination={false}
      search={false}
      dateFormatter="string"
      toolbar={{
        title: '资源表格',
      }}
      toolBarRender={() => [
        <CreatePossessionModal title="新建资源" onFinish={createPossession} />,
      ]}
    />
  );
};
