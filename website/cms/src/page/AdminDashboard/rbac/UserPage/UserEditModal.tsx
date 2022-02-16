import ProForm, {
  DrawerForm,
  ProFormSelect,
  ProFormSwitch,
} from '@ant-design/pro-form';
import { Avatar, Button, Col, FormInstance, Row } from 'antd';
import { FC, useRef, MutableRefObject, useState } from 'react';
import { queryRolesReq, UserFormData } from '@/api';
import mapKeysDeep from 'deepdash-es/mapKeysDeep';
interface CreateUserModalProps {
  onFinish: (
    val: UserFormData,
    ref?: MutableRefObject<FormInstance>,
  ) => Promise<any>;
  title: string;
  row?: UserFormData;
  size?: any;
  id?: number;
  updateModal?: boolean;
}

export const UserEditModal: FC<CreateUserModalProps> = function (props) {
  const ref = useRef<FormInstance>();
  const [roles, setRoles] = useState(null);

  const { row } = props;
  const requestData = async function () {
    const res = await queryRolesReq();
    if (res.code > 0) {
      setRoles(
        mapKeysDeep(res.data?.list, (v, k) => {
          if (k === 'id') {
            return 'value';
          }

          if (k === 'name') {
            return 'label';
          }
          return k;
        }),
      );
    }
  };

  return (
    <DrawerForm<UserFormData>
      title={props.title}
      trigger={
        <Button type="primary" size={props.size}>
          {props.title}
        </Button>
      }
      onFinish={async (val) => {
        return props.onFinish(val, );
      }}
      onVisibleChange={async (visible) => {
        if (visible) {
          await requestData();
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
      <Col>
        <Row align="middle" justify="center">
          <Avatar
            size={90}
            style={{
              backgroundColor: '#7265e6',
            }}
            shape="circle"
          >
            {row?.username}
          </Avatar>
        </Row>
        <br />
        <Row align="middle" justify="center">
          账户：{row?.account}
        </Row>
      </Col>

      <br />
      <br />

      <ProForm.Group>
        {/* <ProFormText
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
        /> */}

        <ProFormSelect
          width="md"
          name="type"
          label="角色"
          placeholder="点击添加角色"
          // initialValue={}
          // request
          // options={roles}
          fieldProps={{
            mode: 'multiple',
            // fieldNames: {
            //   label: 'name',
            //   value: 'id',
            // },
          }}
          rules={[
            {
              required: true,
              message: '请选择资源类型',
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
    </DrawerForm>
  );
};
