import {
  ActionIcon,
  Button,
  Group,
  Input,
  Popover,
  useMantineTheme,
} from '@mantine/core';
import { useDebouncedState, useDisclosure } from '@mantine/hooks';
import { IconSearch } from '@tabler/icons';
import { Column, Table } from '@tanstack/react-table';
import debounce from 'lodash.debounce';
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
        清除
      </Button>

      <Button
        variant="gradient"
        gradient={theme.other.buttonGradient}
        key="confirm"
        size="xs"
        onClick={onConfirm}
        disabled={disabled}
      >
        确认
      </Button>
    </Group>
  );
};

export const TextFilter = function () {
  const [value, setValue] = useDebouncedState('', 20);
  const [opened, setOpened] = useState(false);

  return (
    <Popover withArrow shadow="md" opened={opened} onChange={setOpened}>
      <Popover.Target>
        <ActionIcon onClick={() => setOpened((o) => !o)}>
          <IconSearch size={12} />
        </ActionIcon>
      </Popover.Target>
      <Popover.Dropdown>
        <Input value={value} onChange={(e) => setValue(e.target.value)} />
        <PopoverDefaultFooter
          onClear={() => setValue('')}
          onConfirm={() => setOpened(false)}
        />
      </Popover.Dropdown>
    </Popover>
  );
};

export const DatetimeFilter = function () {};

export const SelectFilter = function () {};

export const Filter: FC<FilterProps> = function ({ column, table }) {
  console.log(column, table);
  return (
    <>
      <TextFilter />
    </>
  );
};
