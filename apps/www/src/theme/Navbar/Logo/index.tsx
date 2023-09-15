import React from 'react';
import Logo from '@theme/Logo';
import { logo } from './styles.css.ts';
import clsx from 'clsx';

export default function NavbarLogo(): JSX.Element {
  return (
    <Logo
      className={clsx('navbar__brand', logo)}
      imageClassName="navbar__logo"
      titleClassName="navbar__title text--truncate"
    />
  );
}
