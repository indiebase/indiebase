import {
  MediaQuery,
  Header as MantineHeader,
  Burger,
  useMantineTheme,
  Group,
  Anchor,
  Avatar,
  Select,
  Text,
  Menu,
  Divider,
} from '@mantine/core';
import { FC, forwardRef, useEffect, useMemo, useState } from 'react';
import {
  Link,
  resolvePath,
  useLocation,
  useResolvedPath,
} from 'react-router-dom';
import {
  IconSettings,
  IconPlus,
  IconUser,
  IconBuildingCommunity,
  IconFileDescription,
  IconLogout,
} from '@tabler/icons';
import { useNavigate, useParams, NavLink } from 'react-router-dom';
import { useAtom } from 'jotai';
import { userProfileQuery } from '../../api';

export interface NavHeaderProps {
  onNavbarOpen?: () => void;
  logo: React.ReactNode;
  logoWidth: number;
  nav?: React.ReactNode;
  logoHref: string;
  navbarOpened: boolean;
}

export interface OrgSelectProps extends React.ComponentPropsWithoutRef<'div'> {
  logo: string;
  label: string;
  value: string;
}

const SelectItem = forwardRef<HTMLDivElement, OrgSelectProps>(
  ({ logo, label, value, ...rest }: OrgSelectProps, ref) => {
    return (
      <div ref={ref} {...rest}>
        <Group noWrap spacing={7}>
          <Avatar src={logo} radius="xl" size={15} />
          <Text lineClamp={1} size="xs">
            {label}
          </Text>
        </Group>
      </div>
    );
  },
);

export const Header: FC<NavHeaderProps> = function (props) {
  const theme = useMantineTheme();
  const navigate = useNavigate();
  const { org: orgParam } = useParams();
  const [value] = useAtom(userProfileQuery);

  const data = value.d;
  const userItem = {
    logo: data.avatar,
    label: data.username,
    value: data.username,
  };
  const orgs = data.orgs ? [userItem, ...data.orgs] : [];

  const orgDefault = useMemo(
    () => orgs.find((v) => v.label === orgParam) ?? userItem,
    [orgParam, orgs],
  );

  const [org, setOrg] = useState<OrgSelectProps>({} as any);

  return (
    <MantineHeader
      fixed
      sx={{
        borderBottom: 'unset',
        backdropFilter: 'saturate(180%) blur(10px)',
        backgroundColor: 'hsla(0,0%,100%,.7)',
        alignItems: 'center',
      }}
      height={65}
      p="md"
    >
      <Group
        position="apart"
        sx={(theme) => ({
          height: '100%',
          a: {
            textDecoration: 'none',
            color: theme.colors.dark[6],
            fontSize: 14,
          },
        })}
      >
        <Group>
          <MediaQuery largerThan="sm" styles={{ display: 'none' }}>
            <Burger
              opened={props.navbarOpened}
              onClick={props.onNavbarOpen}
              size="sm"
              color={theme.colors.gray[6]}
            />
          </MediaQuery>
          <MediaQuery smallerThan="sm" styles={{ display: 'none', width: 100 }}>
            <Group spacing="xs" ml={6}>
              <Avatar src={org.logo ?? orgDefault?.logo} radius="xl" size="sm">
                <IconBuildingCommunity size={17} />
              </Avatar>
              <div style={{ width: 150 }}>
                <Select
                  radius="lg"
                  // withinPortal={false}
                  placeholder="Select Organization"
                  itemComponent={SelectItem}
                  data={orgs ?? []}
                  value={org.value ?? orgDefault?.value}
                  onChange={(e) => {
                    const r = orgs.find((v) => v.value === e);
                    setOrg(r);
                    navigate(resolvePath(r.label));
                  }}
                  searchable
                  size="xs"
                  maxDropdownHeight={200}
                  nothingFound="Empty"
                />
              </div>
            </Group>
          </MediaQuery>
        </Group>

        <Anchor
          component={Link}
          to={props.logoHref}
          reloadDocument={false}
          underline={false}
          style={{
            position: 'absolute',
            left: '50%',
            marginLeft: `-${props.logoWidth / 2}px`,
          }}
        >
          {props.logo}
        </Anchor>

        <Group
          sx={() => ({
            height: '100%',
          })}
        >
          <MediaQuery smallerThan="sm" styles={{ display: 'none' }}>
            <Group
              sx={() => ({
                height: '100%',
              })}
            >
              <Group sx={{ marginRight: 10, height: '100%' }} spacing={40}>
                {props.nav}
              </Group>
              <Divider mr={10} orientation="vertical" />
              <Group mr={30} spacing={6}>
                <Menu
                  color="dark"
                  control={
                    <Avatar src={data?.avatar} radius="xl" size={26}>
                      <IconUser size={17} />
                    </Avatar>
                  }
                >
                  <Menu.Item icon={<IconSettings size={16} />}>
                    Settings
                  </Menu.Item>
                  <Menu.Item icon={<IconFileDescription size={16} />}>
                    Docs
                  </Menu.Item>
                  <Menu.Item icon={<IconPlus size={16} />}>
                    Create Organization
                  </Menu.Item>
                  <Divider my="lg" variant="dashed" labelPosition="center" />
                  <Menu.Item icon={<IconLogout size={16} />}>
                    Sign Out
                  </Menu.Item>
                </Menu>
              </Group>
            </Group>
          </MediaQuery>
        </Group>
      </Group>
    </MantineHeader>
  );
};
