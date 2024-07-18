'use client';

import { createScope, molecule } from 'bunshi/react';
import { atom } from 'jotai';
import { atomWithStorage } from 'jotai/utils';

import { KEYS } from '~/constants';
import { atomWithSetStorage } from '~/utils/atoms';

import { baasMenus } from './backend.menu';
import { collaborateMenus } from './collective.menu';
import { type NavMenuItem } from './types';

/**
 * Indiebase has two mode.
 *
 * `backend` is the BaaS.
 * `collaborate` provides the financial services for your project.
 */
export type NavMode = 'backend' | 'collective';

export type NavbarScope = {
  collapsed: { mobile: boolean; desktop: boolean } | null;
  menus: any[] | null;
  expandedMenus: string[];
  expandedAllMenus: boolean;
  mode: NavMode | null;
};

export const NavbarScope = createScope<NavbarScope>({
  collapsed: { mobile: false, desktop: true },
  menus: [],
  expandedMenus: [],
  expandedAllMenus: false,
  mode: 'backend',
});

export const NavbarMolecule = molecule((_mol, scope) => {
  const {
    collapsed: _collapsed,
    menus: _menus,
    expandedMenus: _expandedMenus,
    expandedAllMenus: _expandedAllMenus,
    mode: _mode,
  } = scope(NavbarScope);

  const collapsedAtom = atomWithStorage(
    KEYS.v0_nav_collapsed,
    _collapsed,
    undefined,
    {
      getOnInit: true,
    },
  );

  const _modeAtom = atomWithStorage<NavMode>(
    KEYS.v0_nav_mode,
    _mode,
    undefined,
    {
      getOnInit: true,
    },
  );

  const expandedAllMenusAtom = atomWithStorage<boolean>(
    KEYS.v0_expanded_all_nav_menus,
    _expandedAllMenus,
    undefined,
    {
      getOnInit: true,
    },
  );

  const menusAtom = atom<NavMenuItem[]>((get) => {
    const mode = get(_modeAtom);
    switch (mode) {
      case 'backend':
        return baasMenus;
      case 'collective':
        return collaborateMenus;
      default:
        break;
    }
  });

  const modeAtom = atom(
    (get) => {
      return get(_modeAtom);
    },
    (_get, set, nextValue?: NavMode) => {
      set(_modeAtom, nextValue);
    },
  );

  const expandedMenusAtom = atomWithSetStorage(
    KEYS.v0_expanded_nav_menus,
    _expandedMenus,
  );

  return {
    collapsedAtom,
    menusAtom,
    expandedMenusAtom,
    expandedAllMenusAtom,
    modeAtom,
  } as const;
});
