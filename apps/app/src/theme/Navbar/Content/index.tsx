import React, { useState, type ReactNode } from 'react';
import {
  splitNavbarItems,
  useNavbarMobileSidebar,
  useThemeConfig,
} from '@docusaurus/theme-common';
import NavbarItem, { type Props as NavbarItemConfig } from '@theme/NavbarItem';
import SearchBar from '@theme/SearchBar';
import NavbarMobileSidebarToggle from '@theme/Navbar/MobileSidebar/Toggle';
import NavbarLogo from '@theme/Navbar/Logo';
import NavbarSearch from '@theme/Navbar/Search';

import { Anchor, Box, Divider, Group } from '@mantine/core';
import { LoginModal } from '@site/src/components/Modal/SignIn';

function useNavbarItems() {
  // TODO temporary casting until ThemeConfig type is improved
  return useThemeConfig().navbar.items as NavbarItemConfig[];
}

function NavbarItems({ items }: { items: NavbarItemConfig[] }): JSX.Element {
  return (
    <>
      <Group
        sx={(theme) => ({
          height: '100%',
        })}
      >
        <Group
          sx={{ marginRight: 40, a: { lineHeight: 1, padding: 'unset' } }}
          spacing={40}
        >
          {items.map((item, i) => (
            <NavbarItem {...item} key={i} />
          ))}
        </Group>
      </Group>
    </>
  );
}

function NavbarContentLayout({
  left,
  right,
}: {
  left: ReactNode;
  right: ReactNode;
}) {
  return (
    <div className="navbar__inner">
      <div className="navbar__items">{left}</div>
      <div className="navbar__items navbar__items--right">{right}</div>
    </div>
  );
}

export default function NavbarContent(): JSX.Element {
  const mobileSidebar = useNavbarMobileSidebar();
  const items = useNavbarItems();
  const [leftItems, rightItems] = splitNavbarItems(items);
  const searchBarItem = items.find((item) => item.type === 'search');
  const [modalMeta, setModalMeta] = useState<{
    initialNo?: number;
    opened: boolean;
  }>({
    opened: false,
  });

  return (
    <NavbarContentLayout
      left={
        <>
          {!mobileSidebar.disabled && <NavbarMobileSidebarToggle />}
          <Box ml={30}>
            <NavbarLogo />
          </Box>
          <NavbarItems items={leftItems} />
        </>
      }
      right={
        <Group
          sx={{
            fontSize: 14,
            height: '100%',
          }}
        >
          <LoginModal
            opened={modalMeta.opened}
            onClose={() => setModalMeta({ opened: false })}
            initialNo={modalMeta.initialNo}
          />
          {!searchBarItem && (
            <NavbarSearch>
              <SearchBar />
            </NavbarSearch>
          )}
          <NavbarItems items={rightItems} />
          {/* <NavbarColorModeToggle className={styles.colorModeToggle} /> */}
          <Divider orientation="vertical" />
          <Group ml={40} mr={50} spacing={6} sx={{ span: { fontSize: 14 } }}>
            <Anchor
              component={'span'}
              onClick={(e) => {
                setModalMeta({ opened: true, initialNo: 0 });
              }}
            >
              登录
            </Anchor>
            /
            <Anchor
              component="span"
              onClick={(e) => {
                setModalMeta({ opened: true, initialNo: 1 });
              }}
            >
              注册
            </Anchor>
          </Group>
        </Group>
      }
    />
  );
}
