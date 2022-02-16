import ProForm, {
  ModalForm,
  ProFormText,
  ProFormTextArea,
  ProFormUploadButton,
} from '@ant-design/pro-form';
import { Button, FormInstance } from 'antd';
import { FC, useRef, useState, useContext } from 'react';
import { BannerFormData, req } from '@/api';
import { regexps } from '@/common/utils';
import { GlobalContext } from '@/provider';
import { S3Upload } from '@/components/S3Upload';

interface CreateGoodsModalProps {
  onFinish: (val: BannerFormData) => Promise<any>;
  title: string;
  row?: BannerFormData;
  size?: any;
}

export const CreateBannerModal: FC<CreateGoodsModalProps> = function (props) {
  const ref = useRef<FormInstance>();
  const ctx = useContext(GlobalContext);
  console.log(ctx);

  return (
    <ModalForm<BannerFormData>
      title={props.title}
      trigger={
        <Button type="primary" size={props.size}>
          {props.title}
        </Button>
      }
      onFinish={async (val) => {
        if (val.imgUri?.[0]) {
          val.imgUri = (val.imgUri[0] as any).response?.data?.Location;
        }

        props.onFinish && (await props.onFinish(val));
      }}
      onVisibleChange={(visible) => {
        if (visible) {
          ref.current?.resetFields();
        }
      }}
      formRef={ref}
    >
      <ProForm.Group>
        <ProFormText
          width="md"
          name="title"
          label="标题"
          placeholder="请输入标题"
          initialValue={props.row?.title ?? ''}
          rules={[
            {
              required: true,
              message: '请输入',
            },
            {
              pattern: regexps.space,
              message: '禁止输入空格',
            },
          ]}
        />
        <ProFormText
          width="md"
          name="subtitle"
          label="副标题"
          placeholder="请输入副标题"
          initialValue={props.row?.subtitle ?? ''}
          rules={[
            {
              pattern: regexps.space,
              message: '禁止输入空格',
            },
          ]}
        />

        <ProFormText
          width="md"
          name="href"
          label="跳转链接"
          placeholder="请输入跳转链接"
          initialValue={props.row?.href ?? ''}
          rules={[
            {
              pattern: regexps.uri,
              message: '请输入合法链接',
            },
            {
              pattern: regexps.space,
              message: '禁止输入空格',
            },
          ]}
        />
        <S3Upload
          name="imgUri"
          label="Banner图片"
          max={1}
          forceImage={true}
          onChange={(info) => {
            console.log(info);
          }}
        />
        <ProFormTextArea
          initialValue={props.row?.desc}
          name="desc"
          label="描述"
          width="lg"
          placeholder="请输入描述"
        />
      </ProForm.Group>
    </ModalForm>
  );
};
