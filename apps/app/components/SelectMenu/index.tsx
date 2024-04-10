import { is } from '@deskbtm/gadgets';
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
import { type FC } from 'react';
import { useMemo, useState } from 'react';
import { useProps } from 'reactgets';

interface SelectMenuItem {
  icon: string | React.ReactNode;
  label: string;
  value: string;
}

interface SelectMenuProps {
  items: SelectMenuItem[];
  placeholder?: string | React.ReactNode;
  searchPlaceholder?: string;
  onOptionSubmit?: (val: SelectMenuItem) => void;
}
const defaultProps = {
  searchPlaceholder: 'Search...',
};

export const SelectMenu: FC<SelectMenuProps> = function (_props) {
  const a = useProps(defaultProps, _props);

  const { items, placeholder, searchPlaceholder } = useProps(
    defaultProps,
    _props,
  );
  const [value, setValue] = useState<SelectMenuItem | null>(null);
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
          <Group wrap="nowrap" gap={'xs'}>
            {icon &&
              (is.string(icon) ? (
                <Avatar src={icon} radius="xl" size="sm">
                  <IconBuildingCommunity size={14} />
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

  return (
    <Combobox
      store={combobox}
      onOptionSubmit={(val) => {
        setSearch(val);
        const i = items.find((v) => v.value === val);
        if (i) setValue(i);
        combobox.closeDropdown();
      }}
    >
      <Combobox.Target>
        <Group gap="xs">
          <Avatar src={value?.icon as string} radius="xl" size={34}>
            <IconBuildingCommunity size={14} />
          </Avatar>
          <Button
            p={0}
            c="dark"
            fz="sm"
            rightSection={<IconChevronDown size={12} ·/>}
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
          <Combobox.Empty>Nothing found</Combobox.Empty>
        )}
      </Combobox.Dropdown>
    </Combobox>
  );
};
