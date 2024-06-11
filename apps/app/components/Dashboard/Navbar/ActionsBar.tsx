import { ActionIcon, Flex, Group, rem } from '@mantine/core';
import { IconArrowsVertical } from '@tabler/icons-react';
import { useAtom } from 'jotai';
import type { FC } from 'react';

import { expandedAllNavMenusAtom } from './navbar.atom';

export const ActionsBar: FC<any> = function () {
  const [expended, toggle] = useAtom(expandedAllNavMenusAtom);
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
        <ActionIcon
          variant="default"
          style={{ border: 'none' }}
          size="xs"
          onClick={() => {
            toggle(!expended);
          }}
        >
          <IconArrowsVertical size={13} />
        </ActionIcon>
      </Group>
    </Flex>
  );
};
