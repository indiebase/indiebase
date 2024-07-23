// 'use client';

// import {
//   Avatar,
//   Button,
//   Group,
//   MultiSelect,
//   type MultiSelectProps,
//   Text,
// } from '@mantine/core';
// import { useDebouncedState } from '@mantine/hooks';
// import { IconBuildingCommunity } from '@tabler/icons-react';
// import debounce from 'lodash.debounce';
// import { type FC, useState } from 'react';

// interface SelectItem {
//   value: string;
//   label: string;
//   leadingImage?: string;
//   subLabel?: string;
//   [key: string]: any;
// }

export const renderOptionWithDetail: MultiSelectProps['renderOption'] = (
  props,
) => {
  const { option } = props;
  const { leadingImage, subLabel, label } = option as any;

  console.log(props);

  return (
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
  );
};

// export interface InviteInputProps extends MultiSelectProps {
//   data: SelectItem[];
// }

// export const InviteInput: FC<InviteInputProps> = function (props) {
//   const { data } = props;
//   const [members, setMembers] = useDebouncedState<any[]>([], 100);
//   const [value, setValue] = useState<string[]>([]);

//   async function searchUsersApi() {
//     return [
//       {
//         avatar: 'https://random.imagecdn.app/50/50',
//         email: 'random',
//         username: 'random',
//         label: 'HanHan',
//         value: 'hanhan',
//       },
//       {
//         avatar: 'https://random.imagecdn.app/50/50',
//         email: 'random',
//         username: 'random',
//         label: 'hanhan1',
//         value: 'hanhan1',
//       },
//       {
//         avatar: ' https://random.imagecdn.app/50/50',
//         username: 'random',
//         email: 'random',
//         label: 'hanhan2',
//         value: 'hanhan2',
//       },
//     ];
//   }

//   const handleSearch = debounce((val: string) => {
//     searchUsersApi().then((d) => {
//       const items = d.map((val) => ({
//         leadingImage: val.avatar,
//         subLabel: val.username,
//         value: val.value,
//         label: val.label,
//       }));
//       setMembers(items);
//     });
//   }, 500);

//   return (
//     <MultiSelect
//       clearable
//       size="md"
//       searchable
//       hidePickedOptions
//       dropdownOpened
//       limit={20}
//       value={value}
//       data={members}
//       renderOption={renderOptionWithDetail}
//       placeholder="Enter the email. Unregistered users will be sent an invitation to register."
//       onSearchChange={handleSearch}
//       nothingFoundMessage={
//         <Button onClick={() => {}} style={{ cursor: 'default' }}>
//           Create
//         </Button>
//       }
//       onChange={(value) => {
//         setValue(value);
//       }}
//     />
//   );
// };
import {
  Avatar,
  Combobox,
  Group,
  type MultiSelectProps,
  Pill,
  PillsInput,
  Text,
  useCombobox,
} from '@mantine/core';
import { IconBuildingCommunity } from '@tabler/icons-react';
import { useState } from 'react';

const groceries = [
  {
    avatar: 'https://random.imagecdn.app/50/50',
    email: 'random',
    username: 'random',
    label: 'HanHan',
    value: 'hanhan',
  },
  {
    avatar: 'https://random.imagecdn.app/50/50',
    email: 'random',
    username: 'random',
    label: 'hanhan1',
    value: 'hanhan1',
  },
  {
    avatar: ' https://random.imagecdn.app/50/50',
    username: 'random',
    email: 'random',
    label: 'hanhan2',
    value: 'hanhan2',
  },
];

export interface InviteInputItem {
  value: string;
  label: string;
  leadingImage?: string;
  subLabel?: string;
  [key: string]: any;
}

export function MultiInput() {
  const combobox = useCombobox({
    onDropdownClose: () => combobox.resetSelectedOption(),
    onDropdownOpen: () => combobox.updateSelectedOptionIndex('active'),
  });

  const [search, setSearch] = useState('');
  const [value, setValue] = useState<InviteInputItem[]>([]);

  const handleValueSelect = (val: string) =>
    setValue((current) =>
      current.includes(val)
        ? current.filter((v) => v !== val)
        : [...current, val],
    );

  const handleValueRemove = (val: string) =>
    setValue((current) => current.filter((v) => v.value !== val));

  const values = value.map(({ value, label }) => (
    <Pill
      key={value}
      withRemoveButton
      onRemove={() => handleValueRemove(value)}
    >
      {label}
    </Pill>
  ));

  const options = groceries
    .filter((item) => item.toLowerCase().includes(search.trim().toLowerCase()))
    .map((item) => {
      const { leadingImage, subLabel, label } = item;
      return (
        <Combobox.Option value={item} key={item} active={value.includes(item)}>
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
        </Combobox.Option>
      );
    });

  return (
    <Combobox store={combobox} onOptionSubmit={handleValueSelect}>
      <Combobox.DropdownTarget>
        <PillsInput onClick={() => combobox.openDropdown()}>
          <Pill.Group>
            {values}

            <Combobox.EventsTarget>
              <PillsInput.Field
                onFocus={() => combobox.openDropdown()}
                onBlur={() => combobox.closeDropdown()}
                value={search}
                placeholder="Search values"
                onChange={(event) => {
                  combobox.updateSelectedOptionIndex();
                  setSearch(event.currentTarget.value);
                }}
                onKeyDown={(event) => {
                  if (event.key === 'Backspace' && search.length === 0) {
                    event.preventDefault();
                    handleValueRemove(value[value.length - 1]);
                  }
                }}
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
