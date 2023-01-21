import { useIntl } from '@ant-design/pro-provider';
import { FieldLabel, parseValueToDay, useStyle } from '@letscollab/ant-utils';
import type { DatePickerProps } from 'antd';
import { ConfigProvider } from 'antd';
import dayjs from 'dayjs';
import weekOfYear from 'dayjs/plugin/weekOfYear';
import React, { useContext, useState } from 'react';
import type { ProFieldFC, ProFieldLightProps } from '../../index';
import { Calendar, DatePicker } from '@mantine/dates';
import { Popover } from '@mantine/core';

// 兼容代码-----------
//----------------------

dayjs.extend(weekOfYear);

const formatDate = (text: any, format: any) => {
  if (!text) {
    return '-';
  }
  if (typeof format === 'function') {
    return format(dayjs(text));
  } else {
    return dayjs(text).format(format || 'YYYY-MM-DD');
  }
};

export const useDatePickerStyle = () => {
  const { getPrefixCls } = useContext(ConfigProvider.ConfigContext);

  const prefixCls = getPrefixCls('pro-field-date-picker');

  // css
  const css = useStyle('DatePicker', (token) => {
    return {
      [`.${prefixCls}-light`]: {
        [`${token.antCls}-picker,${token.antCls}-calendar-picker`]: {
          position: 'absolute',
          width: '80px',
          height: '28px',
          overflow: 'hidden',
          visibility: 'hidden',
        },
      },
    };
  });
  return { ...css, prefixCls };
};

/**
 * 日期选择组件
 *
 * @param
 */
const FieldDatePicker: ProFieldFC<
  {
    text: string | number;
    format: string;
    showTime?: boolean;
    bordered?: boolean;
    picker?: DatePickerProps['picker'];
  } & ProFieldLightProps
> = (
  {
    text,
    mode,
    format,
    label,
    light,
    render,
    renderFormItem,
    plain,
    showTime,
    fieldProps,
    picker,
    bordered,
    lightLabel,
    labelTrigger,
  },
  ref,
) => {
  const intl = useIntl();
  const size = useContext(ConfigProvider.SizeContext);
  const [open, setOpen] = useState<boolean>(false);
  const [value, setValue] = useState(null);

  const { hashId, prefixCls, wrapSSR } = useDatePickerStyle();

  if (mode === 'read') {
    const dom = formatDate(text, fieldProps.format || format);
    if (render) {
      return render(text, { mode, ...fieldProps }, <>{dom}</>);
    }
    return <>{dom}</>;
  }
  if (mode === 'edit' || mode === 'update') {
    let dom;
    const {
      disabled,
      value,
      onChange,
      allowClear,
      placeholder = intl.getMessage('tableForm.selectPlaceholder', '请选择'),
    } = fieldProps;

    const momentValue = parseValueToDay(value) as dayjs.Dayjs;

    if (light) {
      const valueStr: string =
        (momentValue && momentValue.format(format)) || '';
      dom = (
        <div
          className={`${prefixCls}-light ${hashId}`}
          onClick={(e) => {
            // 点击label切换下拉菜单
            const isLabelClick =
              lightLabel?.current?.labelRef?.current?.contains(
                e.target as HTMLElement,
              );

            if (isLabelClick) {
              setOpen(!open);
            } else {
              setOpen(true);
            }
          }}
        >
          <Popover
            opened={open}
            onChange={(isOpen) => {
              if (!labelTrigger) {
                setOpen(isOpen);
              }
            }}
          >
            <Popover.Dropdown>
              <Calendar
                value={value}
                onChange={(value) => {
                  setValue(value);
                }}
              />
            </Popover.Dropdown>
          </Popover>
          {/* <DatePicker
            picker={picker}
            showTime={showTime}
            format={format}
            ref={ref}
            {...fieldProps}
            value={momentValue}
            onChange={(v) => {
              onChange?.(v);
              setTimeout(() => {
                setOpen(false);
              }, 0);
            }}
            onOpenChange={(isOpen) => {
              if (!labelTrigger) {
                setOpen(isOpen);
              }
            }}
            open={open}
          /> */}
          <FieldLabel
            label={label}
            disabled={disabled}
            placeholder={placeholder}
            size={size}
            value={valueStr}
            onClear={() => {
              onChange?.(null);
            }}
            allowClear={allowClear}
            bordered={bordered}
            expanded={open}
            ref={lightLabel}
          />
        </div>
      );
    } else {
      dom = (
        <DatePicker
          picker={picker}
          showTime={showTime}
          format={format}
          placeholder={placeholder}
          bordered={plain === undefined ? true : !plain}
          ref={ref}
          {...fieldProps}
          value={momentValue}
        />
      );
    }
    if (renderFormItem) {
      return renderFormItem(text, { mode, ...fieldProps }, dom);
    }
    return wrapSSR(dom);
  }
  return null;
};
export default React.forwardRef(FieldDatePicker);
