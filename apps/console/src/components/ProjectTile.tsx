import { IProject } from '@letscollab/app-utils';
import {
  Anchor,
  Avatar,
  AvatarsGroup,
  Badge,
  Card,
  Group,
  MantineColor,
  Text,
} from '@mantine/core';
import { IconUser } from '@tabler/icons';
import { FC } from 'react';
import { Link } from 'react-router-dom';
import { getStatusColor } from './utils';

export interface ProjectTileProps extends Partial<IProject> {}

export const ProjectTile: FC<ProjectTileProps> = function (props) {
  let color: MantineColor = getStatusColor(props.status);

  return (
    <Card p="xs" style={{ borderBottom: '1px solid #E2E2E2' }}>
      <Group position="apart">
        <Group spacing={5}>
          <Anchor
            to="/pro"
            component={Link}
            reloadDocument={false}
            size="sm"
            style={{ color: '#228be6', fontWeight: 700 }}
          >
            {props.name}
          </Anchor>
        </Group>
        <Badge size="xs" color={color} variant="light">
          {props.status}
        </Badge>
      </Group>

      <Group position="apart" mt={20}>
        <Text lineClamp={2} mt={8} style={{ color: '#777777', fontSize: 10 }}>
          {props.description}
        </Text>
        <AvatarsGroup
          styles={(t) => ({
            truncated: {
              color: t.colors.green,
            },
          })}
          ml={-5}
          size="sm"
          limit={7}
        >
          {props.members?.map((u, i) => {
            return (
              <Avatar key={i} src={u.avatar} component="a" href={u.profileUrl}>
                <IconUser size={14} />
              </Avatar>
            );
          })}
        </AvatarsGroup>
      </Group>
    </Card>
  );
};
