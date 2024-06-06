import { Anchor, Badge, Card, Group, Text } from '@mantine/core';
import { IconUser } from '@tabler/icons-react';
import Link from 'next/link';
import { type FC } from 'react';

import { AvatarGroup, AvatarPreviewProfile } from '../Avatar';
import { projectStatusPalette } from '../Tips';

export interface ProjectListTileProps extends Partial<any> {}

export const ProjectListTile: FC<ProjectListTileProps> = function (props) {
  return (
    <Card
      py="xs"
      px={0}
      style={{ borderBottom: '1px solid #E2E2E2', overflow: 'unset' }}
    >
      <Group justify="space-between">
        <Group gap={5}>
          <Anchor
            href="/pro"
            component={Link}
            // reloadDocument={false}
            size="sm"
            style={{ color: '#228be6', fontWeight: 700 }}
          >
            {props.name}
          </Anchor>
        </Group>
        <Badge
          size="xs"
          color={projectStatusPalette[props.status]}
          variant="light"
        >
          {props.status}
        </Badge>
      </Group>

      <Group justify="space-between" mt={20}>
        <Text lineClamp={2} mt={8} style={{ color: '#777777', fontSize: 10 }}>
          {props.description}
        </Text>
        <AvatarGroup spacing={0}>
          {props.members?.map((u, i) => {
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
      </Group>
    </Card>
  );
};
