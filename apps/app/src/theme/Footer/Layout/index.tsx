import React from 'react';
import clsx from 'clsx';
import type { Props } from '@theme/Footer/Layout';
import { Stack } from '@mantine/core';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';

export default function FooterLayout({
  style,
  links,
  logo,
  copyright,
}: Props): JSX.Element {
  const {
    siteConfig: { customFields },
  } = useDocusaurusContext();

  const { icp } = customFields as any;

  return (
    <footer
      className={clsx('footer', {
        'footer--dark': style === 'dark',
      })}
    >
      <div className="container container-fluid">
        {links}
        <Stack align="center">
          {icp && (
            <Link style={{ color: '#0099FF', fontSize: 14 }} href={icp.href}>
              {icp.label}
            </Link>
          )}
          {(logo || copyright) && (
            <div className="footer__bottom text--center">
              {logo && <div className="margin-bottom--sm">{logo}</div>}
              {copyright}
            </div>
          )}
        </Stack>
      </div>
    </footer>
  );
}
