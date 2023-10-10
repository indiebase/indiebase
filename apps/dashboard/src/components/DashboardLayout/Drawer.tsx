import {
  Text,
  Group,
  UnstyledButton,
  MantineThemeColors,
  AppShell,
  Burger,
  Skeleton,
  Combobox,
  useCombobox,
  Avatar,
  rem,
  Button,
} from '@mantine/core';
import { useAtom } from 'jotai';
import React, { FC, useMemo, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { navbarCollapseAtom } from './navbar.atom';
import { IconBuildingCommunity, IconChevronDown } from '@tabler/icons-react';
import { is } from '@deskbtm/gadgets';

export interface SidebarTileNode {
  label: string;
  to?: string;
  replace?: boolean;
  type?: 'node' | 'link';
  icon?: React.ReactNode;
  color?: keyof MantineThemeColors;
  children?: SidebarTileNode[];
  access?: string[];
  onClick?: () => Promise<void> | void;
}
export interface SidebarProps {
  // menu: SidebarTileNode[];
  semver?: string;
}

interface MenuItemProps {
  label: string;
  active: boolean;
  onClick?: (e: any) => void;
}

function SidebarTile({ label, active, onClick }: MenuItemProps) {
  return (
    <UnstyledButton
      onClick={onClick}
      // sx={(theme) => ({
      //   display: 'block',
      //   width: '100%',
      //   padding: theme.spacing.xs,
      //   paddingLeft: 20,
      //   borderRadius: theme.radius.sm,
      //   color: active ? theme.colors.blue[6] : theme.colors.gray[7],
      //   fontSize: 13,
      //   backgroundColor: active ? theme.colors.gray[0] : 'none',
      //   fontWeight: active ? 'bolder' : 'unset',
      //   '&:hover': {
      //     backgroundColor:
      //       theme.colorScheme === 'dark'
      //         ? theme.colors.dark[6]
      //         : theme.colors.gray[0],
      //   },
      // })}
    >
      <Group>
        <Text size="sm">{label}</Text>
      </Group>
    </UnstyledButton>
  );
}

const useAccordionControl = function (menu: SidebarTileNode[]) {
  const [value, setValue] = useState<string[] | null>([]);
  const location = useLocation();

  // useEffect(() => {
  //   for (const item of menu) {
  //     if (Array.isArray(item.children)) {
  //       const r = item.children.find((e) => location.pathname.includes(e.to));
  //       if (r) {
  //         setValue([...value, item.label]);
  //         break;
  //       }
  //     }
  //   }
  // }, [menu]);

  return [value, setValue];
};

const groceries = [
  '🍎 Apples',
  '🍌 Bananas',
  '🥦 Broccoli',
  '🥕 Carrots',
  '🍫 Chocolate',
];

interface SelectWithIconItem {
  icon: string | React.ReactNode;
  label: string;
  value: string;
}

interface SelectWithIconProps {
  items: SelectWithIconItem[];
  placeholder?: string | React.ReactNode;
  searchPlaceholder?: string;
  onOptionSubmit?: (val: SelectWithIconItem) => void;
}

const SelectWithIcon: FC<SelectWithIconProps> = function (props) {
  const { items, placeholder, searchPlaceholder } = props;
  const [value, setValue] = useState<SelectWithIconItem | null>(null);
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
            rightSection={<IconChevronDown size={12} style={{ margin: -5 }} />}
            variant="transparent"
            onClick={() => combobox.toggleDropdown()}
          >
            {value?.label ?? placeholder}
          </Button>
        </Group>
      </Combobox.Target>

      <Combobox.Dropdown miw={rem(220)} ml={rem(38)}>
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

SelectWithIcon.defaultProps = {
  searchPlaceholder: 'Search...',
};

const OrgSelect = function () {
  return (
    <SelectWithIcon
      onOptionSubmit={(val) => {
        console.log(val);
      }}
      searchPlaceholder="Search organization"
      placeholder="Pick organization"
      items={[
        {
          icon: 'https://randomuser.me/api/portraits/med/women/88.jpg',
          value: 'indiebase',
          label: 'indiebase',
        },
      ]}
    />
  );
};

export const AppShellDrawer: FC<SidebarProps> = function (props) {
  const [opened, toggle] = useAtom(navbarCollapseAtom);

  return (
    <AppShell.Navbar p="md">
      <Burger
        opened={opened.mobile}
        onClick={() => toggle({ ...opened, desktop: !opened.mobile })}
        hiddenFrom="sm"
        size="xs"
      />
      <OrgSelect />
      {Array(15)
        .fill(0)
        .map((_, index) => (
          <Skeleton key={index} h={28} mt="sm" animate={false} />
        ))}
    </AppShell.Navbar>
  );
};
