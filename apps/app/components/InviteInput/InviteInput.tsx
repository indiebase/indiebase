'use client';

import { Button, Group, useMantineTheme } from '@mantine/core';
import { IF, useProps } from 'reactgets';

import { MultiInput } from '../MultiInput';

const groceries = [
  {
    avatar: 'https://random.imagecdn.app/50/50',
    email: 'random',
    username: 'random',
    label: 'HanHan',
    value: 'hanhan',
  },
  {
    avatar: 'https://random.imagecdn.app/50/50',
    email: 'random',
    username: 'random',
    label: 'hanhan1hanhan2hanhan2hanhan2hanhan2hanhan2hanhan2',
    value: 'hanhan1',
  },
  {
    avatar: ' https://random.imagecdn.app/50/50',
    username: 'random',
    email: 'random',
    label: 'hanhan2hanhan2hanhan2hanhan2hanhan2hanhan2hanhan2',
    value: 'hanhan2',
  },
];

export interface InviteInputItem {
  value: string;
  label: string;
  leadingImage?: string;
  subLabel?: string;
  [key: string]: any;
}

export interface InviteInputProps {
  showInviteButton?: boolean;
}

const defaultInviteInputProps = {
  showInviteButton: false,
} satisfies InviteInputProps;

export function InviteInput(_props: InviteInputProps) {
  const theme = useMantineTheme();
  const { showInviteButton } = useProps(defaultInviteInputProps, _props);

  return (
    <Group gap={7} wrap="nowrap" align="flex-start">
      <MultiInput
        w="100%"
        placeholder="Invite members, search by username or email address ..."
        data={groceries.map((v) => ({
          leadingImage: v.avatar,
          value: v.value,
          label: v.label,
        }))}
      />
      <IF is={showInviteButton}>
        <Button
          size="md"
          variant="gradient"
          gradient={theme.other.gradients.peach}
        >
          Invite
        </Button>
      </IF>
    </Group>
  );
}
