import { ActionIcon, Flex, Group, rem, Tooltip } from '@mantine/core';
import {
  IconAffiliate,
  IconArrowsVertical,
  IconCloud,
} from '@tabler/icons-react';
import { useMolecule } from 'bunshi/react';
import { useAtom } from 'jotai';
import { type FC, useMemo } from 'react';

import { NavbarMolecule } from './navbar.molecule';

export const ActionsBar: FC<any> = function () {
  const navbarMolecule = useMolecule(NavbarMolecule);
  const [expanded, toggle] = useAtom(navbarMolecule.expandedAllMenusAtom);
  const [mode, setMode] = useAtom(navbarMolecule.modeAtom);

  const actions = useMemo(() => {
    let modeOption;

    switch (mode) {
      case 'collaborate':
        modeOption = {
          label: 'Backend',
          icon: <IconCloud size={13} />,
          onClick() {
            setMode('backend');
          },
        };

        break;
      case 'backend':
        modeOption = {
          label: 'Collaborate',
          icon: <IconAffiliate size={13} />,
          onClick() {
            setMode('collaborate');
          },
        };
        break;
      default:
        break;
    }

    return [
      modeOption,
      {
        label: 'Expand all',
        icon: <IconArrowsVertical size={13} />,
        onClick() {
          toggle(!expanded);
        },
      },
    ];
  }, [mode, expanded]);

  return (
    <Flex
      align="center"
      pos="relative"
      justify="flex-end"
      component="nav"
      mt={10}
      px={rem(13)}
    >
      <Group gap="xs">
        {actions.map((item, index) => (
          <Tooltip key={item.label + index} label={item.label} openDelay={500}>
            <ActionIcon
              variant="default"
              style={{ border: 'none' }}
              size="xs"
              onClick={item.onClick}
            >
              {item.icon}
            </ActionIcon>
          </Tooltip>
        ))}
      </Group>
    </Flex>
  );
};
