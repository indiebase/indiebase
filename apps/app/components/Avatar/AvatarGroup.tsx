import { Avatar, type AvatarGroupProps } from '@mantine/core';
import React, { type FC } from 'react';
import { useProps } from 'reactgets';

export interface LimitAvatarGroupProps extends AvatarGroupProps {
  limit?: number;
}

const avatarGroupDefaultProps = {
  limit: 9,
};

export const AvatarGroup: FC<LimitAvatarGroupProps> = function (_props) {
  const props = useProps(avatarGroupDefaultProps, _props);
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
