import { PrjStatus } from '@letscollab/app-utils';
import { MantineColor } from '@mantine/core';

export const getStatusColor = function (status: PrjStatus) {
  let color: MantineColor;
  switch (status) {
    case PrjStatus.archive:
      color = 'grey';
      break;
    case PrjStatus.closed:
      color = 'pink';
      break;
    case PrjStatus.open:
      color = 'blue';
      break;
    case PrjStatus.wip:
      color = 'orange';
      break;
    default:
      color = 'blue';
  }
  return color;
};
