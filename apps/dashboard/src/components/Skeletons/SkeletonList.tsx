import { Skeleton, SkeletonProps } from '@mantine/core';
import { FC } from 'react';

interface SkeletonListProps {
  count?: number;
  ip?: SkeletonProps;
}

export const SkeletonList: FC<SkeletonListProps> = function (props) {
  const { count, ip } = props;

  return Array(count)
    .fill(0)
    .map((_, index) => <Skeleton key={index} {...ip} />);
};

SkeletonList.defaultProps = {
  count: 5,
  ip: {
    h: 28,
    animate: false,
    mt: 'sm',
  },
};
