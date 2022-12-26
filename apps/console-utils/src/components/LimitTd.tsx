import { Tooltip, Text } from '@mantine/core';
import { FC } from 'react';

interface LimitTdProps {
  content: string;
  lineClamp?: number;
}

export const LimitTd: FC<LimitTdProps> = function (props) {
  const { lineClamp, content } = props;
  return (
    <Tooltip label={content}>
      <Text lineClamp={lineClamp}>{content ? content : '-'}</Text>
    </Tooltip>
  );
};
LimitTd.defaultProps = {
  lineClamp: 1,
};
