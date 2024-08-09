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
  type PolymorphicComponentProps,
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
import { useProps } from 'reactgets';

import { AvatarPreviewProfile } from '../Avatar';
import { BoxEx } from '../BoxEx';
import { projectStatusPalette, ProjectStatusTip } from '../Tips';
import classes from './ProjectTile.module.css';

export interface ProjectTileProps
  extends Omit<PolymorphicComponentProps<'div'>, 'id'> {
  hiddenMembers?: boolean;
  actions?: ReactElement;
  backgroundStyle?: 1 | 2 | 3;
  name?: string;
  description?: string;
  status?: number;
  id?: number;
  members?: any[];
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
      <Group gap="xs">
        <Group gap={0}>
          <IconUsers size={13} />
          <Text ml={3} lineClamp={1} fz={11}>
            1011231211
          </Text>
        </Group>
        <Group gap={0}>
          <IconArrowNarrowUp size={12} color="green" />
          <Text c="green" fz={11} lineClamp={1}>
            0
          </Text>
        </Group>
      </Group>

      <Group gap="xs">
        <Group gap={0}>
          <IconWallet size={14} />
          <Text ml={3} lineClamp={1} fz={11}>
            {new Intl.NumberFormat('en-US', {
              style: 'currency',
              currency: 'USD',
            }).format(1000)}
          </Text>
        </Group>
        <Group gap={0}>
          <IconArrowNarrowUp size={12} color="green" />
          <Text c="green" fz={11} lineClamp={1}>
            0
          </Text>
        </Group>
      </Group>
    </Group>
  );
};

export const ProjectTileBackgroundStyle1 = () => (
  <BoxEx.Background className={classes.background1}>
    <Box data-shape-triangle />
    <Box data-shape-circle />
    <Box data-shape-square />
    <Box data-shape-rectangle />
  </BoxEx.Background>
);

export const ProjectTileBackgroundStyle2 = () => (
  <BoxEx.Background className={classes.background2}>
    <Box data-shape-circle1 />
    <Box data-shape-circle2 />
    <Box data-shape-circle3 />
    <Box data-shape-circle4 />
  </BoxEx.Background>
);

export const ProjectTileBackgroundStyle3 = () => (
  <BoxEx.Background className={classes.background3}>
    <Box bg="#00DC12" />
    <Box bg="#FF0088" />
    <Box bg="#00FFE5" />
    <Box bg="#FF6F00" />
  </BoxEx.Background>
);

export const ProjectTile: FC<ProjectTileProps> = memo(function (_props) {
  const defaultProjectTileProps = {
    backgroundStyle: 1,
  } satisfies ProjectTileProps;

  const {
    id,
    hiddenMembers,
    actions,
    name,
    status,
    members,
    description,
    backgroundStyle,
    ...restProps
  } = useProps(defaultProjectTileProps, _props);

  const [isHover, setHover] = useState(false);

  const {
    attributes,
    isDragging,
    listeners,
    setNodeRef,
    setActivatorNodeRef,
    transform,
    transition,
  } = useSortable({
    id,
  });

  let background;
  switch (backgroundStyle) {
    case 2:
      background = <ProjectTileBackgroundStyle2 />;
      break;
    case 3:
      background = <ProjectTileBackgroundStyle3 />;
      break;
    default:
      background = <ProjectTileBackgroundStyle1 />;
      break;
  }

  useEffect(() => {
    if (!isDragging) {
      return;
    }
    document.body.style.cursor = 'grabbing';

    return () => {
      document.body.style.cursor = '';
    };
  }, [isDragging]);

  return (
    <BoxEx
      style={{
        borderRadius: 'var(--mantine-radius-default)',
        // Child  above parent of the layer.
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
      {...restProps}
    >
      <BoxEx.Foreground className={classes.foreground}>
        <Center className={classes.dragHandle} h={16}>
          <Box {...listeners} ref={setActivatorNodeRef} />
        </Center>
        <Group justify="space-between" mb={0} mt={4}>
          <Anchor href={name} component={Link} size="sm" c="blue" fw="bolder">
            {name}
          </Anchor>

          <ProjectStatusTip onHover={setHover}>
            <Badge
              style={{ cursor: 'default' }}
              size="sm"
              color={projectStatusPalette[status]}
              variant="light"
            >
              {status}
            </Badge>
          </ProjectStatusTip>
        </Group>
        <DeltaData users={1} revenue={1} />
        <Box>
          <Text lineClamp={2} mt={10} fz={11} c="gray.6">
            {description}
          </Text>
        </Box>
        <Group mt={9} justify="space-between">
          {!hiddenMembers &&
            (members.length < 1 ? (
              <Box h={26} />
            ) : (
              <AvatarGroup style={{ flexWrap: 'wrap' }} ml={-2} spacing="xs">
                {members.map((u, i) => {
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
      {background}
    </BoxEx>
  );
});
