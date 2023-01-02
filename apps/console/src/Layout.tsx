import { FC } from 'react';
import { Link } from 'react-router-dom';
import { DashboardLayout } from '@letscollab-community/console-utils';
import { ActionIcon, Anchor, Image, Menu } from '@mantine/core';
import { CommunitySidebar } from './sidebar';
import { IconLanguage } from '@tabler/icons';
import { useTranslation } from 'react-i18next';

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

export const Layout: FC<any> = function () {
  console.log('%c--------------Layout render------------------', 'color:green');

  return (
    <>
      <DashboardLayout
        logoHref="/"
        logo={
          <Image src="/logo.svg" fit="contain" width="180px" alt="letscollab" />
        }
        logoWidth={180}
        sidebar={<CommunitySidebar />}
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
        navbarOpened={false}
      />
    </>
  );
};
