'use client';

import { createScope, molecule } from 'bunshi/react';
import { atom } from 'jotai';
import { atomWithStorage } from 'jotai/utils';

import { KEYS } from '~/constants';
import { atomWithSetStorage } from '~/utils/atoms';

/**
 * Indiebase has two mode.
 *
 * `backend` is the BaaS.
 * `collaborate` provides the financial services for your project.
 */
export type NavMode = 'backend' | 'collective';

export interface NavbarScope {
  collapsed: { mobile: boolean; desktop: boolean } | null;
  hidden?: boolean;
  expandedMenus: string[];
  expandedAllMenus: boolean;
  shouldRender: boolean;
}

export const NavbarScope = createScope<NavbarScope>({
  collapsed: { mobile: false, desktop: true },
  expandedMenus: [],
  hidden: true,
  expandedAllMenus: false,
  shouldRender: false,
});

export const NavbarMolecule = molecule((_mol, scope) => {
  const {
    hidden: _hidden,
    collapsed: _collapsed,
    expandedMenus: _expandedMenus,
    expandedAllMenus: _expandedAllMenus,
  } = scope(NavbarScope);

  const hiddenAtom = atom(_hidden);

  const collapsedAtom = atomWithStorage(
    KEYS.v0_nav_collapsed,
    _collapsed,
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

  const expandedMenusAtom = atomWithSetStorage(
    KEYS.v0_expanded_nav_menus,
    _expandedMenus,
  );

  return {
    collapsedAtom,
    expandedMenusAtom,
    expandedAllMenusAtom,
    hiddenAtom,
  } as const;
});
