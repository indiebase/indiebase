import {
  useMantineTheme,
  Modal,
  ModalProps,
  Button,
  Image,
  Stack,
} from '@mantine/core';
import { FC, useCallback } from 'react';
import * as url from 'url';

export const LoginModalV2: FC<ModalProps & { initialNo?: number }> = function (
  props,
) {
  const theme = useMantineTheme();

  const signUp = () => {
    window.open(
      new URL('/v1/auth/oauth/github', process.env.NEXT_PUBLIC_API),
      '_blank',
      'toolbar=yes, location=yes, directories=no, status=no, menubar=yes, scrollbars=yes, resizable=no, copyhistory=yes, width=500, height=500',
    );
    // console.log(process.env.NEXT_PUBLIC_API);
  };

  return (
    <Modal
      centered
      overlayColor={
        theme.colorScheme === 'dark'
          ? theme.colors.dark[9]
          : theme.colors.gray[2]
      }
      overlayOpacity={0.55}
      overlayBlur={3}
      opened={props.opened}
      onClose={props.onClose}
      withCloseButton={false}
      shadow="unset"
      transition="rotate-left"
      transitionDuration={200}
      transitionTimingFunction="ease"
    >
      <Stack>
        <Button
          onClick={signUp}
          variant="gradient"
          gradient={{ from: 'black', to: 'gray' }}
        >
          Sign In&Up&nbsp;&nbsp;
          <Image src="/github.svg" width={25} alt="github" />
        </Button>
      </Stack>
    </Modal>
  );
};
