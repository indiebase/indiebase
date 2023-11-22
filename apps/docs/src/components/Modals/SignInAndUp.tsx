import React, { FC, useState } from 'react';
import {
  Modal,
  Stack,
  Button,
  Image,
  useMantineTheme,
  Container,
  Divider,
  PasswordInput,
  TextInput,
  Text,
  ModalProps,
} from '@mantine/core';
import { useColorScheme } from '@mantine/hooks';
import { showNotification } from '@mantine/notifications';
import {
  IconX,
  IconMail,
  IconKey,
  IconBrandGithubFilled,
} from '@tabler/icons-react';
import { useForm } from '@mantine/form';
import isEmail from 'validator/lib/isEmail';

export const SignInAndUpModal: FC<ModalProps> = function (props) {
  const colorScheme = useColorScheme();
  const theme = useMantineTheme();

  const signUp = () => {
    const child = window.open(
      new URL('/v1/auth/oauth/github'),
      '_blank',
      'toolbar=yes, location=yes, directories=no, status=no, menubar=yes, scrollbars=yes, resizable=no, copyhistory=yes, width=500, height=500',
    );

    child.onunload = location.reload;
  };

  const [checked, setChecked] = useState(false);

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
    <Modal
      centered
      transitionProps={{
        transition: 'pop',
        duration: 200,
        timingFunction: 'ease',
      }}
      overlayProps={{
        backgroundOpacity: 0.55,
        blur: 3,
        color:
          colorScheme === 'dark' ? theme.colors.dark[9] : theme.colors.gray[2],
      }}
      opened={props.opened}
      onClose={props.onClose}
      withCloseButton={false}
      shadow="unset"
    >
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
            leftSection={<IconMail size={20} />}
            label="账户"
            {...form.getInputProps('username')}
            required
          />
          <PasswordInput
            my={15}
            variant="filled"
            placeholder="请输入密码"
            leftSection={<IconKey size={20} />}
            label="密码"
            {...form.getInputProps('password')}
            required
          />
          <Stack mt={30}>
            <Button type="submit">登录</Button>
            <Divider my="md" variant="dashed" />
            <Stack>
              <Text size="xs" c="gray">
                首次请使用依赖平台登录
              </Text>
              <Button
                variant="gradient"
                gradient={{ from: 'indigo', to: 'cyan' }}
                onClick={signUp}
              >
                <IconBrandGithubFilled width={19} />
                &nbsp;Github
                {/* <Image src="/github.svg" width={25} alt="github" /> */}
              </Button>
            </Stack>
          </Stack>
        </form>
      </Container>
    </Modal>
  );
};
