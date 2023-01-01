import { Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { projectsQuery } from '@letscollab-community/console-utils';
import {
  Button,
  Container,
  Divider,
  PasswordInput,
  Stack,
  TextInput,
  Image,
  Text,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { useQuery } from '@tanstack/react-query';
import { showNotification } from '@mantine/notifications';
import { IconX, IconMail, IconKey } from '@tabler/icons';
import { isEmail } from '../../utils';

export const SignIn = function () {
  const { data } = useQuery(['own-projects'], projectsQuery, {
    suspense: true,
  });

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

  const signUp = () => {
    const child = window.open(
      new URL('/v1/auth/oauth/github', process.env.REACT_APP_API),
      '_blank',
      'toolbar=yes, location=yes, directories=no, status=no, menubar=yes, scrollbars=yes, resizable=no, copyhistory=yes, width=500, height=500',
    );

    child.onunload = location.reload;
  };

  return (
    <Container>
      <form
        onSubmit={form.onSubmit(() => {
          // if (!checked) {
          //   return;
          // }
          showNotification({
            message: 'Please agree to the privacy policy',
            color: 'red',
            icon: <IconX size={18} />,
          });
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

export const SignInPage = function () {
  return (
    <ErrorBoundary fallbackRender={() => <div>Error</div>}>
      <Suspense>
        <SignIn />
      </Suspense>
    </ErrorBoundary>
  );
};
