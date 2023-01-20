import { SearchOutlined } from '@ant-design/icons';
import { FieldLabel, useStyle } from '@letscollab/ant-utils';
import type { SelectProps } from 'antd';
import { ConfigProvider, Input, Select } from 'antd';
import classNames from 'classnames';
import React, { useContext, useMemo, useState } from 'react';
import type { ProFieldLightProps } from '../../../index';

export type LightSelectProps = {
  label?: string;
  placeholder?: any;
} & ProFieldLightProps;

/**
 * 如果有 label 就优先使用 label
 *
 * @param valueMap
 * @param v
 */
const getValueOrLabel = (
  valueMap: Record<string, string>,
  v:
    | {
        label: string;
        value: string;
      }
    | string,
) => {
  if (typeof v !== 'object') {
    return valueMap[v] || v;
  }
  return valueMap[v?.value] || v.label;
};

const LightSelect: React.ForwardRefRenderFunction<
  any,
  SelectProps<any> & LightSelectProps
> = (props, ref) => {
  const {
    label,
    prefixCls: customizePrefixCls,
    onChange,
    value,
    mode,
    children,
    defaultValue,
    size,
    showSearch,
    disabled,
    style,
    className,
    bordered,
    options,
    onSearch,
    allowClear,
    labelInValue,
    fieldNames,
    lightLabel,
    labelTrigger,
    ...restProps
  } = props;
  const { placeholder = label } = props;
  const { label: labelPropsName = 'label', value: valuePropsName = 'value' } =
    fieldNames || {};
  const { getPrefixCls } = useContext(ConfigProvider.ConfigContext);
  const prefixCls = getPrefixCls('pro-field-select-light-select');
  const [open, setOpen] = useState<boolean>(false);
  const [keyword, setKeyword] = useState<string>('');

  // css
  const { wrapSSR, hashId } = useStyle('LightSelect', (token) => {
    return {
      [`.${prefixCls}`]: {
        [`${token.antCls}-select`]: {
          position: 'absolute',
          width: '153px',
          height: '28px',
          visibility: 'hidden',
          '&-selector': {
            height: 28,
          },
        },

        [`&.${prefixCls}-searchable`]: {
          [`${token.antCls}-select`]: {
            width: '200px',
            '&-selector': {
              height: 28,
            },
          },
        },
      },
    };
  });

  const valueMap: Record<string, string> = useMemo(() => {
    const values = {};
    options?.forEach((item) => {
      const optionLabel = item[labelPropsName];
      const optionValue = item[valuePropsName];
      values[optionValue!] = optionLabel || optionValue;
    });
    return values;
  }, [labelPropsName, options, valuePropsName]);

  const filterValue = Array.isArray(value)
    ? value.map((v) => getValueOrLabel(valueMap, v))
    : getValueOrLabel(valueMap, value);

  return wrapSSR(
    <div
      className={classNames(
        prefixCls,
        hashId,
        {
          [`${prefixCls}-searchable`]: showSearch,
        },
        `${prefixCls}-container-${restProps.placement}`,
        className,
      )}
      style={style}
      onClick={(e) => {
        if (disabled) return;
        // 点击label切换下拉菜单
        const isLabelClick = lightLabel?.current?.labelRef?.current?.contains(
          e.target as HTMLElement,
        );
        if (isLabelClick) {
          setOpen(!open);
        } else {
          setOpen(true);
        }
      }}
    >
      <Select
        {...restProps}
        allowClear={allowClear}
        value={value}
        mode={mode}
        labelInValue={labelInValue}
        size={size}
        disabled={disabled}
        onChange={(v, option) => {
          onChange?.(v, option);
          if (mode !== 'multiple') {
            setTimeout(() => {
              setOpen(false);
            }, 0);
          }
        }}
        bordered={bordered}
        showSearch={showSearch}
        onSearch={onSearch}
        style={style}
        dropdownRender={(menuNode) => {
          return (
            <div ref={ref}>
              {showSearch && (
                <div style={{ margin: '4px 8px' }}>
                  <Input
                    value={keyword}
                    allowClear={allowClear}
                    onChange={(e) => {
                      setKeyword(e.target.value.toLowerCase());
                      onSearch?.(e.target.value);
                    }}
                    onKeyDown={(e) => {
                      // 避免按下删除键把选项也删除了
                      e.stopPropagation();
                    }}
                    style={{ width: '100%' }}
                    prefix={<SearchOutlined />}
                  />
                </div>
              )}
              {menuNode}
            </div>
          );
        }}
        open={open}
        onDropdownVisibleChange={(isOpen) => {
          if (!isOpen) {
            setTimeout(() => {
              setKeyword('');
            }, 0);
          }
          if (!labelTrigger) {
            setOpen(isOpen);
          }
        }}
        prefixCls={customizePrefixCls}
        options={
          onSearch || !keyword
            ? options
            : options?.filter((o) => {
                return (
                  String(o[labelPropsName])?.toLowerCase()?.includes(keyword) ||
                  o[valuePropsName]
                    ?.toString()
                    ?.toLowerCase()
                    ?.includes(keyword)
                );
              })
        }
      />
      <FieldLabel
        ellipsis
        size={size}
        label={label}
        placeholder={placeholder}
        disabled={disabled}
        expanded={open}
        bordered={bordered}
        allowClear={allowClear}
        value={filterValue || value?.label || value}
        onClear={() => {
          onChange?.(undefined, undefined as any);
        }}
        ref={lightLabel}
      />
    </div>,
  );
};

export default React.forwardRef(LightSelect);
