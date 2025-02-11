import { is } from '@deskbtm/gadgets/is';
import {
  Avatar,
  Button,
  Combobox,
  Group,
  rem,
  Text,
  useCombobox,
} from '@mantine/core';
import { IconBuildingCommunity, IconChevronDown } from '@tabler/icons-react';
import type React from 'react';
import { type FC, useCallback } from 'react';
import { useMemo, useState } from 'react';
import { useProps } from 'reactgets';

interface OrganizationSelectTile {
  icon: string | React.ReactNode;
  label: string;
  value: string;
}

interface OrganizationSelectProps {
  items: OrganizationSelectTile[];
  placeholder?: string | React.ReactNode;
  searchPlaceholder?: string;
  onOptionSubmit?: (val: OrganizationSelectTile) => void;
}

const defaultProps = {
  searchPlaceholder: 'Search...',
};

export const OrganizationSelect: FC<OrganizationSelectProps> = function (
  _props,
) {
  const { items, placeholder, searchPlaceholder } = useProps(
    defaultProps,
    _props,
  );
  const [value, setValue] = useState<OrganizationSelectTile | null>(null);
  const combobox = useCombobox({
    onDropdownClose: () => {
      combobox.resetSelectedOption();
      combobox.focusTarget();
      setSearch('');
    },
    onDropdownOpen: () => {
      combobox.focusSearchInput();
    },
  });
  const [search, setSearch] = useState('');
  const shouldFilterOptions = items.every((item) => item.label !== search);
  const filteredOptions = shouldFilterOptions
    ? items.filter((item) =>
        item.label.toLowerCase().includes(search.toLowerCase().trim()),
      )
    : items;

  const options = useMemo(
    () =>
      filteredOptions.map(({ value, icon, label }) => (
        <Combobox.Option value={value} key={value}>
          <Group wrap="nowrap" gap="xs">
            {icon &&
              (is.string(icon) ? (
                <Avatar src={icon} radius="xl" size={18}>
                  <IconBuildingCommunity
                    style={{ width: '60%', height: '60%' }}
                  />
                </Avatar>
              ) : (
                icon
              ))}
            <Text lineClamp={1} size="sm">
              {label}
            </Text>
          </Group>
        </Combobox.Option>
      )),
    [filteredOptions],
  );

  const handleOptionsSubmit = useCallback(
    (val) => {
      setSearch(val);
      const result = items.find((v) => v.value === val);
      if (result) setValue(result);
      combobox.closeDropdown();
    },
    [items, combobox],
  );

  return (
    <Combobox store={combobox} onOptionSubmit={handleOptionsSubmit}>
      <Combobox.Target>
        <Group gap="xs">
          <Avatar
            src={value?.icon as string}
            radius="xl"
            size={30}
            color="blue"
          >
            <IconBuildingCommunity style={{ width: '60%', height: '60%' }} />
          </Avatar>
          <Button
            p={0}
            c="dark"
            fz="sm"
            rightSection={<IconChevronDown size={12} />}
            variant="transparent"
            onClick={() => combobox.toggleDropdown()}
          >
            {value?.label ?? placeholder}
          </Button>
        </Group>
      </Combobox.Target>

      <Combobox.Dropdown miw={rem(220)} ml={rem(26)}>
        <Combobox.Search
          value={search}
          onChange={(event) => setSearch(event.currentTarget.value)}
          placeholder={searchPlaceholder}
        />
        {options.length > 0 ? (
          options
        ) : (
          <Combobox.Empty>Nothing found...</Combobox.Empty>
        )}
      </Combobox.Dropdown>
    </Combobox>
  );
};
