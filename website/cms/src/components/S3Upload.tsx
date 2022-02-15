import { GlobalContext } from '@/provider';
import { ProFormUploadButton } from '@ant-design/pro-form';
import { message } from 'antd';
import { NamePath } from 'antd/lib/form/interface';
import { UploadChangeParam } from 'antd/lib/upload';
import { FC, useContext } from 'react';

export interface S3UploadProps {
  max?: number & NamePath;
  name?: string;
  label?: string;
  forceImage?: boolean;
  maxSize?: number;
  initialValue?: any;
  onChange?: (info: UploadChangeParam) => void;
  [k: string]: any;
}

export const S3Upload: FC<S3UploadProps> = function (props) {
  const ctx = useContext(GlobalContext);

  return (
    <ProFormUploadButton
      initialValue={props.initialValue}
      name={props.name}
      label={props.label}
      max={props.max}
      fieldProps={{
        name: 'file',
        listType: 'picture-card',
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${ctx.user.j_ac}`,
        },
        onRemove(file) {
          console.log(file);
          return true;
        },
        beforeUpload(file) {
          const isJpgOrPng =
            (file.type === 'image/jpeg' || file.type === 'image/png') &&
            props.forceImage;
          if (!isJpgOrPng) {
            message.error('只支持 JPG/PNG 图片格式');
          }
          const isLt = file.size / 1024 / 1024 < props.maxSize;
          if (!isLt) {
            message.error('图片大小需要小于 3MB!');
          }
          return isJpgOrPng && isLt;
        },
        onChange(info) {
          console.log(info);
          if (info.file.response?.code < 0) {
            message.error('上传失败');
          }
          props.onChange(info);
        },
      }}
      action={`${process.env.REACT_APP_SJTU_MGMT_API}/v1/obs/upload`}
    />
  );
};

S3Upload.defaultProps = {
  forceImage: false,
  maxSize: 3,
};
