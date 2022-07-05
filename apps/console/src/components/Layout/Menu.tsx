import {
  Stack,
  Button,
  Text,
  Box,
  Group,
  Navbar,
  ScrollArea,
} from '@mantine/core';
import { FC } from 'react';
import { useMenu } from '../../use-menu';

export interface MenuProps {
  opened: boolean;
}

export const Menu: FC<MenuProps> = function (props) {
  const menuTree = useMenu();

  return (
    <Navbar
      p="md"
      hiddenBreakpoint="sm"
      width={{ sm: 200, lg: 300 }}
      height="100vh"
      hidden={props.opened}
    >
      {/* <Navbar.Section mt="xs">a</Navbar.Section>
      <Navbar.Section grow component={ScrollArea} mx="-xs" px="xs">
        <Box py="md"></Box>
      </Navbar.Section>
      <Navbar.Section>a</Navbar.Section> */}
    </Navbar>
  );
};
