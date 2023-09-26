import React from 'react';
import Link from '@docusaurus/Link';
import useBaseUrl from '@docusaurus/useBaseUrl';
import { translate } from '@docusaurus/Translate';
import styles from './styles.module.css';
import { IconHome2 } from '@tabler/icons-react';

export default function HomeBreadcrumbItem(): JSX.Element {
  const homeHref = useBaseUrl('/');

  return (
    <li className="breadcrumbs__item">
      <Link
        aria-label={translate({
          id: 'theme.docs.breadcrumbs.home',
          message: 'Home page',
          description: 'The ARIA label for the home page in the breadcrumbs',
        })}
        className="breadcrumbs__link"
        href={homeHref}
      >
        <IconHome2 className={styles.breadcrumbHomeIcon} />
      </Link>
    </li>
  );
}
