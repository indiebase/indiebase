'use client';

import { ActionIcon, Flex, Group, rem, Tooltip } from '@mantine/core';
import {
  IconAffiliate,
  IconCloud,
  IconFolder,
  IconFolderOpen,
} from '@tabler/icons-react';
import { useMolecule } from 'bunshi/react';
import { useAtom } from 'jotai';
import { type FC, useMemo } from 'react';

import { useSetStorageAtom } from '~/utils/atoms';

import { NavbarMolecule } from './navbar.molecule';
import { type NavMenuItem } from './types';

export function walkChildren(
  menus: NavMenuItem[],
  callback: (menu: NavMenuItem) => void,
) {
  const stack = [menus];

  while (stack.length > 0) {
    const currentMenus = stack.shift()!;

    for (const m of currentMenus) {
      if (m) {
        if (Array.isArray(m.children)) {
          stack.push(m.children);
        }

        callback(m);
      }
    }
  }
}

export const ActionsBar: FC<any> = function () {
  const navbarMolecule = useMolecule(NavbarMolecule);
  const [expandedAllMenus, setExpandedAllMenus] = useAtom(
    navbarMolecule.expandedAllMenusAtom,
  );
  const [menus] = useAtom(navbarMolecule.menusAtom);
  const [_, { add, has, remove, clear }] = useSetStorageAtom(
    navbarMolecule.expandedMenusAtom,
  );
  const [mode, setMode] = useAtom(navbarMolecule.modeAtom);

  function toggle() {
    if (expandedAllMenus) {
      clear();
    } else {
      const dirs = [];
      walkChildren(menus, (e) => {
        if (Array.isArray(e.children)) {
          dirs.push(e.href);
        }
      });
      add(dirs);
    }
    setExpandedAllMenus(!expandedAllMenus);
  }

  const actions = useMemo(() => {
    let modeOption;

    switch (mode) {
      case 'collective':
        modeOption = {
          label: 'Backend',
          icon: <IconCloud size={13} />,
          onClick() {
            setMode('backend');
          },
        };

        break;
      case 'backend':
        modeOption = {
          label: 'Collective',
          icon: <IconAffiliate size={13} />,
          onClick() {
            setMode('collective');
          },
        };
        break;
      default:
        break;
    }

    return [
      modeOption,
      expandedAllMenus
        ? {
            label: 'Collapse all',
            icon: <IconFolderOpen size={13} />,
            onClick: toggle,
          }
        : {
            label: 'Expand all',
            icon: <IconFolder size={13} />,
            onClick: toggle,
          },
    ];
  }, [mode, expandedAllMenus]);

  return (
    <Flex
      align="center"
      pos="relative"
      justify="flex-end"
      component="nav"
      mt={10}
      px={rem(13)}
    >
      <Group gap="xs">
        {actions.map(
          (item, index) =>
            item && (
              <Tooltip
                key={item.label + index}
                label={item.label}
                openDelay={500}
              >
                <ActionIcon
                  variant="default"
                  style={{ border: 'none' }}
                  size="xs"
                  onClick={item.onClick}
                >
                  {item.icon}
                </ActionIcon>
              </Tooltip>
            ),
        )}
      </Group>
    </Flex>
  );
};
