import { InputNumber } from 'antd';
import React, { useCallback } from 'react';
import omit from 'omit.js';
import type { ProFieldFC } from '../../index';

// 兼容代码-----------
import 'antd/es/input-number/style';
import { useIntl } from '@ant-design/pro-provider';
//----------------------

export type FieldDigitProps = {
  text: number;
  placeholder?: any;
};

/**
 * 数字组件
 *
 * @param FieldDigitProps {
 *     text: number;
 *     moneySymbol?: string; }
 */
const FieldDigit: ProFieldFC<FieldDigitProps> = (
  { text, mode: type, render, placeholder, renderFormItem, fieldProps },
  ref,
) => {
  const intl = useIntl();
  const placeholderValue = placeholder || intl.getMessage('tableForm.inputPlaceholder', '请输入');
  const proxyChange = useCallback(
    (value: number | string | null) => {
      let val: string | number | undefined = value ?? undefined;
      if (typeof value === 'string') {
        val = Number(val);
      }
      if (typeof val === 'number') {
        if (fieldProps.precision) {
          val = val?.toFixed?.(fieldProps.precision ?? 0);
        }
        val = Number(val);
      }
      return fieldProps?.onChange?.(val);
    },
    [fieldProps],
  );
  if (type === 'read') {
    let fractionDigits = {} as any;
    if (fieldProps?.precision) {
      fractionDigits = {
        minimumFractionDigits: Number(fieldProps.precision),
        maximumFractionDigits: Number(fieldProps.precision),
      };
    }
    const digit = new Intl.NumberFormat(undefined, {
      ...fractionDigits,
      ...(fieldProps?.intlProps || {}),
    }).format(Number(text) as number);
    const dom = <span ref={ref}>{fieldProps?.formatter?.(digit) || digit}</span>;
    if (render) {
      return render(text, { mode: type, ...fieldProps }, dom);
    }
    return dom;
  }
  if (type === 'edit' || type === 'update') {
    const dom = (
      <InputNumber<number>
        ref={ref}
        min={0}
        placeholder={placeholderValue}
        {...omit(fieldProps, ['onChange'])}
        onChange={proxyChange}
      />
    );
    if (renderFormItem) {
      return renderFormItem(text, { mode: type, ...fieldProps }, dom);
    }
    return dom;
  }
  return null;
};

export default React.forwardRef(FieldDigit);
