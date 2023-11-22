import {
  Tooltip,
  Text,
  Button,
  Popover,
  Group,
  useMantineTheme,
  DefaultMantineColor,
  ButtonProps,
} from '@mantine/core';
import { FC, PropsWithChildren, useState } from 'react';
import { ConfirmButtonFooter } from './ConfirmButtonFooter';

interface ConfirmButtonProps extends PropsWithChildren, ButtonProps {
  label?: string;
  content?: string;
  onConfirm(): void;
  onCancel?: () => void;
  color?: DefaultMantineColor;
}

export const ConfirmButton: FC<ConfirmButtonProps> = function ({
  children,
  content,
  onConfirm,
  onCancel,
  ...rest
}) {
  const [opened, setOpened] = useState(false);
  return (
    <Popover
      styles={{ dropdown: { minWidth: 230 } }}
      withArrow
      opened={opened}
      onChange={setOpened}
      position="top"
    >
      <Popover.Target>
        <Button {...rest} onClick={() => setOpened((o) => !o)}>
          {children}
        </Button>
      </Popover.Target>
      <Popover.Dropdown>
        <Text size="sm">{content}</Text>

        <ConfirmButtonFooter
          onCancel={() => {
            setOpened(false);
            onCancel?.();
          }}
          onConfirm={() => {
            setOpened(false);
            onConfirm();
          }}
        />
      </Popover.Dropdown>
    </Popover>
  );
};
