import {
  Text,
  Avatar,
  Box,
  Modal,
  useMantineTheme,
  Group,
  Button,
  ActionIcon,
  rem,
  Flex,
} from '@mantine/core';
import { IconBuildingCommunity, IconX } from '@tabler/icons-react';
import { FC, useCallback, useState, ReactElement, createRef } from 'react';
// import { uploadFile } from '../api/utils';
import { Dropzone, IMAGE_MIME_TYPE } from '@mantine/dropzone';
import { useColorScheme } from '@mantine/hooks';
import Cropper, { ReactCropperElement } from 'react-cropper';
import 'cropperjs/dist/cropper.css';

interface AvatarEditorProps {
  size?: number;
  src?: string;
  onChange?: (url: string) => void;
  /**
   * Unit KB
   */
  limit?: number;
  croppable?: boolean;
  clearable?: boolean;
  title?: string;
  label?: string;
  bucket?: string;
  icon?: (size: number) => ReactElement;
  onUpload?: () => void;
  confirmText?: string;
}

export const AvatarEditor: FC<AvatarEditorProps> = function ({
  size,
  src,
  limit,
  label,
  croppable,
  clearable,
  title,
  confirmText,
  icon,
}) {
  const [cropped, setCropped] = useState<Blob>();
  const [url, setUrl] = useState<string | null>();
  const [errorMsg, setErrorMsg] = useState<string | null>();
  const [opened, setOpened] = useState(false);
  const theme = useMantineTheme();
  const colorScheme = useColorScheme();
  const cropperRef = createRef<ReactCropperElement>();

  const [originalImg, setOriginalImage] = useState<{
    file: File | null;
    url: string | null;
  }>({
    file: null,
    url: null,
  });

  const upload = async function (file: File, blob?: Blob) {
    const formData = new FormData();
    formData.append('files', blob ?? file, file.name);
    // const result = await uploadFile(formData, bucket);
    // if (result.code > 0) {
    //   setUrl(result.d);
    //   onChange?.(result.d);
    // }
  };

  const handleChange = async function (files: File[]) {
    const file = files[0];
    setErrorMsg(null);
    if (file.size >= limit! * 1024) {
      setErrorMsg('Image size out of size');
      return;
    }

    if (croppable) {
      setOriginalImage({
        file,
        url: URL.createObjectURL(file),
      });
    } else {
      await upload(file);
    }
    setOpened(true);
  };

  const handleCrop = useCallback(async () => {
    // setCropped(imgBlob);
    // setUrl(URL.createObjectURL(imgBlob));
    // await upload(originalImg.file!, imgBlob);
    setOpened(false);
  }, []);

  return (
    <Box ml={30} style={{ position: 'relative', top: 20, height: 100 }}>
      {label ? (
        <Text size="sm" c="#212529">
          {label}
        </Text>
      ) : null}
      <div style={{ display: 'inline-block', position: 'relative' }}>
        {clearable && url && (
          <ActionIcon
            size="xs"
            variant="light"
            color="red"
            style={{
              position: 'absolute',
              top: -2,
              right: -7,
              zIndex: 1,
              borderRadius: 10,
            }}
            onClick={() => {
              setUrl(null);
            }}
          >
            <IconX size={14} />
          </ActionIcon>
        )}
        <Dropzone
          mt={5}
          p={0}
          multiple={false}
          onDrop={handleChange}
          accept={IMAGE_MIME_TYPE}
        >
          <Avatar src={url ?? src} size={size}>
            {icon?.(size!)}
          </Avatar>
        </Dropzone>
      </div>
      {croppable && (
        <Modal
          size="lg"
          transitionProps={{
            transition: 'pop',
            duration: 200,
            timingFunction: 'ease',
          }}
          overlayProps={{
            backgroundOpacity: 0.55,
            blur: 3,
            color:
              colorScheme === 'dark'
                ? theme.colors.dark[9]
                : theme.colors.gray[2],
          }}
          opened={opened}
          onClose={() => setOpened(false)}
          title={title}
        >
          <Flex>
            <Cropper
              ref={cropperRef}
              aspectRatio={1}
              center={true}
              preview=".avatar-editor-preview"
              style={{ minWidth: rem(400), minHeight: rem(400) }}
              data={{ width: 200, height: 200 }}
              src={originalImg.url!}
              viewMode={1}
              minCropBoxHeight={10}
              minCropBoxWidth={10}
              responsive={true}
              autoCropArea={1}
              movable={true}
              checkOrientation={false}
              guides={false}
            />
            <Box
              ml={15}
              miw={100}
              mih={100}
              className="avatar-editor-preview"
              style={{ overflow: 'hidden', borderRadius: 1000 }}
            />
          </Flex>
          <Group justify="center">
            <Button
              onClick={handleCrop}
              mt={40}
              variant="gradient"
              size="md"
              type="submit"
              style={{ width: '100%', height: 36 }}
              gradient={theme.other.peachGradient}
            >
              {confirmText}
            </Button>
          </Group>
        </Modal>
      )}
      {errorMsg ? (
        <Text size="xs" c="red">
          {errorMsg}
        </Text>
      ) : null}
    </Box>
  );
};

AvatarEditor.defaultProps = {
  size: 60,
  limit: 2048,
  croppable: false,
  title: 'Crop Image',
  icon: (size) => <IconBuildingCommunity size={size / 2 - 5} />,
  bucket: 'indiebase-community',
  confirmText: 'Crop',
};
