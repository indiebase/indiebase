import { atom } from 'jotai';
import { atomWithStorage, createJSONStorage } from 'jotai/utils';

import { KEYS } from '~/constants';
import { jotaiLocalStorage } from '~/utils';

export const navbarCollapseAtom = atom({
  mobile: false,
  desktop: true,
});

export const navMenuAtom = atom([]);

export const expandedAllNavMenusAtom = atomWithStorage<boolean>(
  KEYS.v0_expanded_all_nav_menus,
  undefined,
);
