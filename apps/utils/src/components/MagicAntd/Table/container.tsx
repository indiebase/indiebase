import type { ProFormInstance } from '@ant-design/pro-form';
import type { TableColumnType } from 'antd';
import useMergedState from 'rc-util/lib/hooks/useMergedState';
import { noteOnce } from 'rc-util/lib/warning';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { createContainer } from 'unstated-next';
import type { DensitySize } from './components/ToolBar/DensityIcon';
import type { ProTableProps } from './index';
import type { ActionType } from './typing';
import { genColumnKey } from './utils';

export type ColumnsState = {
  show?: boolean;
  fixed?: 'right' | 'left' | undefined;
  order?: number;
  disable?:
    | boolean
    | {
        checkbox: boolean;
      };
};

export type ProTableColumn<T> = ColumnsState & TableColumnType<T>;

export type UseContainerProps<T = any> = {
  columnsStateMap?: Record<string, ColumnsState>;
  onColumnsStateChange?: (map: Record<string, ColumnsState>) => void;
  size?: DensitySize;
  defaultSize?: DensitySize;
  onSizeChange?: (size: DensitySize) => void;
  columns?: ProTableColumn<T>[];
  columnsState?: ProTableProps<any, any, any>['columnsState'];
};

function useContainer(props: UseContainerProps = {}) {
  const actionRef = useRef<ActionType>();
  const rootDomRef = useRef<HTMLDivElement>(null);
  /** 父 form item 的 name */
  const prefixNameRef = useRef<any>();

  /** 自己 props 的引用 */
  const propsRef = useRef<ProTableProps<any, any, any>>();

  /** 可编辑表格的formRef */
  const editableFormRef = useRef<ProFormInstance<any>>();

  // 共享状态比较难，就放到这里了
  const [keyWords, setKeyWords] = useState<string | undefined>('');
  // 用于排序的数组
  const sortKeyColumns = useRef<string[]>([]);

  const [tableSize, setTableSize] = useMergedState<DensitySize>(
    () => props.size || props.defaultSize || 'middle',
    {
      value: props.size,
      onChange: props.onSizeChange,
    },
  );

  /** 默认全选中 */
  const defaultColumnKeyMap = useMemo(() => {
    const columnKeyMap = {};
    props.columns?.forEach(({ key, dataIndex, fixed, disable }, index) => {
      const columnKey = genColumnKey(key ?? (dataIndex as React.Key), index);
      if (columnKey) {
        columnKeyMap[columnKey] = {
          show: true,
          fixed,
          disable,
        };
      }
    });
    return columnKeyMap;
  }, [props.columns]);

  const [columnsMap, setColumnsMap] = useMergedState<Record<string, ColumnsState>>(
    () => {
      const { persistenceType, persistenceKey } = props.columnsState || {};

      if (persistenceKey && persistenceType && typeof window !== 'undefined') {
        /** 从持久化中读取数据 */
        const storage = window[persistenceType];
        try {
          const storageValue = storage?.getItem(persistenceKey);
          if (storageValue) {
            return JSON.parse(storageValue);
          }
        } catch (error) {
          console.warn(error);
        }
      }

      return (
        props.columnsStateMap ||
        props.columnsState?.value ||
        props.columnsState?.defaultValue ||
        defaultColumnKeyMap
      );
    },
    {
      value: props.columnsState?.value || props.columnsStateMap,
      onChange: props.columnsState?.onChange || props.onColumnsStateChange,
    },
  );

  noteOnce(!props.columnsStateMap, 'columnsStateMap已经废弃，请使用 columnsState.value 替换');
  noteOnce(
    !props.columnsStateMap,
    'columnsStateMap has been discarded, please use columnSstate.value replacement',
  );

  /** 清空一下当前的 key */
  const clearPersistenceStorage = useCallback(() => {
    const { persistenceType, persistenceKey } = props.columnsState || {};

    if (!persistenceKey || !persistenceType || typeof window === 'undefined') return;

    /** 给持久化中设置数据 */
    const storage = window[persistenceType];
    try {
      storage?.removeItem(persistenceKey);
    } catch (error) {
      console.error(error);
    }
  }, [props.columnsState]);

  useEffect(() => {
    if (!props.columnsState?.persistenceKey || !props.columnsState?.persistenceType) {
      return;
    }
    if (typeof window === 'undefined') return;
    /** 给持久化中设置数据 */
    const { persistenceType, persistenceKey } = props.columnsState;
    const storage = window[persistenceType];
    try {
      storage?.setItem(persistenceKey, JSON.stringify(columnsMap));
    } catch (error) {
      console.error(error);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.columnsState?.persistenceKey, columnsMap, props.columnsState?.persistenceType]);
  const renderValue = {
    action: actionRef.current,
    setAction: (newAction?: ActionType) => {
      actionRef.current = newAction;
    },
    sortKeyColumns: sortKeyColumns.current,
    setSortKeyColumns: (keys: string[]) => {
      sortKeyColumns.current = keys;
    },
    propsRef,
    columnsMap,
    keyWords,
    setKeyWords: (k: string | undefined) => setKeyWords(k),
    setTableSize,
    tableSize,
    prefixName: prefixNameRef.current,
    setPrefixName: (name: any) => {
      prefixNameRef.current = name;
    },
    setEditorTableForm: (form: ProFormInstance<any>) => {
      editableFormRef.current = form;
    },
    editableForm: editableFormRef.current,
    setColumnsMap,
    columns: props.columns,
    rootDomRef,
    clearPersistenceStorage,
  };

  Object.defineProperty(renderValue, 'prefixName', {
    get: (): string => prefixNameRef.current,
  });

  Object.defineProperty(renderValue, 'sortKeyColumns', {
    get: (): string[] => sortKeyColumns.current,
  });

  Object.defineProperty(renderValue, 'action', {
    get: () => actionRef.current,
  });

  Object.defineProperty(renderValue, 'editableForm', {
    get: () => editableFormRef.current,
  });

  return renderValue;
}

const Container = createContainer<ReturnType<typeof useContainer>, UseContainerProps>(useContainer);

export type ContainerType = typeof useContainer;

export { useContainer };

export default Container;
