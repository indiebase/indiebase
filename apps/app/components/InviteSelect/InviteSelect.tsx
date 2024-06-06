'use client';

import {
  Avatar,
  Group,
  MultiSelect,
  type MultiSelectProps,
  Text,
} from '@mantine/core';
import { useDebouncedState } from '@mantine/hooks';
import { IconBuildingCommunity } from '@tabler/icons-react';
import debounce from 'lodash.debounce';
import { type FC, useState } from 'react';

interface SelectItem {
  value: string;
  label: string;
  leadingImage?: string;
  subLabel?: string;
  [key: string]: any;
}

export const renderOptionWithDetail: MultiSelectProps['renderOption'] = (
  props,
) => {
  const { option } = props;
  const { leadingImage, subLabel, label } = option as any;
  return (
    <div>
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
    </div>
  );
};

export interface InviteSelectProps extends MultiSelectProps {
  data: SelectItem[];
}

export const InviteSelect: FC<InviteSelectProps> = function (props) {
  const { data } = props;
  const [members, setMembers] = useDebouncedState<any[]>([], 100);
  const [value, setValue] = useState<string[]>([]);

  async function searchUsersApi() {
    return [
      {
        avatar: 'https://random.imagecdn.app/50/50',
        email: 'random',
        username: 'random',
        label: 'hanhan',
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
  }

  const handleSearch = debounce(() => {
    searchUsersApi().then((d) => {
      if (d.length < 1) return;
      const items = d.map((val) => ({
        leadingImage: val.avatar,
        subLabel: val.username,
        value: val.value,
        label: val.label,
      }));
      setMembers(items);
    });
  }, 500);

  return (
    <MultiSelect
      clearable
      searchable
      hidePickedOptions
      limit={20}
      value={value}
      data={members}
      renderOption={renderOptionWithDetail}
      placeholder="Enter the email. Unregistered users will be sent an invitation to register."
      onSearchChange={handleSearch}
      onChange={(value) => {
        setValue(value);
      }}
    />
  );
};
