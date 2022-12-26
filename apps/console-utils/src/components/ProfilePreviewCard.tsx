import { Tooltip, Text } from '@mantine/core';
import { FC } from 'react';

interface ProfilePreviewCardProps {
  content: string;
  lineClamp?: number;
}

export const ProfilePreviewCard: FC<ProfilePreviewCardProps> = function (
  props,
) {
  const { lineClamp, content } = props;
  return (
    <Tooltip label={content}>
      <Text lineClamp={lineClamp}>{content ? content : '-'}</Text>
    </Tooltip>
  );
};
ProfilePreviewCard.defaultProps = {
  lineClamp: 1,
};
