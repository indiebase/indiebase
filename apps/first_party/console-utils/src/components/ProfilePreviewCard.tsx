import { Text, type AvatarProps, Avatar, HoverCard } from '@mantine/core';
import { FC, PropsWithChildren } from 'react';
import { IconUser } from '@tabler/icons';
import { PolymorphicComponentProps } from '@mantine/utils';

interface ProfilePreviewCardProps extends PropsWithChildren {}
interface AvatarWithPreviewProps
  extends PolymorphicComponentProps<'a', AvatarProps> {}

export const ProfilePreviewCard: FC<ProfilePreviewCardProps> = function (
  props,
) {
  return (
    <HoverCard width={200} position="top" withArrow closeDelay={10} shadow="md">
      <HoverCard.Target>
        <div>{props.children}</div>
      </HoverCard.Target>
      <HoverCard.Dropdown style={{ zIndex: 10000 }}>
        <div>status</div>
        <Avatar
          ml={0}
          src="https://images.opencollective.com/kingwl/1240df1/avatar.png"
          size="lg"
        >
          <IconUser size={24} />
        </Avatar>

        <Text size="sm">
          This HoverCard is shown when user hovers the target element
        </Text>
      </HoverCard.Dropdown>
    </HoverCard>
  );
};

export const AvatarWithPreview: FC<AvatarWithPreviewProps> = function (props) {
  return (
    <ProfilePreviewCard>
      <Avatar {...props}>
        <IconUser size={14} />
      </Avatar>
    </ProfilePreviewCard>
  );
};
