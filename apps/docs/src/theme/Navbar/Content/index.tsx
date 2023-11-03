import { ErrorCauseBoundary, useThemeConfig } from '@docusaurus/theme-common';
import {
  splitNavbarItems,
  useNavbarMobileSidebar,
} from '@docusaurus/theme-common/internal';
import { ActionIcon, Anchor, Divider, Group } from '@mantine/core';
import { SignInAndUpModal } from '@site/src/components/Modals/SignInAndUp.tsx';
import { IconBrandGithub } from '@tabler/icons-react';
import NavbarColorModeToggle from '@theme/Navbar/ColorModeToggle';
import NavbarLogo from '@theme/Navbar/Logo';
import NavbarMobileSidebarToggle from '@theme/Navbar/MobileSidebar/Toggle';
import NavbarSearch from '@theme/Navbar/Search';
import NavbarItem, { type Props as NavbarItemConfig } from '@theme/NavbarItem';
import SearchBar from '@theme/SearchBar';
import clsx from 'clsx';
import React, { useState, type ReactNode } from 'react';
import * as styles from './styles.css.ts';

function useNavbarItems() {
  // TODO temporary casting until ThemeConfig type is improved
  return useThemeConfig().navbar.items as NavbarItemConfig[];
}

function NavbarItems({ items }: { items: NavbarItemConfig[] }): JSX.Element {
  return (
    <>
      {items.map((item, i) => (
        <ErrorCauseBoundary
          key={i}
          onError={(error) =>
            new Error(
              `A theme navbar item failed to render.
Please double-check the following navbar item (themeConfig.navbar.items) of your Docusaurus config:
${JSON.stringify(item, null, 2)}`,
              //@ts-ignore
              { cause: error },
            )
          }
        >
          <NavbarItem className={styles.navbarItemExt} {...item} />
        </ErrorCauseBoundary>
      ))}
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
      <NavbarLogo />
      <div
        className={clsx(
          'navbar__items',
          'navbar__items--right',
          styles.navbarItemsExt,
        )}
      >
        {right}
      </div>
    </div>
  );
}

export default function NavbarContent(): JSX.Element {
  const mobileSidebar = useNavbarMobileSidebar();

  const items = useNavbarItems();
  const [leftItems, rightItems] = splitNavbarItems(items);
  const searchBarItem = items.find((item) => item.type === 'search');
  const [modalMeta, setModalMeta] = useState<{
    initialNo?: string;
    opened: boolean;
  }>({
    opened: false,
  });

  return (
    <NavbarContentLayout
      left={
        // TODO stop hardcoding items?
        <>
          {!searchBarItem && (
            <NavbarSearch>
              <SearchBar />
            </NavbarSearch>
          )}
          {!mobileSidebar.disabled && <NavbarMobileSidebarToggle />}
          <NavbarColorModeToggle className={styles.colorModeToggle} />
          <ActionIcon
            visibleFrom="lg"
            component="a"
            href="https://github.com/indiebase/indiebase"
            ml={15}
            target="_blank"
            variant="transparent"
            color="rgba(0, 0, 0, 1)"
            aria-label="github"
            onClick={() => {}}
          >
            <IconBrandGithub style={{ width: '75%', height: '75%' }} />
          </ActionIcon>
          <NavbarItems items={leftItems} />
        </>
      }
      right={
        <Group
          wrap="nowrap"
          visibleFrom="md"
          mx={20}
          style={{ height: '100%' }}
        >
          <NavbarItems items={rightItems} />
          <Divider mr={10} orientation="vertical" />
          <Anchor
            size="sm"
            style={{
              color: 'var(--ifm-navbar-link-color)',
              whiteSpace: 'nowrap',
            }}
            // onClick={(e) => {
            //   setModalMeta({ opened: true });
            // }}
          >
            Sign in & Sign up
          </Anchor>
          <SignInAndUpModal
            opened={modalMeta.opened}
            onClose={() => setModalMeta({ opened: false })}
          />
        </Group>
      }
    />
  );
}
