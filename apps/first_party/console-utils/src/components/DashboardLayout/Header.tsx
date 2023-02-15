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
import { Link, resolvePath, useLocation } from 'react-router-dom';
import {
  IconSettings,
  IconPlus,
  IconUser,
  IconBuildingCommunity,
  IconFileDescription,
  IconLogout,
} from '@tabler/icons';
import { useNavigate, useParams } from 'react-router-dom';
import { atom, useAtom } from 'jotai';
import { navbarSwitchAtom, userProfileQueryAtom } from '../../atoms';
import { logoutApi } from '../../api/';

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

export const SelectItem = forwardRef<HTMLDivElement, OrgSelectProps>(
  ({ logo, label, value, ...rest }, ref) => {
    return (
      <div ref={ref} {...rest}>
        <Group noWrap spacing={7}>
          {logo && (
            <Avatar src={logo} radius="xl" size={15}>
              <IconBuildingCommunity size={12} />
            </Avatar>
          )}
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
  const [data] = useAtom(userProfileQueryAtom[0]);
  const [opened, toggle] = useAtom(navbarSwitchAtom);
  const { org: orgParam } = useParams();
  const profile = data.d;
  const { pathname } = useLocation();

  const userItem = {
    logo: profile.avatar,
    label: profile.username,
    value: profile.username,
    path: 'users/' + profile.username,
  };
  const orgs = profile.organizations
    ? [
        userItem,
        ...profile.organizations.map((o) => ({
          logo: o.avatarUrl,
          value: o.name,
          label: o.name,
          path: 'orgs/' + o.name,
        })),
      ]
    : [];
  const [org, setOrg] = useState<OrgSelectProps>({} as any);

  const orgDefault = useMemo(
    () => orgs.find((v) => v.value === orgParam) ?? userItem,
    [orgParam, orgs],
  );

  useEffect(() => {
    if (pathname === '/') {
      setOrg(userItem);
    }
  }, [pathname]);

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
              opened={!opened}
              onClick={() => toggle(!opened)}
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
                  styles={{
                    dropdown: {
                      minWidth: 220,
                      marginLeft: 35,
                    },
                  }}
                  radius="lg"
                  placeholder="Select Organization"
                  itemComponent={SelectItem}
                  data={orgs ?? []}
                  value={org.value ?? orgDefault?.value}
                  onChange={(e) => {
                    const r = orgs.find((v) => v.value === e);
                    setOrg(r);
                    navigate(resolvePath(r.path));
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
              <Group sx={{ marginRight: 10, height: '100%' }} spacing="xl">
                {props.nav}
              </Group>
              <Divider mr={10} orientation="vertical" />
              <Group mr={30} spacing={6}>
                <Menu width={200} position="bottom-end" withArrow>
                  <Menu.Target>
                    <Avatar src={profile?.avatar} radius="xl" size={26}>
                      <IconUser size={17} />
                    </Avatar>
                  </Menu.Target>
                  <Menu.Dropdown>
                    <Menu.Item
                      onClick={() => {
                        navigate(`/users/${profile.username}/settings/profile`);
                      }}
                      icon={<IconSettings size={16} />}
                    >
                      Settings
                    </Menu.Item>
                    <Menu.Item icon={<IconFileDescription size={16} />}>
                      Docs
                    </Menu.Item>
                    <Menu.Item
                      icon={<IconPlus size={16} />}
                      onClick={() => {
                        navigate('/create/org');
                      }}
                    >
                      Create Organization
                    </Menu.Item>
                    <Divider my="xs" variant="dashed" labelPosition="center" />
                    <Menu.Item
                      onClick={async () => {
                        await logoutApi();
                      }}
                      icon={<IconLogout size={16} />}
                    >
                      Sign Out
                    </Menu.Item>
                  </Menu.Dropdown>
                </Menu>
              </Group>
            </Group>
          </MediaQuery>
        </Group>
      </Group>
    </MantineHeader>
  );
};
