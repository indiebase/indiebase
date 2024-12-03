import { ProjectStatus } from '@indiebase/trait';
import {
  Badge,
  Flex,
  type FloatingPosition,
  HoverCard,
  type MantineColor,
  Stack,
  Text,
} from '@mantine/core';
import { type FC, type PropsWithChildren } from 'react';

export const projectStatusPalette: Record<ProjectStatus, MantineColor> = {
  [ProjectStatus.archive]: 'gray',
  [ProjectStatus.closed]: 'pink',
  [ProjectStatus.operating]: 'blue',
  [ProjectStatus.poc]: 'cyan',
  [ProjectStatus.wip]: 'orange',
};

export const projectStatusDescription: Record<ProjectStatus, MantineColor> = {
  [ProjectStatus.archive]: 'Project archived',
  [ProjectStatus.closed]: 'Project has been killed',
  [ProjectStatus.operating]: 'Operating and maintaining',
  [ProjectStatus.poc]: 'Proof of concept stage',
  [ProjectStatus.wip]: 'Working in progress',
};

export interface ProjectStatusTipProps extends PropsWithChildren {
  position?: FloatingPosition;
  onHover?: (v: boolean) => void;
}

export const ProjectStatusTip: FC<ProjectStatusTipProps> = function ({
  children,
  position,
}) {
  return (
    <HoverCard position={position} withArrow shadow="md" openDelay={400}>
      <HoverCard.Target>
        <Flex>{children}</Flex>
      </HoverCard.Target>
      <HoverCard.Dropdown style={{ zIndex: 100 }}>
        <Stack>
          {Object.entries(projectStatusPalette).map(([s, c], i) => {
            return (
              <Flex key={i} justify="space-between">
                <Badge
                  style={{ cursor: 'default' }}
                  size="xs"
                  color={c}
                  variant="light"
                >
                  {s}
                </Badge>
                {/* <ColorSwatch style={{ width: 8, height: 8 }} color={c} /> */}
                <Text ml="lg" c="gray" size="xs">
                  {projectStatusDescription[s]}
                </Text>
              </Flex>
            );
          })}
        </Stack>
      </HoverCard.Dropdown>
    </HoverCard>
  );
};
