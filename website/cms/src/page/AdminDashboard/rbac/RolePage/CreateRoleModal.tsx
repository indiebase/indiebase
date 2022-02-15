import ProForm, {
  ModalForm,
  ProFormSwitch,
  ProFormText,
} from '@ant-design/pro-form';
import { Button, FormInstance } from 'antd';
import { FC, useRef, MutableRefObject } from 'react';
import { RoleFormData } from '@/api';
import { regexps } from '@/common/utils';
interface CreateRoleModalProps {
  onFinish: (
    val: RoleFormData,
    ref?: MutableRefObject<FormInstance>,
  ) => Promise<any>;
  title: string;
  row?: RoleFormData;
  size?: any;
  id?: number;
  updateModal?: boolean;
}

export const CreateRoleModal: FC<CreateRoleModalProps> = function (props) {
  const ref = useRef<FormInstance>();

  const { row } = props;

  return (
    <ModalForm<RoleFormData>
      title={props.title}
      trigger={
        <Button type="primary" size={props.size}>
          {props.title}
        </Button>
      }
      onFinish={async (val) => {
        return props.onFinish(val, ref);
      }}
      onVisibleChange={async (visible) => {
        if (visible) {
          props.updateModal && ref.current?.resetFields();
        }
      }}
      formRef={ref}
      submitter={{
        render: (props, defaultDoms) => {
          return [
            <Button
              key="extra-reset"
              type="ghost"
              onClick={() => {
                props.reset();
              }}
            >
              重置
            </Button>,
            ...defaultDoms,
          ];
        },
      }}
    >
      <ProForm.Group>
        <ProFormText
          width="md"
          name="name"
          label="角色名称"
          placeholder="请输入角色名称"
          initialValue={row?.name ?? ''}
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

        <ProFormSwitch
          initialValue={row?.disable ?? 0}
          name="disable"
          label="是否禁用"
        />
        {/* 
        <ProFormTextArea
          initialValue={row?.comment}
          name="comment"
          label="描述"
          width="lg"
          placeholder="请输入描述"
        /> */}
      </ProForm.Group>
    </ModalForm>
  );
};
