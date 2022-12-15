import { PrjStatus } from '@letscollab-nest/trait';
import { MantineColor } from '@mantine/core';

export const getStatusColor = function (status: PrjStatus) {
  let color: MantineColor;
  switch (status) {
    case PrjStatus.archive:
      color = 'gray';
      break;
    case PrjStatus.closed:
      color = 'pink';
      break;
    case PrjStatus.operating:
      color = 'blue';
      break;
    case PrjStatus.poc:
      color = 'cyan';
      break;
    case PrjStatus.wip:
      color = 'orange';
      break;
  }
  return color;
};
