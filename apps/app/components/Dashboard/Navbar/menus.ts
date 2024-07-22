import { baasMenus } from './backend.menus';
import { collectiveMenus } from './collective.menus';
import { type NavMode } from './navbar.molecule';

export function getMenus(mode: NavMode) {
  switch (mode) {
    case 'backend':
      return baasMenus;
    case 'collective':
      return collectiveMenus;
    default:
      break;
  }
}
