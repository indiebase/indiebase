﻿import { PlusOutlined } from '@ant-design/icons';
import type { ProFormInstance } from '@ant-design/pro-form';
import { ProFormDependency } from '@ant-design/pro-form';
import type { ParamsType } from '@ant-design/pro-provider';
import { useIntl } from '@ant-design/pro-provider';
import { isDeepEqualReact, runFunction, usePrevious, useRefFunction } from '@ant-design/pro-utils';
import type { ButtonProps, FormItemProps } from 'antd';
import { Button, Form } from 'antd';
import type { NamePath } from 'antd/lib/form/interface';
import type { GetRowKey } from 'antd/lib/table/interface';
import { Field } from 'rc-field-form';
import useMergedState from 'rc-util/lib/hooks/useMergedState';
import get from 'rc-util/lib/utils/get';
import set from 'rc-util/lib/utils/set';
import React, { useContext, useEffect, useImperativeHandle, useMemo, useRef } from 'react';
import ProTable from '../../Table';
import type { ActionType, ProTableProps } from '../../typing';

export type EditableFormInstance<T = any> = ProFormInstance<T> & {
  /**
   * 获取一行数据的
   * @param rowIndex
   * @returns T | undefined
   *
   * @example getRowData(1)  可以传入第几行的数据
   * @example getRowData("id")  也可以传入 rowKey，根据你列的唯一key 来获得。
   */
  getRowData?: (rowIndex: string | number) => T | undefined;
  /**
   * 获取整个 table 的数据
   * @returns T[] | undefined
   */
  getRowsData?: () => T[] | undefined;
  /**
   * 设置一行的数据，会将数据进行简单的 merge
   *
   * {title:"old", decs:"old",id:"old"} -> set {title:"new"} -> {title:"new", decs:"old",id:"old"}
   *
   * @description 只会做最第一层对象的 merge 哦。
   * {title:"old", decs:{name:"old",key:"old"},id:"old"} -> set {decs:{name:"new"}} -> {title:"old", decs:{name:"new"},id:"old"} -> set {decs:{name:"old"}}
   *
   * @param rowIndex
   * @param data
   * @returns void
   *
   * 根据行号设置
   * @example setRowData(1, { title:"new" })  可以传入修改第几行
   *
   * 根据行 id 设置
   * @example setRowData("id", { title:"new" })  也可以传入 rowKey，根据你列的唯一 key 来设置。
   *
   * 清空原有数据
   * @example setRowData(1, { title:undefined })
   *
   */
  setRowData?: (rowIndex: string | number, data: Partial<T>) => void;
};

export type RecordCreatorProps<DataSourceType> = {
  record: DataSourceType | ((index: number, dataSource: DataSourceType[]) => DataSourceType);
  position?: 'top' | 'bottom';
  /**
   * 新增一行的类型
   *
   * @augments dataSource 将会新增一行数据到 dataSource 中，不支持取消，只能删除
   * @augments cache 将会把数据放到缓存中，取消后消失
   */
  newRecordType?: 'dataSource' | 'cache';
  /** 要增加到哪个节点下，一般用于多重嵌套表格 */
  parentKey?: React.Key | ((index: number, dataSource: DataSourceType[]) => React.Key);
};

export type EditableProTableProps<T, U extends ParamsType, ValueType = 'text'> = Omit<
  ProTableProps<T, U, ValueType>,
  'onChange'
> & {
  defaultValue?: T[];
  value?: T[];
  onChange?: (value: T[]) => void;
  /** @name 原先的 table OnChange */
  onTableChange?: ProTableProps<T, U>['onChange'];

  /**
   *@name 可编辑表格，列配置的form，可以操作表格里面的数据
   */
  editableFormRef?: React.Ref<EditableFormInstance<T> | undefined>;

  /** @name 新建按钮的设置 */
  recordCreatorProps?:
    | (RecordCreatorProps<T> &
        ButtonProps & {
          creatorButtonText?: React.ReactNode;
        })
    | false;
  /** 最大行数 */
  maxLength?: number;
  /** Table 的值发生改变，为了适应 Form 调整了顺序 */
  onValuesChange?: (values: T[], record: T) => void;
  /** 是否受控，如果为 true，每次 value 更新都会重置表单 */
  controlled?: boolean;
  /** FormItem 的设置 */
  formItemProps?: Omit<FormItemProps, 'children' | 'name'>;
};

const EditableTableActionContext = React.createContext<
  React.MutableRefObject<ActionType | undefined> | undefined
>(undefined);

/** 可编辑表格的按钮 */
function RecordCreator<T = Record<string, any>>(
  props: RecordCreatorProps<T> & { children: JSX.Element },
) {
  const { children, record, position, newRecordType, parentKey } = props;
  const actionRef = useContext(EditableTableActionContext);
  return React.cloneElement(children, {
    ...children.props,
    onClick: async (e: any) => {
      // 如果返回了false，接触掉默认行为
      const isOk = await children.props.onClick?.(e);
      if (isOk === false) return;
      actionRef?.current?.addEditRecord(record, {
        position,
        newRecordType,
        parentKey: parentKey as React.Key,
      });
    },
  });
}

