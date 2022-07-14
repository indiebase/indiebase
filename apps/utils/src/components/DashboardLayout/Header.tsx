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
import { FC, forwardRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { IconSettings, IconPlus } from '@tabler/icons';
import { useNavigate, useParams } from 'react-router-dom';
import { useAtom } from 'jotai';
import { UserProfile, userProfileQuery } from '../../api';
import { loadable } from 'jotai/utils';

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
  ({ logo, label, value, ...rest }: OrgSelectProps, ref) => (
    <div ref={ref} {...rest}>
      <Group noWrap spacing={7}>
        <Avatar src={logo} radius="xl" size={15} />
        <Text lineClamp={1} size="xs">
          {label}
        </Text>
      </Group>
    </div>
  ),
);

const loadableUserProfile = loadable(userProfileQuery);

export const Header: FC<NavHeaderProps> = function (props) {
  const theme = useMantineTheme();
  const { org: orgParam } = useParams();

  const [orgAvatar, setOrgAvatar] = useState<string | undefined>();
  const [org, setOrg] = useState<string | undefined>(orgParam);
  const navigate = useNavigate();

  const [value] = useAtom(loadableUserProfile);

  const data = (value.state === 'hasData' ? value.data.d : {}) as UserProfile;

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
              <Avatar src={orgAvatar} radius="xl" size="sm" />
              <div style={{ width: 150 }}>
                <Select
                  radius="lg"
                  placeholder="Select Organization"
                  itemComponent={SelectItem}
                  data={data.orgs ?? []}
                  value={org}
                  onChange={(e) => {
                    const r = data.orgs.find((v) => v.value === e);
                    setOrg(r.value);
                    navigate(r.label);
                    setOrgAvatar(r?.logo);
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
                  control={<Avatar src={data.avatar} radius="xl" size={26} />}
                >
                  <Menu.Item icon={<IconSettings size={16} />}>
                    Settings
                  </Menu.Item>
                  <Menu.Item icon={<IconPlus size={16} />}>
                    Create Organization
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
