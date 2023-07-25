import { is } from '@deskbtm/gadgets';
import { Group, Tooltip, ActionIcon, Popover, Checkbox } from '@mantine/core';
import { IconZoomReset, IconColumnsOff } from '@tabler/icons';
import { Table } from '@tanstack/react-table';
import { FC } from 'react';

interface RightToolbarProps {
  table: Table<any>;
}

export const RightToolbar: FC<RightToolbarProps> = function ({ table }) {
  return (
    <Group>
      <Tooltip withArrow label="Reset" openDelay={1500}>
        <ActionIcon variant="light" color="blue" onClick={() => table.reset()}>
          <IconZoomReset size={16} />
        </ActionIcon>
      </Tooltip>
      <Popover width={200} position="bottom" withArrow shadow="md">
        <Popover.Target>
          <Tooltip withArrow label="Hide columns" openDelay={1500}>
            <ActionIcon variant="light" color="gray">
              <IconColumnsOff size={16} />
            </ActionIcon>
          </Tooltip>
        </Popover.Target>
        <Popover.Dropdown>
          <Checkbox
            size="xs"
            label="All"
            checked={table.getIsAllColumnsVisible()}
            onChange={table.getToggleAllColumnsVisibilityHandler()}
          />
          {table.getAllLeafColumns().map((column) => {
            return (
              <Checkbox
                key={column.id}
                size="xs"
                label={
                  is.string(column.columnDef.header)
                    ? column.columnDef.header
                    : column.id
                }
                checked={column.getIsVisible()}
                onChange={column.getToggleVisibilityHandler()}
              />
            );
          })}
        </Popover.Dropdown>
      </Popover>
    </Group>
  );
};
