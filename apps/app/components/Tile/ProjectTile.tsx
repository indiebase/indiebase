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
  useMantineTheme,
} from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import {
  IconArrowNarrowUp,
  IconUser,
  IconUsers,
  IconWallet,
} from '@tabler/icons-react';
import Link from 'next/link';
import { type FC, type ReactElement, useEffect, useState } from 'react';
import { NumericFormat } from 'react-number-format';

import { AvatarPreviewProfile } from '../Avatar';
import { BoxEx } from '../BoxEx';
import { projectStatusPalette, ProjectStatusTip } from '../Tips';
import classes from './ProjectTile.module.css';

export interface PinnedProjectCardProps extends Partial<any> {
  hiddenCover?: boolean;
  hiddenMember?: boolean;
  actions?: ReactElement;
}

export const ProjectTile: FC<PinnedProjectCardProps> = function (props) {
  const { id, hiddenMember, actions } = props;

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

  return (
    <BoxEx
      style={{
        // Child above parent of the layer.
        borderRadius: 'var(--mantine-radius-default)',
        zIndex: isDragging ? 999 : isHover ? 300 : 0,
        opacity: isDragging ? 0.8 : 1,
        transform: CSS.Transform.toString(transform),
        transition,
      }}
      // w={matches ? '100%' : undefined}
      bd="1px solid gray.3"
      ref={setNodeRef}
      p={5}
      m={6}
      {...attributes}
    >
      <BoxEx.Foreground className={classes.foreground}>
        <Center className={classes.dragHandle} style={{ height: 16 }}>
          <Box {...listeners} ref={setActivatorNodeRef} />
        </Center>
        <Group justify="space-between" mb={0} mt={4}>
          <Anchor
            href={props.name}
            component={Link}
            size="sm"
            style={{ color: '#228be6', fontWeight: 700 }}
          >
            {props.name}
          </Anchor>

          <ProjectStatusTip onHover={setHover}>
            <Badge
              style={{ cursor: 'default' }}
              size="xs"
              color={projectStatusPalette[props.status]}
              variant="light"
            >
              {props.status}
            </Badge>
          </ProjectStatusTip>
        </Group>
        <Group mt={5} h={40} className="data-preview">
          <Center>
            <Group color="dark" style={{ padding: 0 }} variant="white">
              <IconUsers size={13} />
              <Text ml={3} style={{ lineHeight: 1 }} lineClamp={1} size="xs">
                1011231211
              </Text>
            </Group>
            <Group ml={3} color="dark" style={{ padding: 0 }} variant="white">
              <IconArrowNarrowUp size={12} color="green" />
              <Text
                c="green"
                style={{ lineHeight: 1, fontSize: 10 }}
                lineClamp={1}
              >
                0
              </Text>
            </Group>
          </Center>
          <Center>
            <Group color="dark" style={{ padding: 0 }} variant="white">
              <IconWallet size={14} />
              <NumericFormat
                value={132321}
                displayType="text"
                thousandSeparator
                prefix={'$'}
                renderText={(value) => (
                  <Text
                    ml={3}
                    style={{ lineHeight: 1 }}
                    lineClamp={1}
                    size="xs"
                  >
                    {value}
                  </Text>
                )}
              />
            </Group>
            <Group ml={3} color="dark" variant="white">
              <IconArrowNarrowUp size={12} color="green" />
              <Text c="green" fz="sm" style={{ lineHeight: 1 }} lineClamp={1}>
                0
              </Text>
            </Group>
          </Center>
        </Group>
        <Box>
          <Text lineClamp={2} mt={10} fz="xs" style={{ color: '#777777' }}>
            {props.description}
          </Text>
        </Box>
        <Group mt={9} justify="space-between">
          {!hiddenMember &&
            (props.members.length < 1 ? (
              <Box style={{ height: 26 }} />
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
};

// {/* <Box style={{ position: 'absolute', top: 0, bottom: 0, left: 0 }} /> */}

/* <BackgroundImage src="https://oss.turingsenseai.com/1717405268330931832.jpg"></BackgroundImage> */

// PinnedProjectCard.defaultProps = {
//   hiddenCover: false,
//   hiddenMember: false,
// };
