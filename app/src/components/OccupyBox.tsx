import React, { FC } from 'react';

interface OccupyBoxProps {
  width?: number | string;
  height?: number | string;
}

export const OccupyBox: FC<OccupyBoxProps> = function (props) {
  return <div style={{ width: props.width, height: props.height }}></div>;
};
