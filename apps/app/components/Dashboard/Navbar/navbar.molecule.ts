'use client';

import { createScope, molecule } from 'bunshi/react';
import { atom } from 'jotai';
import { atomWithStorage } from 'jotai/utils';

import { KEYS } from '~/constants';

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
  expandedAllMenus: boolean;
  mode: NavMode;
};

export const NavbarScope = createScope<NavbarScope>({
  collapsed: { mobile: false, desktop: true },
  menus: [],
  expandedAllMenus: false,
  mode: 'backend',
});

export const NavbarMolecule = molecule((_mol, scope) => {
  const { collapsed, menus, expandedAllMenus } = scope(NavbarScope);

  const collapsedAtom = atom(collapsed);
  const menusAtom = atom(menus);
  const expandedAllMenusAtom = atomWithStorage<boolean>(
    KEYS.v0_expanded_all_nav_menus,
    expandedAllMenus,
  );
  const modeAtom = atomWithStorage<NavMode>(KEYS.v0_nav_mode, 'backend');

  return {
    collapsedAtom,
    menusAtom,
    expandedAllMenusAtom,
    modeAtom,
  } as const;
});
