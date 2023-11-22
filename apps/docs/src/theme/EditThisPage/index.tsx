import React from 'react';
import Translate from '@docusaurus/Translate';
import { ThemeClassNames } from '@docusaurus/theme-common';
import type { Props } from '@theme/EditThisPage';
import { IconPencil } from '@tabler/icons-react';
import { rem } from '@mantine/core';

export default function EditThisPage({ editUrl }: Props): JSX.Element {
  return (
    <a
      href={editUrl}
      target="_blank"
      rel="noreferrer noopener"
      className={ThemeClassNames.common.editThisPage}
      style={{ display: 'flex', alignItems: 'center' }}
    >
      <Translate
        id="theme.common.editThisPage"
        description="The link label to edit the current page"
      >
        Edit this page
      </Translate>
      <IconPencil style={{ width: rem(18), marginLeft: rem(5) }} />
    </a>
  );
}
