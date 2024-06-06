'use client';

import {
  closestCenter,
  DndContext,
  KeyboardSensor,
  MouseSensor,
  TouchSensor,
  type UniqueIdentifier,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  arrayMove,
  rectSortingStrategy,
  SortableContext,
  sortableKeyboardCoordinates,
} from '@dnd-kit/sortable';
import { ProjectStatus } from '@indiebase/trait';
import { Box, Grid, Group, Text } from '@mantine/core';
import { type FC, useCallback, useState } from 'react';

import { useDeviceQueryValue } from '~/hooks/use-device-query';

import { ProjectTile } from './ProjectTile';

const fake = [
  {
    id: 1,
    name: 'Publish',
    status: ProjectStatus.operating,
    cover: 'https://random.imagecdn.app/50/50',
    description: 'xxxxxx',
    members: [
      {
        avatar: 'https://random.imagecdn.app/50/50',
        profileUrl: '',
      },
    ],
  },
  {
    id: 2,
    name: 'Publish',
    status: ProjectStatus.operating,
    cover: 'https://random.imagecdn.app/50/50',
    description: 'xxxxxx',
    members: [
      {
        avatar: 'https://random.imagecdn.app/50/50',
        profileUrl: '',
      },
      {
        avatar: 'https://random.imagecdn.app/50/50',
        profileUrl: '',
      },
      {
        avatar: 'https://random.imagecdn.app/50/50',
        profileUrl: '',
      },
      {
        avatar: 'https://random.imagecdn.app/50/50',
        profileUrl: '',
      },
      {
        avatar: 'https://random.imagecdn.app/50/50',
        profileUrl: '',
      },
      {
        avatar: 'https://random.imagecdn.app/50/50',
        profileUrl: '',
      },
      {
        avatar: 'https://random.imagecdn.app/50/50',
        profileUrl: '',
      },
      {
        avatar: 'https://random.imagecdn.app/50/50',
        profileUrl: '',
      },
      {
        avatar: 'https://random.imagecdn.app/50/50',
        profileUrl: '',
      },
    ],
  },
  {
    id: 3,
    name: 'Publish',
    status: ProjectStatus.operating,
    cover: 'https://random.imagecdn.app/50/50',
    description: 'xxxxxx',
    members: [
      {
        avatar: 'https://random.imagecdn.app/50/50',
        profileUrl: '',
      },
    ],
  },
  {
    id: 4,
    name: 'Publish',
    status: ProjectStatus.operating,
    cover: 'https://random.imagecdn.app/50/50',
    description: 'xxxxxx',
    members: [
      {
        avatar: 'https://random.imagecdn.app/50/50',
        profileUrl: '',
      },
    ],
  },
];

export const ProjectTileGroup: FC<any> = function () {
  const sensors = useSensors(
    useSensor(MouseSensor, {}),
    useSensor(TouchSensor, {}),
    useSensor(KeyboardSensor, {
      scrollBehavior:
        typeof window !== 'undefined' && 'Cypress' in window
          ? 'auto'
          : undefined,
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );
  const [items, setItems] = useState<any[]>(fake ?? []);
  const [activeId, setActiveId] = useState<UniqueIdentifier | null>(null);
  const [hideMore, setHideMore] = useState(true);
  // const visibleItems = hideMore ? items.slice(0, 6) : items;
  const getIndex = useCallback(
    (id: UniqueIdentifier) => items.findIndex((e) => e.id === id),
    [items],
  );
  const activeIndex = activeId ? getIndex(activeId) : -1;
  const span = useDeviceQueryValue({ tablet: 6, mobile: 12, desktop: 4 });

  return (
    <Box
      style={{
        visibility: span ? 'visible' : 'hidden',
      }}
    >
      <DndContext
        collisionDetection={closestCenter}
        sensors={sensors}
        onDragStart={({ active }) => {
          if (!active) {
            return;
          }
          setActiveId(active.id);
        }}
        onDragEnd={({ over }) => {
          if (over) {
            const overIndex = getIndex(over.id);
            if (activeIndex !== overIndex) {
              setItems((items) => arrayMove(items, activeIndex, overIndex));
            }
          }
          setActiveId(null);
        }}
        onDragCancel={() => setActiveId(null)}
      >
        <SortableContext items={items} strategy={rectSortingStrategy}>
          <Grid mt={2}>
            {items.map((e) => {
              return (
                <Grid.Col span={span} p={0} key={e.id}>
                  <ProjectTile
                    id={e.id}
                    cover={e.cover}
                    name={e.name}
                    members={e.members}
                    updateTime={e.updateTime}
                    status={e.status}
                    description={e.description}
                    hiddenCover={false}
                    hiddenMember={false}
                  />
                </Grid.Col>
              );
            })}
          </Grid>
        </SortableContext>
      </DndContext>
      {items.length > 6 ? (
        <Group mt={15} justify="flex-end">
          <Text
            size="sm"
            color="blue"
            style={{
              cursor: 'pointer',
            }}
            onClick={() => {
              setHideMore(!hideMore);
            }}
          >
            {hideMore ? 'show more' : 'hide'}&nbsp;({items.length - 6})
          </Text>
        </Group>
      ) : null}
    </Box>
  );
};