/**
 * 可以直接放到 Form 中的可编辑表格
 *
 * @param props
 */
function EditableTable<
  DataType extends Record<string, any>,
  Params extends ParamsType = ParamsType,
  ValueType = 'text',
>(props: EditableProTableProps<DataType, Params, ValueType>) {
  const intl = useIntl();
  const {
    onTableChange,
    maxLength,
    formItemProps,
    recordCreatorProps,
    rowKey,
    controlled,
    defaultValue,
    onChange,
    editableFormRef,
    ...rest
  } = props;

  const preData = usePrevious(props.value);
  const actionRef = useRef<ActionType>();
  const formRef = useRef<ProFormInstance>();

  // 设置 ref
  useImperativeHandle(rest.actionRef, () => actionRef.current);

  const [value, setValue] = useMergedState<DataType[]>(() => props.value || defaultValue || [], {
    value: props.value,
    onChange: props.onChange,
  });

  const getRowKey = React.useMemo<GetRowKey<DataType>>((): GetRowKey<DataType> => {
    if (typeof rowKey === 'function') {
      return rowKey;
    }
    return (record: DataType, index?: number) => (record as any)[rowKey as string] || index;
  }, [rowKey]);

  /**
   * 根据不同的情况返回不同的 rowKey
   * @param finlayRowKey
   * @returns string | number
   */
  const coverRowKey = (finlayRowKey: number | string): string | number => {
    /**
     * 如果是 prop.name 的模式，就需要把行号转化成具体的rowKey。
     */
    if (typeof finlayRowKey === 'number' && !props.name) {
      if (finlayRowKey >= value.length) return finlayRowKey;
      const rowData = value && value[finlayRowKey];
      return getRowKey?.(rowData!, finlayRowKey);
    }

    /**
     * 如果是 prop.name 的模式，就直接返回行号
     */
    if ((typeof finlayRowKey === 'string' || finlayRowKey >= value.length) && props.name) {
      const rowIndex = value.findIndex((item, index) => {
        return getRowKey?.(item, index)?.toString() === finlayRowKey?.toString();
      });
      return rowIndex;
    }
    return finlayRowKey;
  };

  // 设置 editableFormRef
  useImperativeHandle(editableFormRef, () => {
    /**
     * 获取一行数据的
     * @param rowIndex
     * @returns T | undefined
     */
    const getRowData = (rowIndex: string | number) => {
      if (rowIndex == undefined) {
        throw new Error('rowIndex is required');
      }

      const finlayRowKey = coverRowKey(rowIndex);

      const rowKeyName = [props.name, finlayRowKey?.toString() ?? '']
        .flat(1)
        .filter(Boolean) as NamePath;
      return formRef.current?.getFieldValue(rowKeyName) as DataType;
    };
    /**
     * 获取整个 table 的数据
     * @returns T[] | undefined
     */
    const getRowsData = () => {
      const rowKeyName = [props.name].flat(1).filter(Boolean) as NamePath;
      if (Array.isArray(rowKeyName) && rowKeyName.length === 0) {
        const rowData = formRef.current?.getFieldsValue();
        if (Array.isArray(rowData)) return rowData;
        return Object.keys(rowData).map((key) => {
          return rowData[key];
        });
      }
      return formRef.current?.getFieldValue(rowKeyName) as DataType[];
    };
    return {
      ...formRef.current,
      getRowData,
      getRowsData,
      /**
       * 设置一行的数据，会将数据进行简单的 merge
       * @param rowIndex
       * @param data
       * @returns void
       */
      setRowData: (rowIndex, data) => {
        if (rowIndex == undefined) {
          throw new Error('rowIndex is required');
        }
        const finlayRowKey = coverRowKey(rowIndex);
        const rowKeyName = [props.name, finlayRowKey?.toString() ?? '']
          .flat(1)
          .filter(Boolean) as string[];
        const oldTableDate = formRef.current?.getFieldsValue?.() || {};
        const updateValues = set(oldTableDate, rowKeyName, {
          // 只是简单的覆盖，如果很复杂的话，需要自己处理
          ...getRowData(rowIndex),
          ...(data || {}),
        });
        return formRef.current?.setFieldsValue(updateValues);
      },
    } as EditableFormInstance<DataType>;
  });

  useEffect(() => {
    if (!props.controlled) return;
    value.forEach((current, index) => {
      formRef.current?.setFieldsValue({
        [getRowKey(current, index)]: current,
      });
    }, {});
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value, props.controlled]);

  useEffect(() => {
    if (props.name) {
      formRef.current = props?.editable?.form;
    }
  }, [props.editable?.form, props.name]);

  const {
    record,
    position,
    creatorButtonText,
    newRecordType,
    parentKey,
    style,
    ...restButtonProps
  } = recordCreatorProps || {};
  const isTop = position === 'top';
  const creatorButtonDom = useMemo(() => {
    if (maxLength && maxLength <= value?.length) {
      return false;
    }
    return (
      recordCreatorProps !== false && (
        <RecordCreator
          record={runFunction(record, value?.length, value) || {}}
          position={position}
          parentKey={runFunction(parentKey, value?.length, value)}
          newRecordType={newRecordType}
        >
          <Button
            type="dashed"
            style={{
              display: 'block',
              margin: '10px 0',
              width: '100%',
              ...style,
            }}
            icon={<PlusOutlined />}
            {...restButtonProps}
          >
            {creatorButtonText || intl.getMessage('editableTable.action.add', '添加一行数据')}
          </Button>
        </RecordCreator>
      )
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [recordCreatorProps, maxLength, value?.length]);

  const buttonRenderProps = useMemo(() => {
    if (!creatorButtonDom) {
      return {};
    }
    if (isTop) {
      return {
        components: {
          header: {
            wrapper: ({
              className,
              children,
            }: {
              className: string;
              children: React.ReactNode;
            }) => (
              <thead className={className}>
                {children}
                <tr style={{ position: 'relative' }}>
                  {/* 占位 */}
                  <td colSpan={0} style={{ visibility: 'hidden' }}>
                    {creatorButtonDom}
                  </td>
                  <td
                    style={{ position: 'absolute', left: 0, width: '100%' }}
                    colSpan={rest.columns?.length}
                  >
                    {creatorButtonDom}
                  </td>
                </tr>
              </thead>
            ),
          },
        },
      };
    }
    return {
      tableViewRender: (_: any, dom: any) => {
        return (
          <>
            {props.tableViewRender?.(_, dom) ?? dom}
            {creatorButtonDom}
          </>
        );
      },
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isTop, creatorButtonDom]);

  const editableProps = { ...props.editable };

  /**
   * 防止闭包的onchange
   *
   * >>>>>>为了性能好辛苦
   */
  const newOnValueChange = useRefFunction((r: DataType, dataSource: DataType[]) => {
    props.editable?.onValuesChange?.(r, dataSource);
    props.onValuesChange?.(dataSource, r);
    if (props.controlled) {
      props?.onChange?.(dataSource);
    }
  });

  if (
    props?.onValuesChange ||
    props.editable?.onValuesChange ||
    // 受控模式需要触发 onchange
    (props.controlled && props?.onChange)
  ) {
    editableProps.onValuesChange = newOnValueChange;
  }

  return (
    <>
      <EditableTableActionContext.Provider value={actionRef}>
        <ProTable<DataType, Params, ValueType>
          search={false}
          options={false}
          pagination={false}
          rowKey={rowKey}
          revalidateOnFocus={false}
          {...rest}
          {...buttonRenderProps}
          tableLayout="fixed"
          actionRef={actionRef}
          onChange={onTableChange}
          editable={{
            ...editableProps,
            formProps: {
              formRef,
              ...editableProps.formProps,
            },
          }}
          dataSource={value}
          onDataSourceChange={(dataSource: DataType[]) => {
            setValue(dataSource);
            /**
             * 如果是top，需要重新设置一下 form，不然会导致 id 相同数据混淆
             */
            if (props.name && position === 'top') {
              const newValue = set({}, [props.name!].flat(1).filter(Boolean), dataSource);
              formRef.current?.setFieldsValue(newValue);
            }
          }}
        />
      </EditableTableActionContext.Provider>
      {/* 模拟 onValuesChange */}
      {props.name ? (
        <ProFormDependency name={[props.name!]}>
          {(changeValue) => {
            const list = get(changeValue, [props.name].flat(1) as string[]) as any[];
            const changeItem = list?.find((item, index) => {
              return !isDeepEqualReact(item, preData?.[index]);
            });
            if (!changeItem) return null;
            props?.editable?.onValuesChange?.(changeItem, list);
            return null;
          }}
        </ProFormDependency>
      ) : null}
    </>
  );
}

function FieldEditableTable<
  DataType extends Record<string, any>,
  Params extends ParamsType = ParamsType,
  ValueType = 'text',
>(props: EditableProTableProps<DataType, Params, ValueType>) {
  if (!props.name) return <EditableTable<DataType, Params, ValueType> {...props} />;
  return (
    <Form.Item
      style={{
        maxWidth: '100%',
      }}
      {...props?.formItemProps}
      name={props.name}
    >
      <Field shouldUpdate={true} name={props.name} isList>
        {(control, _, form) => {
          return (
            <EditableTable<DataType, Params, ValueType>
              {...props}
              editable={{
                ...props.editable,
                form: form as ProFormInstance,
              }}
              value={control.value || []}
              onChange={control.onChange}
            />
          );
        }}
      </Field>
    </Form.Item>
  );
}

FieldEditableTable.RecordCreator = RecordCreator;

export default FieldEditableTable;
