'use client';
import {
  useMantineTheme,
  Modal,
  ModalProps,
  TextInput,
  Container,
  Text,
  Button,
  PasswordInput,
  Image,
  Stack,
  Divider,
  ScrollArea,
} from '@mantine/core';
import { FC, useState } from 'react';
import { IconMail, IconKey, IconX } from '@tabler/icons-react';
import { useForm } from '@mantine/form';
import { showNotification } from '@mantine/notifications';

const isEmail = (value) =>
  /^[A-Za-z0-9]+([_\.][A-Za-z0-9]+)*@([A-Za-z0-9\-]+\.)+[A-Za-z]{2,6}$/.test(
    value,
  );

const SignInTab = function () {
  const [checked, setChecked] = useState(false);

  const signUp = () => {
    const child = window.open(
      new URL('/v1/auth/oauth/github', process.env.NEXT_PUBLIC_API),
      '_blank',
      'toolbar=yes, location=yes, directories=no, status=no, menubar=yes, scrollbars=yes, resizable=no, copyhistory=yes, width=500, height=500',
    );

    if (child) {
      child.onunload = location.reload;
    }
  };

  const form = useForm({
    initialValues: {
      username: '',
      password: '',
    },
    validate: {
      username: (value) => (isEmail(value) ? null : '邮箱地址格式不正确'),
      password: (value) => (value.length >= 8 ? null : '密码长度至少为8'),
    },
  });

  return (
    <Container>
      <form
        onSubmit={form.onSubmit(() => {
          if (!checked) {
            showNotification({
              message: 'Please agree to the privacy policy',
              color: 'red',
              icon: <IconX size={18} />,
            });
            return;
          }
        })}
      >
        <TextInput
          my={15}
          variant="filled"
          placeholder="请输入邮箱地址"
          icon={<IconMail size={20} />}
          label="账户"
          {...form.getInputProps('username')}
          required
        />
        <PasswordInput
          my={15}
          variant="filled"
          placeholder="请输入密码"
          icon={<IconKey size={20} />}
          label="密码"
          {...form.getInputProps('password')}
          required
        />
        <Stack mt={30}>
          <Button type="submit">登录</Button>
          <Divider my="md" variant="dashed" />
          <Stack>
            <Text size="xs" color="gray">
              首次请使用依赖平台登录
            </Text>
            <Button
              variant="gradient"
              gradient={{ from: 'indigo', to: 'cyan' }}
              onClick={signUp}
            >
              Github &nbsp;&nbsp;
              <Image src="/github.svg" width={25} alt="github" />
            </Button>
          </Stack>
        </Stack>
      </form>
    </Container>
  );
};

/**
 * @deprecated
 */
export const LoginModalV2: FC<ModalProps & { initialNo?: number }> = function (
  props,
) {
  const theme = useMantineTheme();

  const signUp = () => {
    const child = window.open(
      new URL('/v1/auth/oauth/github', process.env.NEXT_PUBLIC_API),
      '_blank',
      'toolbar=yes, location=yes, directories=no, status=no, menubar=yes, scrollbars=yes, resizable=no, copyhistory=yes, width=500, height=500',
    );

    if (child) child.onunload = location.reload;
  };

  return (
    <Modal
      centered
      overlayProps={{
        opacity: 0.55,
        blur: 3,
        color:
          theme.colorScheme === 'dark'
            ? theme.colors.dark[9]
            : theme.colors.gray[2],
      }}
      opened={props.opened}
      onClose={props.onClose}
      withCloseButton={false}
      shadow="unset"
      transitionProps={{
        transition: 'rotate-left',
        duration: 200,
        timingFunction: 'ease',
      }}
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

export const LoginModal: FC<ModalProps & { initialNo?: string }> = function (
  props,
) {
  const theme = useMantineTheme();

  return (
    <Modal
      centered
      overlayProps={{
        opacity: 0.55,
        blur: 3,
        color:
          theme.colorScheme === 'dark'
            ? theme.colors.dark[9]
            : theme.colors.gray[2],
      }}
      opened={props.opened}
      onClose={props.onClose}
      withCloseButton={false}
      shadow="unset"
      transitionProps={{
        transition: 'pop-top-right',
        duration: 200,
        timingFunction: 'ease',
      }}
    >
      <SignInTab />
    </Modal>
  );
};
