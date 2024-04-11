import { Avatar } from '@mantine/core';
import { AvatarGroupProps } from '@mantine/core/lib/Avatar/AvatarGroup/AvatarGroup';
import React, { FC } from 'react';

export interface LimitAvatarGroupProps extends AvatarGroupProps {
  limit?: number;
}

export const LimitAvatarGroup: FC<LimitAvatarGroupProps> = function (props) {
  const children = React.Children.toArray(props.children);

  return (
    <Avatar.Group {...props}>
      {children.length > props.limit
        ? children.splice(0, props.limit)
        : children}
      {children.length > props.limit && (
        <Avatar radius="xl" size="sm">
          +{children.length - props.limit}
        </Avatar>
      )}
    </Avatar.Group>
  );
};

LimitAvatarGroup.defaultProps = {
  limit: 9,
};
