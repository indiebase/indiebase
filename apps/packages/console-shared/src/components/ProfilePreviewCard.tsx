import { Text, type AvatarProps, Avatar, HoverCard } from '@mantine/core';
import { FC, PropsWithChildren } from 'react';
import { IconUser } from '@tabler/icons';
import { PolymorphicComponentProps } from '@mantine/utils';

interface ProfilePreviewCardProps extends PropsWithChildren {
  src?: string;
  href?: string;
}
interface AvatarWithPreviewProps extends PropsWithChildren {
  avatar: PolymorphicComponentProps<'a', AvatarProps>;
  src?: string;
  href?: string;
}

export const ProfilePreviewCard: FC<ProfilePreviewCardProps> = function ({
  children,
  src,
}) {
  return (
    <HoverCard position="top" withArrow closeDelay={100000} shadow="md">
      <HoverCard.Target>
        <div>{children}</div>
      </HoverCard.Target>
      <HoverCard.Dropdown style={{ zIndex: 1000 }}>
        <div>status</div>
        <Avatar m={0} src={src} style={{ border: 'none' }} size="lg">
          <IconUser size={24} />
        </Avatar>

        <Text size="sm" style={{ width: 250 }}>
          This HoverCard is shown when user hovers the target element
        </Text>
      </HoverCard.Dropdown>
    </HoverCard>
  );
};

export const AvatarWithPreview: FC<AvatarWithPreviewProps> = function ({
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
