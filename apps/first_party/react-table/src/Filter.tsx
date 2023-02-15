import {
  ActionIcon,
  Button,
  Group,
  Input,
  Popover,
  useMantineTheme,
} from '@mantine/core';
import { RangeCalendar } from '@mantine/dates';
import { useDebouncedState } from '@mantine/hooks';
import { IconSearch, IconX } from '@tabler/icons';
import type { Column, Table } from '@tanstack/react-table';
import { FC, useState } from 'react';

interface BaseFilterProps {
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

export const TextFilter: FC<BaseFilterProps> = function ({ column }) {
  const [value, setValue] = useDebouncedState('', 20);
  const [opened, setOpened] = useState(false);

  return (
    <Popover withArrow shadow="md" opened={opened} onChange={setOpened}>
      <Popover.Target>
        {!!value ? (
          <ActionIcon
            onClick={() => {
              setValue(null);
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

export const DateRangeFilter: FC<BaseFilterProps> = function ({ column }) {
  const initValue: [null, null] = [null, null];
  const [value, setValue] = useState<[Date | null, Date | null]>(initValue);
  const [opened, setOpened] = useState(false);
  const theme = useMantineTheme();

  return (
    <Popover withArrow shadow="md" opened={opened} onChange={setOpened}>
      <Popover.Target>
        {!!value?.[0] ? (
          <ActionIcon
            onClick={() => {
              setValue(initValue);
              column.setFilterValue(initValue);
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
        <RangeCalendar
          styles={{
            weekdayCell: {
              border: 'unset !important',
            },
            cell: {
              border: 'unset !important',
              backgroundColor: 'unset',
              padding: '0 !important',
            },
            month: {
              tr: {
                backgroundColor: 'unset !important',
              },
            },
          }}
          value={value}
          onChange={(v) => {
            column.setFilterValue(v);
            setValue(v);
          }}
        />
        <Button
          variant="gradient"
          gradient={theme.other.buttonGradient}
          key="confirm"
          size="xs"
          fullWidth
          mt="md"
          onClick={() => {
            setOpened(false);
          }}
        >
          Ok
        </Button>
      </Popover.Dropdown>
    </Popover>
  );
};

export const SelectFilter = function () {};

export const Filter: FC<BaseFilterProps> = function ({ column, table }) {
  switch ((column.columnDef as any).filterType) {
    case 'text':
      return <TextFilter table={table} column={column} />;
    case 'dateRange':
      return <DateRangeFilter table={table} column={column} />;
    default:
      return <></>;
  }
};
