import {
  Popover,
  Stack,
  MantineColor,
  Text,
  Badge,
  Flex,
  useMantineTheme,
} from '@mantine/core';
import { FloatingPosition } from '@mantine/core/lib/Floating';
import { FC, PropsWithChildren } from 'react';
import { ProjectStatus } from '@indiebase/trait';
import { useDisclosure, useMediaQuery } from '@mantine/hooks';

export const statusPalette: Record<ProjectStatus, MantineColor> = {
  [ProjectStatus.archive]: 'gray',
  [ProjectStatus.closed]: 'pink',
  [ProjectStatus.operating]: 'blue',
  [ProjectStatus.poc]: 'cyan',
  [ProjectStatus.wip]: 'orange',
};

export const statusDescription: Record<ProjectStatus, MantineColor> = {
  [ProjectStatus.archive]: 'Project archived',
  [ProjectStatus.closed]: 'Project has been killed',
  [ProjectStatus.operating]: 'Operating and maintaining',
  [ProjectStatus.poc]: 'Proof of concept stage',
  [ProjectStatus.wip]: 'Working in progress',
};

interface StatusTipProps extends PropsWithChildren {
  position?: FloatingPosition;
  onHover?: (v: boolean) => void;
}

export const StatusTip: FC<StatusTipProps> = function ({
  children,
  position,
  onHover,
}) {
  const [opened, { close, open }] = useDisclosure(false);
  const theme = useMantineTheme();
  const matches = useMediaQuery(`(max-width: ${theme.breakpoints.sm}px)`);

  return (
    <Popover
      position={position}
      withArrow
      shadow="md"
      {...Object.assign({}, matches ? null : { opened: opened })}
    >
      <Popover.Target>
        <div
          {...Object.assign(
            {},
            matches
              ? null
              : {
                  onMouseEnter: () => {
                    open();
                    onHover?.(true);
                  },
                  onMouseLeave: () => {
                    close();
                    onHover?.(false);
                  },
                },
          )}
        >
          {children}
        </div>
      </Popover.Target>
      <Popover.Dropdown style={{ zIndex: 100 }}>
        <Stack spacing="xs">
          {Object.entries(statusPalette).map(([s, c], i) => {
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
                <Text ml="lg" color="gray" size="xs">
                  {statusDescription[s]}
                </Text>
              </Flex>
            );
          })}
        </Stack>
      </Popover.Dropdown>
    </Popover>
  );
};

StatusTip.defaultProps = {
  position: 'top',
};
