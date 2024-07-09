'use client';

import { createScope, molecule } from 'bunshi/react';
import { atom } from 'jotai';
import { atomWithStorage } from 'jotai/utils';

import { KEYS } from '~/constants';
import { atomWithMutexArrayStorage } from '~/utils/atoms';

/**
 * Indiebase has two mode.
 *
 * `backend` is the BaaS.\
 * `collaborate` provides the financial services for your project.
 */
export type NavMode = 'backend' | 'collaborate';

export type NavbarScope = {
  collapsed: { mobile: boolean; desktop: boolean } | null;
  menus: any[] | null;
  expandedMenus: string[];
  mode: NavMode;
};

export const NavbarScope = createScope<NavbarScope>({
  collapsed: { mobile: false, desktop: true },
  menus: [],
  expandedMenus: [],
  mode: 'backend',
});

export const NavbarMolecule = molecule((_mol, scope) => {
  const { collapsed, menus, expandedMenus } = scope(NavbarScope);

  const collapsedAtom = atom(collapsed);
  const menusAtom = atom(menus);
  const expandedMenusAtom = atomWithMutexArrayStorage(
    KEYS.v0_expanded_all_nav_menus,
    expandedMenus,
  );
  const modeAtom = atomWithStorage<NavMode>(KEYS.v0_nav_mode, 'backend');

  return {
    collapsedAtom,
    menusAtom,
    expandedMenusAtom,
    modeAtom,
    // addExpandedMenu,
  } as const;
});
