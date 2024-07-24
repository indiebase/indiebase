'use client';

import {
  Avatar,
  Combobox,
  Group,
  Pill,
  PillsInput,
  type PillsInputProps,
  Text,
  useCombobox,
} from '@mantine/core';
import { IconBuildingCommunity, IconCheck } from '@tabler/icons-react';
import {
  type ChangeEventHandler,
  type KeyboardEventHandler,
  useState,
} from 'react';
import { useProps } from 'reactgets';
import { IF } from 'reactgets/components/IF';
export interface MultiInputItem {
  value: string;
  label: string;
  leadingImage?: string | undefined;
  subLabel?: string | undefined;
  [key: string]: any;
}

export interface MultiInputProps extends PillsInputProps {
  data: MultiInputItem[];
  placeholder?: string | undefined;
}

const defaultMultiInputProps = {
  placeholder: 'Search...',
};

export function MultiInput(_props: MultiInputProps) {
  const { data, placeholder, ...pillsInputProps } = useProps(
    defaultMultiInputProps,
    _props,
  );
  const combobox = useCombobox({
    onDropdownOpen: () => combobox.updateSelectedOptionIndex('active'),
  });

  const [search, setSearch] = useState('');
  const [pills, setPills] = useState<MultiInputItem[]>([]);

  const handleValueSelect = (val: string) => {
    setPills((current) => {
      const d = data.find((v) => v.value === val);
      const c = current.find((v) => v.value === val);
      return c
        ? current.filter((v) => v.value !== c.value)
        : [...current, d].filter(Boolean);
    });
  };

  const handleValueRemove = (val: string) =>
    setPills((current) => current.filter((v) => v.value !== val));

  const values = pills.map(({ value, label, leadingImage }) => (
    <Pill
      key={value}
      withRemoveButton
      onRemove={() => handleValueRemove(value)}
      radius="sm"
    >
      <Group wrap="nowrap" gap={5} mr={5}>
        {leadingImage && (
          <Avatar src={leadingImage} radius="xl" size={16}>
            <IconBuildingCommunity size={12} />
          </Avatar>
        )}
        {label}
      </Group>
    </Pill>
  ));

  const handleKeydown: KeyboardEventHandler<HTMLInputElement> = (event) => {
    if (event.key === 'Backspace' && search.length === 0) {
      event.preventDefault();
      handleValueRemove(pills[pills.length - 1]?.value);
    }
  };

  const handleChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    combobox.updateSelectedOptionIndex();
    setSearch(event.currentTarget.value);
  };

  const options = data
    .filter((item) =>
      item.value.toLowerCase().includes(search.trim().toLowerCase()),
    )
    .map((item: MultiInputItem) => {
      const { leadingImage, subLabel, label, value } = item;
      return (
        <Combobox.Option
          onClick={() => combobox.closeDropdown()}
          value={value}
          key={value}
          active={pills.some((v) => v.value === value)}
        >
          <Group justify="space-between" mih={30}>
            <Group gap={7}>
              {leadingImage && (
                <Avatar src={leadingImage} radius="xl" size={18}>
                  <IconBuildingCommunity size={12} />
                </Avatar>
              )}
              <Text lineClamp={1} fz="sm">
                {label}
              </Text>
              {subLabel && (
                <Text lineClamp={1} fz="xs" c="gray">
                  {subLabel}
                </Text>
              )}
            </Group>
            <IF is={pills.some((v) => v.value === value)}>
              <IconCheck size={14} />
            </IF>
          </Group>
        </Combobox.Option>
      );
    });

  return (
    <Combobox store={combobox} onOptionSubmit={handleValueSelect}>
      <Combobox.DropdownTarget>
        <PillsInput
          size="md"
          onClick={() => combobox.openDropdown()}
          {...pillsInputProps}
        >
          <Pill.Group>
            {values}
            <Combobox.EventsTarget>
              <PillsInput.Field
                onFocus={() => combobox.openDropdown()}
                onBlur={() => combobox.closeDropdown()}
                value={search}
                placeholder={placeholder}
                onChange={handleChange}
                onKeyDown={handleKeydown}
              />
            </Combobox.EventsTarget>
          </Pill.Group>
        </PillsInput>
      </Combobox.DropdownTarget>

      <Combobox.Dropdown>
        <Combobox.Options>
          {options.length > 0 ? (
            options
          ) : (
            <Combobox.Empty>Nothing found...</Combobox.Empty>
          )}
        </Combobox.Options>
      </Combobox.Dropdown>
    </Combobox>
  );
}
