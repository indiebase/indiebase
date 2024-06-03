import { Avatar, HoverCard, Text } from '@mantine/core';
import { IconUser } from '@tabler/icons-react';
import { type FC, type PropsWithChildren } from 'react';

export interface ProfilePreviewCardProps extends PropsWithChildren {
  src?: string;
  href?: string;
}

export const ProfilePreviewCard: FC<ProfilePreviewCardProps> = function ({
  children,
  src,
}) {
  return (
    <HoverCard width={300} position="top" withArrow shadow="md">
      <HoverCard.Target>
        <div>{children}</div>
      </HoverCard.Target>
      <HoverCard.Dropdown style={{ zIndex: 1e3 }}>
        <div>status</div>
        <Avatar m={0} src={src} style={{ border: 'none' }} size="lg">
          <IconUser size={24} />
        </Avatar>

        <Text size="sm">
          This HoverCard is shown when user hovers the target element
        </Text>
      </HoverCard.Dropdown>
    </HoverCard>
  );
};
