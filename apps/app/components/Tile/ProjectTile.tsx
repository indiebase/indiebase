'use client';

import './ProjectTile.module.css';

import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import {
  Anchor,
  AvatarGroup,
  Badge,
  Box,
  Center,
  Group,
  Text,
} from '@mantine/core';
import {
  IconArrowNarrowUp,
  IconUser,
  IconUsers,
  IconWallet,
} from '@tabler/icons-react';
import Link from 'next/link';
import { type FC, memo, type ReactElement, useEffect, useState } from 'react';

import { AvatarPreviewProfile } from '../Avatar';
import { BoxEx } from '../BoxEx';
import { projectStatusPalette, ProjectStatusTip } from '../Tips';
import classes from './ProjectTile.module.css';

export interface PinnedProjectCardProps extends Partial<any> {
  hiddenCover?: boolean;
  hiddenMember?: boolean;
  actions?: ReactElement;
}

interface DeltaDataProps {
  users: number;
  usersDelta?: number;
  revenue: number;
  revenueDelta?: number;
}

const DeltaData: FC<DeltaDataProps> = function () {
  return (
    <Group mt={5} h={40}>
      <Group>
        <Group gap={0}>
          <IconUsers size={13} />
          <Text ml={3} lineClamp={1} fz={11}>
            1011231211
          </Text>
        </Group>
        <Group ml={3} gap={0}>
          <IconArrowNarrowUp size={12} color="green" />
          <Text c="green" fz={11} lineClamp={1}>
            0
          </Text>
        </Group>
      </Group>

      <Group>
        <Group gap={0}>
          <IconWallet size={14} />
          <Text ml={3} lineClamp={1} fz={11}>
            {new Intl.NumberFormat('en-US', {
              style: 'currency',
              currency: 'USD',
            }).format(1000)}
          </Text>
        </Group>
        <Group gap={0} ml={3}>
          <IconArrowNarrowUp size={12} color="green" />
          <Text c="green" fz={11} lineClamp={1}>
            0
          </Text>
        </Group>
      </Group>
    </Group>
  );
};

export const ProjectTile: FC<PinnedProjectCardProps> = memo(function (props) {
  const { id, hiddenMember, actions } = props;

  const [isHover, setHover] = useState(false);

  const {
    active,
    attributes,
    isDragging,
    isSorting,
    listeners,
    overIndex,
    setNodeRef,
    setActivatorNodeRef,
    transform,
    transition,
  } = useSortable({
    id,
  });

  useEffect(() => {
    if (!isDragging) {
      return;
    }
    document.body.style.cursor = 'grabbing';

    return () => {
      document.body.style.cursor = '';
    };
  }, [isDragging]);

  // console.log(matches);

  console.log(transform, transition);

  return (
    <BoxEx
      p={5}
      m={6}
      style={{
        borderRadius: 'var(--mantine-radius-default)',
        // Child above parent of the layer.
        zIndex: isDragging ? 999 : isHover ? 300 : 0,
        opacity: isDragging ? 0.8 : 1,
        transform: CSS.Transform.toString(transform),
        transition,
      }}
      bd="1px solid gray.3"
      ref={setNodeRef}
      p={5}
      m={6}
      {...attributes}
    >
      <BoxEx.Foreground className={classes.foreground}>
        <Center className={classes.dragHandle} h={16}>
          <Box {...listeners} ref={setActivatorNodeRef} />
        </Center>
        <Group justify="space-between" mb={0} mt={4}>
          <Anchor
            href={props.name}
            component={Link}
            size="sm"
            c="blue"
            fw="bolder"
          >
            {props.name}
          </Anchor>

          <ProjectStatusTip onHover={setHover}>
            <Badge
              style={{ cursor: 'default' }}
              size="sm"
              color={projectStatusPalette[props.status]}
              variant="light"
            >
              {props.status}
            </Badge>
          </ProjectStatusTip>
        </Group>
        <DeltaData users={1} revenue={1} />
        <Box>
          <Text lineClamp={2} mt={10} fz={11} c="gray.6">
            {props.description}
          </Text>
        </Box>
        <Group mt={9} justify="space-between">
          {!hiddenMember &&
            (props.members.length < 1 ? (
              <Box h={26} />
            ) : (
              <AvatarGroup ml={-2} spacing="xs">
                {props.members.map((u, i) => {
                  return (
                    <AvatarPreviewProfile
                      key={i}
                      avatar={{
                        radius: 'xl',
                        size: 'sm',
                        component: 'a',
                      }}
                      src={u.avatar}
                      href={u.profileUrl}
                    >
                      <IconUser size={14} />
                    </AvatarPreviewProfile>
                  );
                })}
              </AvatarGroup>
            ))}
          {actions && <Center>{actions}</Center>}
        </Group>
      </BoxEx.Foreground>
      <BoxEx.Background className={classes.background}>
        <Box data-shape-triangle />
        <Box data-shape-circle />
        <Box data-shape-square />
        <Box data-shape-rectangle />
      </BoxEx.Background>
    </BoxEx>
  );
});
