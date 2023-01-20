import type { FormProps } from 'antd';
import { Form } from 'antd';
import React from 'react';
import type { CommonFormProps } from '../../BaseForm';
import { BaseForm } from '../../BaseForm';
import { Group, ProFormItem } from '../../components';

export type ProFormProps<T = Record<string, any>> = Omit<FormProps<T>, 'onFinish'> &
  CommonFormProps<T>;

function ProForm<T = Record<string, any>>(
  props: ProFormProps<T> & {
    children?: React.ReactNode | React.ReactNode[];
  },
) {
  return (
    <BaseForm
      layout="vertical"
      submitter={{
        // 反转按钮，在正常模式下，按钮应该是主按钮在前
        render: (_, dom) => dom.reverse(),
      }}
      contentRender={(items, submitter) => {
        return (
          <>
            {items}
            {submitter}
          </>
        );
      }}
      {...props}
    />
  );
}

ProForm.Group = Group;
ProForm.useForm = Form.useForm;
ProForm.Item = ProFormItem;
ProForm.useWatch = Form.useWatch;
ProForm.ErrorList = Form.ErrorList;
ProForm.Provider = Form.Provider;
ProForm.useFormInstance = Form.useFormInstance;

export { ProForm };
