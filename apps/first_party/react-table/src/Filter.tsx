import {
  ActionIcon,
  Button,
  Group,
  Input,
  Popover,
  useMantineTheme,
} from '@mantine/core';
import { useDebouncedState } from '@mantine/hooks';
import { IconSearch, IconX } from '@tabler/icons';
import type { Column, Table } from '@tanstack/react-table';
import { FC, useState } from 'react';

interface FilterProps {
  column: Column<any, unknown>;
  table: Table<any>;
}

const PopoverDefaultFooter: FC<any> = function ({
  onClear,
  onConfirm,
  disabled,
}) {
  const theme = useMantineTheme();
  return (
    <Group grow mt="lg">
      <Button
        key="clear"
        style={{
          visibility: onClear ? 'visible' : 'hidden',
        }}
        variant="light"
        size="xs"
        disabled={disabled}
        onClick={(e) => {
          onClear?.(e);
          e.stopPropagation();
        }}
      >
        Clear
      </Button>

      <Button
        variant="gradient"
        gradient={theme.other.buttonGradient}
        key="confirm"
        size="xs"
        onClick={onConfirm}
        disabled={disabled}
      >
        Ok
      </Button>
    </Group>
  );
};

export const TextFilter: FC<FilterProps> = function ({ column, table }) {
  const [value, setValue] = useDebouncedState('', 20);
  const [opened, setOpened] = useState(false);

  return (
    <Popover withArrow shadow="md" opened={opened} onChange={setOpened}>
      <Popover.Target>
        {!!value ? (
          <ActionIcon
            onClick={() => {
              setValue('');
              column.setFilterValue(null);
              setOpened(false);
            }}
          >
            <IconX size={12} />
          </ActionIcon>
        ) : (
          <ActionIcon onClick={() => setOpened((o) => !o)}>
            <IconSearch size={12} />
          </ActionIcon>
        )}
      </Popover.Target>
      <Popover.Dropdown>
        <Input value={value} onChange={(e) => setValue(e.target.value)} />
        <PopoverDefaultFooter
          onClear={() => {
            setValue('');
            column.setFilterValue(null);
          }}
          onConfirm={() => {
            setOpened(false);
            column.setFilterValue(value);
          }}
        />
      </Popover.Dropdown>
    </Popover>
  );
};

export const DatetimeFilter = function () {};

export const SelectFilter = function () {};

export const Filter: FC<FilterProps> = function ({ column, table }) {
  // console.log(column, table);
  return (
    <>
      <TextFilter table={table} column={column} />
    </>
  );
};
