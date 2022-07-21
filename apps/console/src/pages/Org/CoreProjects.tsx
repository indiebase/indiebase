import {
  DropAnimation,
  defaultDropAnimationSideEffects,
  closestCenter,
  DndContext,
  DragOverlay,
  KeyboardSensor,
  MouseSensor,
  TouchSensor,
  UniqueIdentifier,
  useSensor,
  useSensors,
  ScreenReaderInstructions,
} from '@dnd-kit/core';
import {
  sortableKeyboardCoordinates,
  SortableContext,
  rectSortingStrategy,
  arrayMove,
} from '@dnd-kit/sortable';
import { IProject } from '@letscollab/app-utils';
import { Grid, Text, Group } from '@mantine/core';
import { FC, useCallback, useState } from 'react';
import { createPortal } from 'react-dom';
import { CoreProjectCard } from '../../components';

const dropAnimationConfig: DropAnimation = {
  sideEffects: defaultDropAnimationSideEffects({
    styles: {
      active: {
        opacity: '0.5',
      },
    },
  }),
};

const activationConstraint = {
  delay: 0,
  tolerance: 5,
};

export interface CoreProjectsProps {
  list: IProject[];
}

export const CoreProjects: FC<CoreProjectsProps> = function (props) {
  const sensors = useSensors(
    useSensor(MouseSensor, {
      activationConstraint,
    }),
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

  console.log('============================', activeIndex);

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
        onDragEnd={({ over, active }) => {
          if (over.id !== active.id) {
            const overIndex = getIndex(over.id);
            setItems((items) => arrayMove(items, activeIndex, overIndex));
          }
          setActiveId(null);
        }}
        onDragCancel={() => setActiveId(null)}
      >
        <SortableContext items={visibleItems} strategy={rectSortingStrategy}>
          <Grid mt={2}>
            {visibleItems.map((e, i) => {
              return (
                <CoreProjectCard
                  key={i}
                  id={e.id}
                  cover={e.cover}
                  name={e.name}
                  members={e.members}
                  updateTime={e.updateTime}
                  status={e.status}
                  description={e.description}
                />
              );
            })}
          </Grid>
        </SortableContext>
        {/* {createPortal(
          <DragOverlay adjustScale={true} dropAnimation={dropAnimationConfig}>
            {activeId ? (
              <div></div>
            ) : // <Item
            //   value={items[activeIndex]}
            //   handle={handle}
            //   renderItem={renderItem}
            //   wrapperStyle={wrapperStyle({
            //     active: { id: activeId },
            //     index: activeIndex,
            //     isDragging: true,
            //     id: items[activeIndex],
            //   })}
            //   style={getItemStyles({
            //     id: items[activeIndex],
            //     index: activeIndex,
            //     isSorting: activeId !== null,
            //     isDragging: true,
            //     overIndex: -1,
            //     isDragOverlay: true,
            //   })}
            //   dragOverlay
            // />
            null}
          </DragOverlay>,
          document.body,
        )} */}
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
