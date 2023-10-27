import {
  useMantineTheme,
  Group,
  Button,
  MantineStyleSystemProps,
} from '@mantine/core';
import { FC } from 'react';

interface ConfirmButtonFooterProps extends MantineStyleSystemProps {
  onCancel?: () => void;
  onConfirm?: () => void;
  disabled?: boolean;
  type?: 'submit' | 'button' | 'reset';
}

export const ConfirmButtonFooter: FC<ConfirmButtonFooterProps> = function ({
  onCancel,
  onConfirm,
  disabled,
  type,
  ...rest
}) {
  const theme = useMantineTheme();
  return (
    <Group grow mt="lg" {...rest}>
      <Button
        key="clear"
        style={{
          visibility: onCancel ? 'visible' : 'hidden',
        }}
        variant="light"
        size="xs"
        disabled={disabled}
        onClick={onCancel}
      >
        Cancel
      </Button>

      <Button
        variant="gradient"
        type={type}
        style={{
          visibility:
            onConfirm || type === 'reset' || type === 'submit'
              ? 'visible'
              : 'hidden',
        }}
        gradient={theme.other.buttonGradient}
        key="confirm"
        size="xs"
        onClick={onConfirm}
        disabled={disabled}
      >
        Ok
      </Button>
    </Group>
  );
};

ConfirmButtonFooter.defaultProps = {
  type: 'button',
};
