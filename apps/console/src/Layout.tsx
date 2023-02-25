import { FC, useEffect, useMemo, useState } from 'react';
import {
  Link,
  resolvePath,
  useLocation,
  useNavigate,
  useParams,
} from 'react-router-dom';
import {
  DashboardLayout,
  Header,
  logoutApi,
  OrgSelectProps,
  SelectItem,
  userProfileQueryAtom,
} from '@letscollab-community/console-utils';
import {
  ActionIcon,
  Anchor,
  Avatar,
  Divider,
  Group,
  Image,
  Menu,
  Select,
} from '@mantine/core';
import { CommunitySidebar } from './Sidebar';
import {
  IconBuildingCommunity,
  IconFileDescription,
  IconLanguage,
  IconLogout,
  IconPlus,
  IconSettings,
  IconUser,
} from '@tabler/icons';
import { useTranslation } from 'react-i18next';
import { useAtom } from 'jotai';

const lang = [
  {
    name: '简体中文',
    code: 'zh-CN',
  },
  {
    name: 'English',
    code: 'en',
  },
];

const LanguageMenu = function () {
  const { i18n } = useTranslation();
  return (
    <Menu trigger="hover" position="bottom" width={120} withArrow>
      <Menu.Target>
        <ActionIcon color="dark" variant="transparent">
          <IconLanguage size={18} />
        </ActionIcon>
      </Menu.Target>
      <Menu.Dropdown>
        {lang.map((v, i) => (
          <Menu.Item
            onClick={async () => {
              await i18n.changeLanguage(v.code);
            }}
            key={i}
          >
            {v.name}
          </Menu.Item>
        ))}
      </Menu.Dropdown>
    </Menu>
  );
};

const CommunityMenu = function () {
  const [data] = useAtom(userProfileQueryAtom[0]);
  const profile = data.d;
  const navigate = useNavigate();

  return (
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
        <Menu.Item icon={<IconFileDescription size={16} />}>Docs</Menu.Item>
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
  );
};

const OrganizationSelect = function () {
  const navigate = useNavigate();
  const [data] = useAtom(userProfileQueryAtom[0]);
  const { pathname } = useLocation();
  const { org: orgParam } = useParams();
  const profile = data.d;

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [orgParam, orgs],
  );

  useEffect(() => {
    if (pathname === '/') {
      setOrg(userItem);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  return (
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
  );
};

export const Layout: FC<any> = function () {
  console.log('%c--------------Layout render------------------', 'color:green');

  return (
    <>
      <DashboardLayout
        sidebar={<CommunitySidebar />}
        header={
          <Header
            logoWidth={180}
            basename="/"
            leading={<OrganizationSelect />}
            logo={
              <Image
                src="/logo.svg"
                fit="contain"
                width="180px"
                alt="letscollab"
              />
            }
            menu={<CommunityMenu />}
            nav={
              <>
                <LanguageMenu />
                <Anchor
                  to="/pro"
                  target="_blank"
                  underline={false}
                  component={Link}
                  reloadDocument={false}
                  style={{ color: '#228be6', fontWeight: 700 }}
                >
                  Switch Pro
                </Anchor>
              </>
            }
          />
        }
      />
    </>
  );
};
