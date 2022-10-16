import {
  Button,
  Container,
  Group,
  Modal,
  MultiSelect,
  Textarea,
  TextInput,
  useMantineTheme,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { FormInstance } from 'antd';
import { FC, useRef, useState } from 'react';

interface CreateRoleModalProps {
  row?: any;
  size?: any;
  id?: number;
  updateModal?: boolean;
}

const countriesData = [
  { label: 'United States', value: 'US' },
  { label: 'Great Britain', value: 'GB' },
  { label: 'Finland', value: 'FI' },
  { label: 'France', value: 'FR' },
  { label: 'Russia', value: 'RU' },
];

export const MemberModal: FC<CreateRoleModalProps> = function (props) {
  const ref = useRef<FormInstance>();

  const theme = useMantineTheme();
  const [opened, setOpen] = useState<boolean>(false);

  const form = useForm({
    initialValues: {
      name: '',
    },
    validate: {
      name: (value) => !/[^a-zA-Z0-9-_]/g.test(value),
    },
  });

  form.setFieldError('name', '不能包含除_-以外的特殊字符');

  return (
    <span>
      <Modal
        centered
        size="lg"
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
          <form onSubmit={form.onSubmit((values) => {})}>
            <Group grow>
              <TextInput
                my={15}
                variant="filled"
                label="账户"
                placeholder="请输入账户"
                {...form.getInputProps('name')}
                required
              />
              <TextInput
                my={15}
                variant="filled"
                label="角色"
                placeholder="请输入账户"
                {...form.getInputProps('name')}
                required
              />
            </Group>

            <Textarea label="描述" placeholder="请输入描述" />

            <MultiSelect
              my={15}
              data={countriesData}
              searchable
              defaultValue={['US', 'FI']}
              placeholder="请选择角色权限"
              label="权限"
            />

            <Group mt={80} grow>
              <Button
                onClick={() => setOpen(false)}
                variant="subtle"
                type="submit"
                color="gray"
              >
                取消
              </Button>
              <Button
                type="submit"
                variant="gradient"
                gradient={{ from: 'teal', to: 'lime', deg: 105 }}
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
        gradient={{ from: '#2193b0', to: '#6dd5ed', deg: 35 }}
      >
        添加
      </Button>
    </span>
  );
};
