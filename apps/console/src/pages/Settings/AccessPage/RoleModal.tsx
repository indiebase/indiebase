import ProForm, {
  ModalForm,
  ProFormSwitch,
  ProFormText,
} from '@ant-design/pro-form';
import {
  Button,
  Checkbox,
  Container,
  Group,
  Modal,
  NumberInput,
  PasswordInput,
  TextInput,
  useMantineTheme,
} from '@mantine/core';
import { useForm } from '@mantine/hooks';
import { showNotification } from '@mantine/notifications';
import { IconChecks, IconMail, IconSend, IconSignature } from '@tabler/icons';
import { FormInstance } from 'antd';
import { FC, useRef, MutableRefObject, useState } from 'react';

interface CreateRoleModalProps {
  row?: any;
  size?: any;
  id?: number;
  updateModal?: boolean;
}

const isEmail = (value) =>
  /^[A-Za-z0-9]+([_\.][A-Za-z0-9]+)*@([A-Za-z0-9\-]+\.)+[A-Za-z]{2,6}$/.test(
    value,
  );

export const RoleModal: FC<CreateRoleModalProps> = function (props) {
  const ref = useRef<FormInstance>();

  const theme = useMantineTheme();
  const [opened, setOpen] = useState<boolean>(false);

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
      username: (value) => isEmail(value),
      password: (value) => value.length >= 8,
    },
    errorMessages: {
      nickname: '不能包含除_-以外的特殊字符',
      username: '邮箱地址格式不正确',
      password: '密码长度至少为8',
    },
  });

  return (
    <span>
      <Modal
        size="lg"
        centered
        overlayColor={
          theme.colorScheme === 'dark'
            ? theme.colors.dark[9]
            : theme.colors.gray[2]
        }
        overlayOpacity={0.3}
        overlayBlur={3}
        opened={opened}
        onClose={() => setOpen(false)}
        withCloseButton={false}
        shadow="unset"
        transition="rotate-left"
        transitionDuration={200}
        transitionTimingFunction="ease"
      >
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
              {...form.getInputProps('nickname')}
            />
            <TextInput
              variant="filled"
              placeholder="请输入邮箱地址"
              label="账户"
              {...form.getInputProps('username')}
              required
            />
            <PasswordInput
              my={15}
              variant="filled"
              placeholder="请输入密码"
              label="密码"
              {...form.getInputProps('password')}
              required
            />
            <PasswordInput
              variant="filled"
              placeholder="请再次确认密码"
              label="确认密码"
              {...form.getInputProps('confirmPassword')}
              required
            />
            <Group my={15} align="flex-end"></Group>

            <Group mt={20} grow>
              <Button variant="subtle" type="submit">
                取消
              </Button>
              <Button
                type="submit"
                variant="gradient"
                gradient={{ from: 'indigo', to: 'cyan' }}
              >
                确定
              </Button>
            </Group>
          </form>
        </Container>
      </Modal>
      <Button
        size="xs"
        onClick={() => {
          setOpen(true);
        }}
        variant="gradient"
        gradient={{ from: '#ed6ea0', to: '#ec8c69', deg: 35 }}
      >
        添加
      </Button>
    </span>
  );
};
