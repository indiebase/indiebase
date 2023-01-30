import { ProjectStatus } from '@letscollab-nest/trait';
import { MantineColor } from '@mantine/core';

export const getStatusColor = function (status: ProjectStatus) {
  let color: MantineColor;
  switch (status) {
    case ProjectStatus.archive:
      color = 'gray';
      break;
    case ProjectStatus.closed:
      color = 'pink';
      break;
    case ProjectStatus.operating:
      color = 'blue';
      break;
    case ProjectStatus.poc:
      color = 'cyan';
      break;
    case ProjectStatus.wip:
      color = 'orange';
      break;
  }
  return color;
};
