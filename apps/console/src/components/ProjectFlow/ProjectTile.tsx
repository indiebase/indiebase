import { Project } from '@indiebase/trait';
import { AvatarWithPreview, LimitAvatarGroup } from '@indiebase/console-shared';
import { Anchor, Badge, Card, Group, Text } from '@mantine/core';
import { IconUser } from '@tabler/icons';
import { FC } from 'react';
import { Link } from 'react-router-dom';
import { statusPalette } from '../StatusTip';

export interface ProjectTileProps extends Partial<Project> {}

export const ProjectTile: FC<ProjectTileProps> = function (props) {
  return (
    <Card
      py="xs"
      px={0}
      style={{ borderBottom: '1px solid #E2E2E2', overflow: 'unset' }}
    >
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
        <Badge size="xs" color={statusPalette[props.status]} variant="light">
          {props.status}
        </Badge>
      </Group>

      <Group position="apart" mt={20}>
        <Text lineClamp={2} mt={8} style={{ color: '#777777', fontSize: 10 }}>
          {props.description}
        </Text>
        <LimitAvatarGroup spacing={0}>
          {props.members?.map((u, i) => {
            return (
              <AvatarWithPreview
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
              </AvatarWithPreview>
            );
          })}
        </LimitAvatarGroup>
      </Group>
    </Card>
  );
};
