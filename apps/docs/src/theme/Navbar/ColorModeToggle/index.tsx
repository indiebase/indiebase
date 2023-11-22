import React from 'react';
import { useColorMode, useThemeConfig } from '@docusaurus/theme-common';
import type { Props } from '@theme/Navbar/ColorModeToggle';
import { ActionIcon } from '@mantine/core';
import { IconMoon, IconSunLow } from '@tabler/icons-react';
import useIsBrowser from '@docusaurus/useIsBrowser';
import { translate } from '@docusaurus/Translate';

export default function NavbarColorModeToggle({
  className,
}: Props): JSX.Element | null {
  const disabled = useThemeConfig().colorMode.disableSwitch;
  const { colorMode, setColorMode } = useColorMode();
  const isBrowser = useIsBrowser();

  const title = translate(
    {
      message: 'Switch between dark and light mode (currently {mode})',
      id: 'theme.colorToggle.ariaLabel',
      description: 'The ARIA label for the navbar color mode toggle',
    },
    {
      mode:
        colorMode === 'dark'
          ? translate({
              message: 'dark mode',
              id: 'theme.colorToggle.ariaLabel.mode.dark',
              description: 'The name for the dark color mode',
            })
          : translate({
              message: 'light mode',
              id: 'theme.colorToggle.ariaLabel.mode.light',
              description: 'The name for the light color mode',
            }),
    },
  );

  if (disabled) {
    return null;
  }

  return (
    <ActionIcon
      disabled={!isBrowser}
      className={className}
      variant="transparent"
      color="rgba(0, 0, 0, 1)"
      title={title}
      aria-label={title}
      aria-live="polite"
      onClick={() => {
        return;
        setColorMode(colorMode === 'dark' ? 'light' : 'dark');
      }}
    >
      {colorMode === 'dark' ? (
        <IconMoon style={{ width: '70%', height: '70%' }} />
      ) : (
        <IconSunLow style={{ width: '90%', height: '90%' }} />
      )}
    </ActionIcon>
  );
}
