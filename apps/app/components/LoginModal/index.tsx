import {
  useMantineTheme,
  Modal,
  ModalProps,
  Tabs,
  TextInput,
  Container,
  Group,
  Button,
  PasswordInput,
  NumberInput,
  Checkbox,
  Text,
} from '@mantine/core';
import { FC, useState } from 'react';
import {
  IconMail,
  IconSignature,
  IconKey,
  IconSend,
  IconChecks,
} from '@tabler/icons';
import { useForm } from '@mantine/hooks';
import { useTimer } from 'react-timer-hook';

const SignInTab = function () {
  return;
};

const CountDown = function (props) {
  const expiryTimestamp = new Date();
  expiryTimestamp.setSeconds(expiryTimestamp.getSeconds() + 60);

  const { seconds, isRunning, start } = useTimer({
    autoStart: false,
    expiryTimestamp,
    onExpire: () => {},
  });

  return (
    <Button
      variant="gradient"
      gradient={{ from: '#1155E9', to: '#2EC4FF', deg: 45 }}
      style={{ width: 70, color: '#fff' }}
      disabled={isRunning}
      onClick={() => {
        start();
      }}
    >
      {isRunning ? (seconds === 0 ? '' : seconds + 's') : '发送'}
    </Button>
  );
};

const SignUpTab = function () {
  const expiryTimestamp = new Date();
  expiryTimestamp.setSeconds(expiryTimestamp.getSeconds() + 60);
  const [checked, setChecked] = useState(false);

  const form = useForm({
    initialValues: {
      nickname: '',
      username: '',
      confirmPassword: '',
      password: '',
      captcha: 0,
    },
    validationRules: {
      nickname: (value) => !/[^a-zA-Z0-9-_]/g.test(value),
      username: (value) =>
        /^[A-Za-z0-9]+([_\.][A-Za-z0-9]+)*@([A-Za-z0-9\-]+\.)+[A-Za-z]{2,6}$/.test(
          value,
        ),
      password: (value) => value.length >= 8,
    },
    errorMessages: {
      nickname: '不能包含除_-以外的特殊字符',
      username: '邮箱地址格式不正确',
      password: '密码长度至少为8',
    },
  });
  return (
    <Container>
      <form
        onSubmit={form.onSubmit((values) => {
          console.log(values);
        })}
      >
        <TextInput
          my={15}
          variant="filled"
          label="昵称"
          placeholder="输入昵称（可选）"
          icon={<IconSignature size={20} />}
          {...form.getInputProps('nickname')}
        />
        <TextInput
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
        <PasswordInput
          variant="filled"
          placeholder="请再次确认密码"
          icon={<IconChecks size={20} />}
          label="确认密码"
          {...form.getInputProps('confirmPassword')}
          required
        />
        <Group my={15} align="flex-end">
          <NumberInput
            hideControls
            maxLength={4}
            style={{ width: 150 }}
            variant="filled"
            placeholder="请输入验证码"
            icon={<IconSend size={20} />}
            label="验证码"
            required
          />
          <CountDown />
        </Group>
        <Group mt={50} position="left" spacing={4}>
          <Checkbox
            size="xs"
            label="I agree to the letscollab "
            onChange={(event) => setChecked(event.currentTarget.checked)}
          />
          <Text
            variant="link"
            component="a"
            href="/privacy"
            size="xs"
            style={{ color: '#0077FF' }}
          >
            privacy
          </Text>
        </Group>
        <Group mt={10} grow>
          <Button type="submit">注册</Button>
          {/* <Button variant="white">取消</Button> */}
        </Group>
      </form>
    </Container>
  );
};

export const LoginModal: FC<ModalProps & { initialNo?: number }> = function (
  props,
) {
  const theme = useMantineTheme();

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
      <Tabs
        initialTab={props.initialNo}
        variant="pills"
        onTabChange={(tabIndex, tabKey) => {}}
      >
        <Tabs.Tab label="登录">Gallery tab content</Tabs.Tab>
        <Tabs.Tab label="注册">
          <SignUpTab />
        </Tabs.Tab>
      </Tabs>
    </Modal>
  );
};
