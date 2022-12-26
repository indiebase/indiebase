import {
  closestCenter,
  DndContext,
  KeyboardSensor,
  MouseSensor,
  TouchSensor,
  UniqueIdentifier,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  sortableKeyboardCoordinates,
  SortableContext,
  rectSortingStrategy,
  arrayMove,
} from '@dnd-kit/sortable';
import { IProject } from '@letscollab-nest/trait';
import { Grid, Text, Group } from '@mantine/core';
import { FC, useCallback, useState } from 'react';
import { PinnedProjectCard } from '../../components';

export interface CoreProjectsProps {
  list: IProject[];
}

export const CoreProjects: FC<CoreProjectsProps> = function (props) {
  const sensors = useSensors(
    useSensor(MouseSensor, {}),
    useSensor(TouchSensor, {}),
    useSensor(KeyboardSensor, {
      scrollBehavior: 'Cypress' in window ? 'auto' : undefined,
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );
  const [items, setItems] = useState<IProject[]>(props.list);
  const [activeId, setActiveId] = useState<UniqueIdentifier | null>(null);
  const getIndex = useCallback(
    (id: UniqueIdentifier) => items.findIndex((e) => e.id === id),
    [items],
  );
  const [hideMore, setHideMore] = useState(true);
  const visibleItems = hideMore ? items.slice(0, 6) : items;
  const activeIndex = activeId ? getIndex(activeId) : -1;

  return (
    <div>
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
                <Grid.Col key={i} lg={4} md={6}>
                  <PinnedProjectCard
                    id={e.id}
                    cover={e.cover}
                    name={e.name}
                    members={e.members}
                    updateTime={e.updateTime}
                    status={e.status}
                    description={e.description}
                  />
                </Grid.Col>
              );
            })}
          </Grid>
        </SortableContext>
      </DndContext>
      {items.length > 6 ? (
        <Group mt={15} position="right">
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
    </div>
  );
};
