import { useIntl } from '@ant-design/pro-provider';
import { parseValueToDay } from '@letscollab/ant-utils';
import { DatePicker } from 'antd';
import dayjs from 'dayjs';
import React, { useCallback, useState } from 'react';
import type { ProFieldFC } from '../../index';

// 兼容代码-----------
import 'antd/es/date-picker/style';
import { DateRangePicker, DateRangePickerValue } from '@mantine/dates';
//------------

/**
 * 日期范围选择组件
 *
 * @param
 */
const FieldRangePicker: ProFieldFC<{
  text: string[];
  format: string;
  showTime?: boolean;
}> = (
  { text, mode, format, render, renderFormItem, plain, showTime, fieldProps },
  ref,
) => {
  const [value, setValue] = useState<DateRangePickerValue>();
  const intl = useIntl();
  const [startText, endText] = Array.isArray(text) ? text : [];
  const genFormatText = useCallback(
    (formatValue: dayjs.Dayjs) => {
      if (typeof fieldProps?.format === 'function') {
        return fieldProps?.format?.(formatValue);
      }
      return fieldProps?.format || format || 'YYYY-MM-DD';
    },
    [fieldProps, format],
  );
  // activePickerIndex for https://github.com/ant-design/ant-design/issues/22158
  const parsedStartText: string = startText
    ? dayjs(startText).format(genFormatText(dayjs(startText)))
    : '';
  const parsedEndText: string = endText
    ? dayjs(endText).format(genFormatText(dayjs(endText)))
    : '';

  if (mode === 'read') {
    const dom = (
      <div ref={ref}>
        <div>{parsedStartText || '-'}</div>
        <div>{parsedEndText || '-'}</div>
      </div>
    );
    if (render) {
      return render(text, { mode, ...fieldProps }, <span>{dom}</span>);
    }
    return dom;
  }
  if (mode === 'edit' || mode === 'update') {
    const momentValue = parseValueToDay(fieldProps.value) as dayjs.Dayjs;
    const dom = (
      <DateRangePicker
        placeholder="Pick dates range"
        value={value}
        onChange={setValue}
      />
      // <DatePicker.RangePicker
      //   ref={ref}
      //   format={format}
      //   showTime={showTime}
      //   placeholder={[
      //     intl.getMessage('tableForm.selectPlaceholder', '请选择'),
      //     intl.getMessage('tableForm.selectPlaceholder', '请选择'),
      //   ]}
      //   bordered={plain === undefined ? true : !plain}
      //   {...fieldProps}
      //   value={momentValue}
      // />
    );
    if (renderFormItem) {
      return renderFormItem(text, { mode, ...fieldProps }, dom);
    }
    return dom;
  }
  return null;
};

export default React.forwardRef(FieldRangePicker);
