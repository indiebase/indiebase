import {
  BannerFormData,
  deleteBanner,
  queryBanners,
  updateBanner,
  createBanner,
} from '@/api/banner';
import { PageContainer } from '@ant-design/pro-layout';
import ProTable, { ActionType, ProColumns } from '@ant-design/pro-table';
import { Button, message, Popconfirm } from 'antd';
import React, { useRef } from 'react';
import { CreateBannerModal } from './CreateBannerModal';

const columns: ProColumns<BannerFormData>[] = [
  {
    title: '标题',
    dataIndex: 'title',
    copyable: true,
    ellipsis: true,
    fixed: 'left',
  },

  {
    title: '副标题',
    dataIndex: 'subtitle',
    copyable: true,
    ellipsis: true,
  },

  {
    title: '跳转链接',
    dataIndex: 'string',
  },
  {
    title: '创建者',
    ellipsis: true,
    dataIndex: 'createBy',
    render: (_dom, row) => {
      return <span>{}</span>;
    },
  },
  {
    title: '禁用',
    dataIndex: 'disable',
    copyable: true,
    render: (_dom, row, _i, action) => {
      return (
        <span style={{ color: row.disable ? 'red' : 'green' }}>
          <Popconfirm
            title="你确定修改此应用?"
            onConfirm={async () => {
              const { data } = await updateBanner({
                id: row.id,
                disable: !row.disable ?? false,
              });
              if (data.code > 0) {
                message.success(data.message);
              }
              action.reload();
            }}
            okText="确认"
            cancelText="取消"
          >
            <Button size="small" type="ghost" danger>
              {row.disable ? '解禁' : '禁用'}
            </Button>
          </Popconfirm>
        </span>
      );
    },
  },
  {
    title: '操作',
    key: 'option',
    valueType: 'option',
    fixed: 'right',
    render: (_node, row, _i, action) => {
      return [
        <Popconfirm
          title="你确定修改此应用?"
          onConfirm={async () => {
            const { data } = await updateBanner({
              id: row.id,
              disable: !row.disable ?? false,
            });
            if (data.code > 0) {
              message.success(data.message);
            }
            action.reload();
          }}
          okText="确认"
          cancelText="取消"
        >
          <Button size="small" type="ghost" danger>
            {row.disable ? '解禁' : '禁用'}
          </Button>
        </Popconfirm>,
        <Popconfirm
          title="你确定删除此应用?"
          onConfirm={async () => {
            const { data } = await deleteBanner({
              id: row.id,
            });
            if (data.code > 0) {
              message.success(data.message);
            }
            action.reload();
          }}
          okText="确认"
          cancelText="取消"
        >
          <Button size="small" type="ghost" danger>
            删除
          </Button>
        </Popconfirm>,
      ];
    },
  },
];

export const BannerPage = function () {
  const tableRef = useRef<ActionType>();

  const requestData = async function () {
    const res = await queryBanners();
    console.log(res);
    return {
      data: [],
      success: true,
    };
  };

  // const handleCreateBanner = async function (form: CreateGoodsData) {
  //   if (form.price < form.discount) {
  //     message.error('折扣价大于价格');
  //     return;
  //   }
  //   // const { data } = await createGoods(form);
  //   // if (data.code > 0) {
  //   //   message.success(data.message);
  //   //   tableRef.current?.reload();
  //   //   return true;
  //   // } else {
  //   //   return false;
  //   // }
  // };

  return (
    <PageContainer
      ghost
      header={{
        title: 'Banner配置',
      }}
    >
      <ProTable<BannerFormData>
        columns={columns}
        search={false}
        scroll={{ x: 1500 }}
        request={requestData}
        pagination={{
          showQuickJumper: true,
        }}
        actionRef={tableRef}
        rowKey={(r) => r.id}
        dateFormatter="string"
        headerTitle="Banner"
        toolBarRender={() => [
          <CreateBannerModal
            title="新建Banner"
            onFinish={async (form) => {
              await createBanner(form).then((res) => {
                console.log(res);
                // message.success();
              });
              console.log(form);
            }}
          />,
        ]}
        bordered
      />
    </PageContainer>
  );
};
