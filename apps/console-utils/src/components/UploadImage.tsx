import { Text, Avatar, Box } from '@mantine/core';
import { IconBuildingCommunity } from '@tabler/icons';
import { FC, useState } from 'react';
import { uploadFile } from '../api/utils';
import { Dropzone, IMAGE_MIME_TYPE } from '@mantine/dropzone';

interface UploadImageProps {
  size?: number;
  src?: string;
  onChange(url: string): void;
  /**
   * Unit KB
   */
  limit?: number;

  label?: string;
}

export const UploadImage: FC<UploadImageProps> = function ({
  size,
  src,
  limit,
  label,
  onChange,
}) {
  const [url, setUrl] = useState<string>();
  const [errorMsg, setErrorMsg] = useState<string>();

  const handleChange = async function (files: File[]) {
    const file = files[0];
    setErrorMsg(null);
    if (file.size >= limit * 1024) {
      setErrorMsg('Image size out of size');
      return;
    }
    const formData = new FormData();
    formData.append('files', file, file.name);
    const result = await uploadFile(formData);
    if (result.code > 0) {
      setUrl(result.d);
      onChange?.(result.d);
    }
  };

  return (
    <Box ml={30} style={{ position: 'relative', top: 20, height: 100 }}>
      {label ? (
        <Text size="sm" color="#212529">
          {label}
        </Text>
      ) : null}
      <div style={{ display: 'inline-block' }}>
        <Dropzone
          mt={5}
          p={0}
          multiple={false}
          onDrop={handleChange}
          accept={IMAGE_MIME_TYPE}
        >
          <Avatar src={url ?? src} size={size}>
            <IconBuildingCommunity size={size / 2 - 5} />
          </Avatar>
        </Dropzone>
      </div>
      {errorMsg ? (
        <Text size="xs" c="red">
          {errorMsg}
        </Text>
      ) : null}
    </Box>
  );
};

UploadImage.defaultProps = {
  size: 60,
  limit: 2048,
};
