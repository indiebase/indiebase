import { Tooltip } from 'antd';
import React, { FC } from 'react';

interface LimitTrProps {
  maxWidth?: number;
  content: string;
}

export const LimitTd: FC<LimitTrProps> = function (props) {
  const { maxWidth, content } = props;
  return (
    <Tooltip title={content}>
      <div
        style={{
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap',
          maxWidth: maxWidth,
          overflow: 'hidden',
        }}
      >
        {content ? content : '-'}
      </div>
    </Tooltip>
  );
};
