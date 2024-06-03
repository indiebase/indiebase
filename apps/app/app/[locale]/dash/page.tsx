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
import { Container, Grid, Group, Text, useMantineTheme } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import { useCallback, useMemo, useState } from 'react';

import { ProjectTile } from '~/components/Tile/ProjectTile';

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

export default function Home() {
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
  const getIndex = useCallback(
    (id: UniqueIdentifier) => items.findIndex((e) => e.id === id),
    [items],
  );
  const theme = useMantineTheme();
  const [hideMore, setHideMore] = useState(true);
  const visibleItems = hideMore ? items.slice(0, 6) : items;
  const activeIndex = activeId ? getIndex(activeId) : -1;
  const isMobile = useMediaQuery(`(max-width: ${theme.breakpoints.md})`);

  console.log(
    `(min-width: ${theme.breakpoints.xs}) and (max-width: ${theme.breakpoints.sm})`,
  );
  const isTablet = useMediaQuery(
    `(min-width: ${theme.breakpoints.md}) and (max-width: ${theme.breakpoints.xl})`,
  );
  console.log(isTablet);
  const span = isMobile ? 12 : isTablet ? 6 : 4;

  return (
    <Container
      size="lg"
      style={{
        visibility:
          isMobile === undefined || isTablet === undefined
            ? 'hidden'
            : 'visible',
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
        <SortableContext items={visibleItems} strategy={rectSortingStrategy}>
          <Grid mt={2}>
            {visibleItems.map((e, i) => {
              return (
                <Grid.Col span={span} key={i} p={0}>
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
    </Container>
  );
}
