import { DrawerForm } from '@ant-design/pro-form';
import { Button, FormInstance, Tree } from 'antd';
import { FC, useRef, MutableRefObject, useState } from 'react';
import { fetchPossessionTree, RoleFormData } from '@/api';
import filterDeep from 'deepdash-es/filterDeep';
import mapKeysDeep from 'deepdash-es/mapKeysDeep';
import { RouteContext } from '@ant-design/pro-layout';
import Search from 'antd/lib/input/Search';
// import CheckboxTree from 'react-checkbox-tree';
// import {
//   CheckSquareOutlined,
//   PlusSquareOutlined,
//   MinusSquareOutlined,
//   BorderOutlined,
//   FileOutlined,
//   FolderOpenOutlined,
//   FolderOutlined,
//   CloseSquareOutlined,
// } from '@ant-design/icons';

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

export const PickPossessionsModal: FC<CreateRoleModalProps> = function (props) {
  const ref = useRef<FormInstance>();
  const [tree, setTree] = useState([]);
  const [checked, setChecked] = useState([]);
  const [expanded, setExpanded] = useState([]);
  // const [autoExpandParent, setAutoExpandParent] = useState<boolean>(true);

  const requestData = async function () {
    const res = await fetchPossessionTree({ id: 0 });
    const tKeys = [];
    let t = filterDeep(
      [{ id: 0, type: 1, name: '根目录', ...res.data }],
      (v, key, parentValue) => {
        if (!tKeys.includes(parentValue?.id)) tKeys.push(parentValue?.id);
        if (parentValue.type === 2) {
          return false;
        }
        return true;
      },
    );

    t = mapKeysDeep(t, (v, k) => {
      if (k === 'id') {
        return 'key';
      }

      if (k === 'name') {
        return 'title';
      }
      return k;
    });

    console.log(t);
    console.log(tKeys);
    setExpanded(tKeys);
    setTree(t);
  };

  return (
    <RouteContext.Consumer>
      {(ctx) => {
        return (
          <DrawerForm<RoleFormData>
            title={props.title}
            width={ctx.isMobile ? '100%' : '60%'}
            drawerProps={{
              destroyOnClose: true,
            }}
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
                await requestData();
              } else {
                setChecked([]);
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
            {/* <CheckboxTree
              icons={{
                check: <CheckSquareOutlined />,
                uncheck: <BorderOutlined />,
                expandClose: <MinusSquareOutlined />,
                expandOpen: <PlusSquareOutlined />,
                parentClose: <FolderOutlined />,
                parentOpen: <FolderOpenOutlined />,
                leaf: <FileOutlined />,
                halfCheck: <CloseSquareOutlined />,
              }}
              showExpandAll={true}
              nodes={tree}
              expanded={expanded}
              checked={checked}
              onCheck={(checked) => {
                console.log(checked);
                setChecked(checked);
              }}
              onExpand={(expanded) => {
                setExpanded(expanded);
              }}
            /> */}
            {/* <Search
              style={{ marginBottom: 8 }}
              placeholder="Search"
              onChange={}
            /> */}
            <Tree
              checkable
              // selectable
              showLine={true}
              treeData={tree}
              checkedKeys={checked}
              expandedKeys={expanded}
              // autoExpandParent={autoExpandParent}
              onExpand={(expanded) => {
                setExpanded(expanded);
                // setAutoExpandParent(false);
              }}
              onCheck={(checkedKeysValue: React.Key[], e) => {
                console.log('onCheck', checkedKeysValue, e);
                setChecked(checkedKeysValue);
              }}
            />
          </DrawerForm>
        );
      }}
    </RouteContext.Consumer>
  );
};
