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
  const theme = useMantineTheme();
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

        <Group grow mt="lg">
          <Button
            key="cancel"
            variant="light"
            size="xs"
            onClick={() => {
              setOpened(false);
              onCancel?.();
            }}
          >
            Cancel
          </Button>

          <Button
            variant="gradient"
            gradient={theme.other.buttonGradient}
            key="confirm"
            size="xs"
            onClick={() => {
              setOpened(false);
              onConfirm();
            }}
          >
            Ok
          </Button>
        </Group>
      </Popover.Dropdown>
    </Popover>
  );
};
