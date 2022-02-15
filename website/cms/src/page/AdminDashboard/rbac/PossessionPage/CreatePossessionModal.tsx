import ProForm, {
  ModalForm,
  ProFormCheckbox,
  ProFormSelect,
  ProFormSwitch,
  ProFormText,
  ProFormTextArea,
} from '@ant-design/pro-form';
import { Button, Form, FormInstance, message, TreeSelect } from 'antd';
import { FC, useRef, useContext, useState, MutableRefObject } from 'react';
import { fetchPossessionTree, PossessionFormData, PossessionType } from '@/api';
import { regexps } from '@/common/utils';
import { GlobalContext } from '@/provider';
import filterDeep from 'deepdash-es/filterDeep';
interface CreateGoodsModalProps {
  onFinish: (
    val: PossessionFormData,
    ref?: MutableRefObject<FormInstance>,
  ) => Promise<any>;
  title: string;
  row?: PossessionFormData;
  size?: any;
  id?: number;
  updateModal?: boolean;
}

export const CreatePossessionModal: FC<CreateGoodsModalProps> = function (
  props,
) {
  const ref = useRef<FormInstance>();
  const ctx = useContext(GlobalContext);
  const [selectNode, setSelectNode] = useState(null);
  const [tree, setTree] = useState(null);
  const { row } = props;

  const requestData = async function () {
    const res = await fetchPossessionTree({ id: 0, showLeaf: 0 });
    const t = filterDeep(
      [{ id: 0, type: 1, name: '根目录', ...res.data }],
      (v, key, parentValue) => {
        if (parentValue.type === 2) {
          return false;
        }
        return true;
      },
    );

    setTree(t);
  };
  return (
    <ModalForm<PossessionFormData>
      title={props.title}
      // modalProps={{
      //   destroyOnClose: true,
      // }}
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
          // setSelectNode(null);
          await requestData();
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
          label="资源名称"
          placeholder="请输入资源名称"
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
        <ProFormText
          width="md"
          name="path"
          label="路径"
          placeholder="请输入资源路径"
          initialValue={row?.path ?? ''}
          rules={[
            {
              required: true,
              message: '请输入',
            },
            {
              pattern: regexps.space,
              message: '禁止输入空格',
            },
            {
              pattern: regexps.posixPath,
              message: '请输入合法路径',
            },
          ]}
        />

        <ProFormSelect
          width="md"
          name="type"
          label="资源类型"
          valueEnum={PossessionType}
          initialValue={row?.type ?? ''}
          disabled={props.updateModal}
          rules={[
            {
              required: true,
              message: '请选择资源类型',
            },
          ]}
        />

        <Form.Item name="pid" label="放置在" required initialValue={row?.pid}>
          <TreeSelect
            allowClear
            style={{ width: '328px' }}
            value={selectNode}
            treeLine={{ showLeafIcon: false }}
            maxTagCount={1}
            dropdownStyle={{ maxHeight: 500, overflow: 'auto' }}
            treeData={tree}
            placeholder="请选择"
            treeDefaultExpandAll
            treeNodeFilterProp="isLeaf"
            onChange={setSelectNode as any}
            fieldNames={{
              value: 'id',
              label: 'name',
            }}
            onSelect={(value, node) => {
              if (node.type !== 1) {
                message.warn('所选节点不是菜单');
                setSelectNode(null);
              }
            }}
          />
        </Form.Item>
        <ProFormSwitch
          initialValue={row?.disable ?? false}
          name="disable"
          label="是否禁用"
        />
        <br />
        <br />

        <ProFormTextArea
          initialValue={row?.comment}
          name="comment"
          label="描述"
          width="lg"
          placeholder="请输入描述"
        />
      </ProForm.Group>
    </ModalForm>
  );
};
