import { CloseOutlined } from '@ant-design/icons';
import { useIntl } from '@ant-design/pro-provider';
import { ConfigProvider } from 'antd';
import type { SizeType } from 'antd/es/config-provider/SizeContext';
import classNames from 'classnames';
import React, { useContext, useImperativeHandle, useRef } from 'react';
import { useStyle } from './style';
import { IconChevronDown } from '@tabler/icons';
import { ActionIcon, ThemeIcon } from '@mantine/core';

export type FieldLabelProps = {
  label?: React.ReactNode;
  value?: any;
  disabled?: boolean;
  onClear?: () => void;
  size?: SizeType;
  ellipsis?: boolean;
  placeholder?: React.ReactNode;
  expanded?: boolean;
  className?: string;
  formatter?: (value: any) => React.ReactNode;
  style?: React.CSSProperties;
  bordered?: boolean;
  allowClear?: boolean;
  /**
   * 点击标签的事件，用来唤醒 down menu 状态
   */
  onLabelClick?: () => void;
};

const FieldLabelFunction: React.ForwardRefRenderFunction<
  any,
  FieldLabelProps
> = (props, ref) => {
  const {
    label,
    onClear,
    value,
    size = 'middle',
    disabled,
    onLabelClick,
    ellipsis,
    placeholder,
    className,
    formatter,
    bordered,
    allowClear = true,
  } = props;
  const { getPrefixCls } = useContext(ConfigProvider.ConfigContext);
  const prefixCls = getPrefixCls('pro-core-field-label');
  const { wrapSSR, hashId } = useStyle(prefixCls);
  const intl = useIntl();
  const clearRef = useRef<HTMLElement>(null);
  const labelRef = useRef<HTMLElement>(null);

  useImperativeHandle(ref, () => ({
    labelRef,
    clearRef,
  }));

  const formatterText = (aValue: any) => {
    if (formatter) {
      return formatter(aValue);
    }
    return Array.isArray(aValue) ? aValue.join(',') : aValue;
  };

  const getTextByValue = (
    aLabel?: React.ReactNode | React.ReactNode[],
    aValue?: string | string[],
  ): React.ReactNode => {
    if (
      aValue !== undefined &&
      aValue !== null &&
      aValue !== '' &&
      (!Array.isArray(aValue) || aValue.length)
    ) {
      const prefix = aLabel ? (
        <span onClick={onLabelClick} className={`${prefixCls}-text`}>
          {aLabel}
          {': '}
        </span>
      ) : (
        ''
      );
      const str = formatterText(aValue);
      if (!ellipsis) {
        return (
          <span
            style={{
              display: 'inline-flex',
              alignItems: 'center',
            }}
          >
            {prefix}
            {formatterText(aValue)}
          </span>
        );
      }
      // 普通表单值最大长度41，如2022-06-21 20:11:25 ~ 2022-06-22 20:11:25
      const VALUE_MAX_LENGTH = 41;
      const getText = () => {
        const isArrayValue = Array.isArray(aValue) && aValue.length > 1;
        const unitText = intl.getMessage('form.lightFilter.itemUnit', '项');
        if (
          typeof str === 'string' &&
          str.length > VALUE_MAX_LENGTH &&
          isArrayValue
        ) {
          return `...${aValue.length}${unitText}`;
        }
        return '';
      };
      const tail = getText();

      return (
        <span
          title={typeof str === 'string' ? str : undefined}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
          }}
        >
          {prefix}
          <span style={{ paddingInlineStart: 4 }}>
            {typeof str === 'string'
              ? str?.toString()?.substr?.(0, VALUE_MAX_LENGTH)
              : str}
          </span>
          {tail}
        </span>
      );
    }
    return aLabel || placeholder;
  };
  return wrapSSR(
    <span
      className={classNames(
        prefixCls,
        hashId,
        `${prefixCls}-${size}`,
        {
          [`${prefixCls}-active`]: !!value || value === 0,
          [`${prefixCls}-disabled`]: disabled,
          [`${prefixCls}-bordered`]: bordered,
          [`${prefixCls}-allow-clear`]: allowClear,
        },
        className,
      )}
      ref={labelRef}
    >
      {getTextByValue(label, value)}
      {(value || value === 0) && allowClear && (
        <CloseOutlined
          role="button"
          title="清除"
          className={classNames(
            `${prefixCls}-icon`,
            hashId,
            `${prefixCls}-close`,
          )}
          onClick={(e) => {
            if (onClear && !disabled) {
              onClear();
            }
            e.stopPropagation();
          }}
          ref={clearRef}
        />
      )}
      {/* TODO:changed */}
      <ActionIcon color="gray" size="xs" variant="transparent">
        <IconChevronDown />
      </ActionIcon>
    </span>,
  );
};

export const FieldLabel = React.forwardRef(FieldLabelFunction);
