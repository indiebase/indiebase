import {
  Text,
  Avatar,
  Box,
  Modal,
  useMantineTheme,
  Group,
  Button,
  ActionIcon,
} from '@mantine/core';
import { IconBuildingCommunity, IconX } from '@tabler/icons-react';
import { FC, useCallback, useState, ReactElement } from 'react';
// import { uploadFile } from '../api/utils';
import { Dropzone, IMAGE_MIME_TYPE } from '@mantine/dropzone';
import Cropper from 'react-easy-crop';
import { useColorScheme } from '@mantine/hooks';

interface UploadImageProps {
  size?: number;
  src?: string;
  onChange?: (url: string) => void;
  /**
   * Unit KB
   */
  limit?: number;
  croppable?: boolean;
  clearable?: boolean;
  cropProps?: {
    title?: string;
  };
  label?: string;
  bucket?: string;
  icon?: (size: number) => ReactElement;
  onUpload?: () => void;
}

const createImage = (url: string) =>
  new Promise<HTMLImageElement>((resolve, reject) => {
    const image = new Image();
    image.addEventListener('load', () => resolve(image));
    image.addEventListener('error', (error) => reject(error));
    image.setAttribute('crossOrigin', 'anonymous'); // needed to avoid cross-origin issues on CodeSandbox
    image.src = url;
  });

/**
 * This function was adapted from the one in the ReadMe of https://github.com/DominicTobias/react-image-crop
 * @param {File} image - Image File url
 * @param {Object} pixelCrop - pixelCrop Object provided by react-easy-crop
 */
async function getCroppedImg(imageSrc: string, pixelCrop: any): Promise<Blob> {
  const image = await createImage(imageSrc);
  const canvas = document.createElement('canvas');
  canvas.width = pixelCrop.width;
  canvas.height = pixelCrop.height;
  const ctx = canvas.getContext('2d')!;

  ctx.fillStyle = '#ffffff';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(
    image,
    pixelCrop.x,
    pixelCrop.y,
    pixelCrop.width,
    pixelCrop.height,
    0,
    0,
    pixelCrop.width,
    pixelCrop.height,
  );

  // As Base64 string
  // return canvas.toDataURL('image/png');

  // As a blob
  return new Promise((resolve, _) => {
    canvas.toBlob((file) => {
      resolve(file!);
    }, 'image/png');
  });
}

export const UploadImageZone: FC<UploadImageProps> = function ({
  size,
  src,
  limit,
  label,
  croppable,
  clearable,
  cropProps,
  onChange,
  icon,
  bucket,
}) {
  const [cropped, setCropped] = useState<Blob>();
  const [url, setUrl] = useState<string | null>();
  const [errorMsg, setErrorMsg] = useState<string | null>();
  const [opened, setOpened] = useState(false);
  const theme = useMantineTheme();
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
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

  const colorScheme = useColorScheme();

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

  const onCropComplete = async (_: any, croppedAreaPixels: any) => {
    const u = await getCroppedImg(originalImg.url!, croppedAreaPixels);
    setCropped(u);
  };

  const handleCrop = useCallback(async () => {
    await upload(originalImg.file!, cropped);
    setOpened(false);
  }, [cropped, opened]);

  return (
    <Box ml={30} style={{ position: 'relative', top: 20, height: 100 }}>
      {label ? (
        <Text size="sm" color="#212529">
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
          transitionProps={{
            transition: 'pop',
            duration: 200,
            timingFunction: 'ease',
          }}
          overlayProps={{
            opacity: 0.5,
            blur: 3,
            color:
              colorScheme === 'dark'
                ? theme.colors.dark[9]
                : theme.colors.gray[2],
          }}
          opened={opened}
          onClose={() => setOpened(false)}
          title={cropProps?.title}
        >
          <Box style={{ position: 'relative', width: 400, height: 400 }}>
            <Cropper
              style={{
                cropAreaStyle: {
                  color: '#0000004d',
                },
              }}
              objectFit="contain"
              minZoom={0.3}
              restrictPosition={false}
              cropSize={{ width: 200, height: 200 }}
              image={originalImg.url!}
              crop={crop}
              zoom={zoom}
              aspect={1}
              onCropChange={setCrop}
              onCropComplete={onCropComplete}
              onZoomChange={setZoom}
            />
          </Box>
          <Group justify="center">
            <Button
              onClick={handleCrop}
              mt={40}
              variant="gradient"
              size="md"
              type="submit"
              style={{ width: '100%', height: 36 }}
              gradient={theme.other.buttonGradient}
            >
              Crop
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

UploadImageZone.defaultProps = {
  size: 60,
  limit: 2048,
  croppable: false,
  cropProps: {
    title: 'Crop Image',
  },
  icon: (size) => <IconBuildingCommunity size={size / 2 - 5} />,
  bucket: 'indiebase-community',
};
