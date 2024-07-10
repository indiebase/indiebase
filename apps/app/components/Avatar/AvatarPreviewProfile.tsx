'use client';

import {
  Avatar,
  type AvatarProps,
  type PolymorphicComponentProps,
} from '@mantine/core';
import { IconUser } from '@tabler/icons-react';
import { type FC, type PropsWithChildren } from 'react';

import { ProfilePreviewCard } from '../Profile';

export interface AvatarPreviewProfileProps extends PropsWithChildren {
  avatar: PolymorphicComponentProps<'a', AvatarProps>;
  src?: string;
  href?: string;
}

export const AvatarPreviewProfile: FC<AvatarPreviewProfileProps> = function ({
  avatar,
  src,
  href,
}) {
  return (
    <ProfilePreviewCard src={src} href={href}>
      <Avatar {...avatar} src={src} href={href}>
        <IconUser size={14} />
      </Avatar>
    </ProfilePreviewCard>
  );
};
