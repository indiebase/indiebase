import {
  useMantineTheme,
  Modal,
  ModalProps,
  Tabs,
  InputWrapper,
  TextInput,
} from '@mantine/core';
import { FC } from 'react';
import { IconAt, IconMail, IconUser } from '@tabler/icons';

const SignInTab = function () {
  return;
};

const SignUpTab = function () {
  return (
    <InputWrapper label="昵称">
      <TextInput variant="filled" icon={<IconMail size={20} />} />
    </InputWrapper>
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
