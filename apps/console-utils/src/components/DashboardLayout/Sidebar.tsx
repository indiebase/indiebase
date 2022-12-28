import {
  Text,
  Group,
  Navbar,
  ScrollArea,
  ThemeIcon,
  UnstyledButton,
  Accordion,
  MantineThemeColors,
} from '@mantine/core';
import { useAtomValue } from 'jotai';
import React, { FC } from 'react';
import { useNavigate, NavLink } from 'react-router-dom';
import { navbarSwitchAtom } from '../../atoms';

export interface SidebarTileNode {
  label: string;
  to?: string;
  replace?: boolean;
  type?: 'node' | 'link';
  icon?: React.ReactNode;
  color?: keyof MantineThemeColors;
  children?: SidebarTileNode[];
  access?: string[];
  onClick?: () => Promise<void> | void;
}
export interface SidebarProps {
  menu: SidebarTileNode[];
}

interface MenuItemProps {
  label: string;
  active: boolean;
  onClick?: (e: any) => void;
}

function SidebarTile({ label, active, onClick }: MenuItemProps) {
  return (
    <UnstyledButton
      onClick={onClick}
      sx={(theme) => ({
        display: 'block',
        width: '100%',
        padding: theme.spacing.xs,
        paddingLeft: 20,
        borderRadius: theme.radius.sm,
        color: active ? theme.colors.blue[6] : theme.colors.gray[7],
        fontSize: 13,
        backgroundColor: active ? theme.colors.gray[0] : 'none',
        fontWeight: active ? 'bolder' : 'unset',
        '&:hover': {
          backgroundColor:
            theme.colorScheme === 'dark'
              ? theme.colors.dark[6]
              : theme.colors.gray[0],
        },
      })}
    >
      <Group>
        <Text size="sm">{label}</Text>
      </Group>
    </UnstyledButton>
  );
}

export const Sidebar: FC<SidebarProps> = function (props) {
  const navigate = useNavigate();
  const opened = useAtomValue(navbarSwitchAtom);

  return (
    <Navbar
      p="md"
      position={{ top: 65 }}
      hiddenBreakpoint="sm"
      width={{ sm: 200, lg: 250 }}
      style={{ borderRight: 0, zIndex: 'unset' }}
      hidden={opened}
    >
      <Navbar.Section grow component={ScrollArea} mx="-xs" px="xs">
        <Accordion
          disableChevronRotation
          transitionDuration={0}
          chevronPosition="right"
          variant="contained"
          multiple
          styles={(theme) => ({
            item: { borderBottom: 0 },
            contentInner: { padding: 0 },
            itemTitle: { borderRadius: theme.radius.sm, overflow: 'hidden' },
          })}
        >
          {props.menu.map((node, index1) => {
            const children = node?.children;
            return (
              <Accordion.Item
                key={index1}
                value={node.label}
                style={{
                  border: 'none',
                  backgroundColor: 'unset',
                }}
              >
                <Accordion.Control
                  pl={8}
                  onClick={(e) => {
                    e.stopPropagation();
                    node.to && navigate(node.to, { replace: node.replace });
                  }}
                  chevron={children ? null : <span></span>}
                  icon={
                    <ThemeIcon color={node.color} variant="light">
                      {node.icon}
                    </ThemeIcon>
                  }
                >
                  <Text weight={500}>{node.label}</Text>
                </Accordion.Control>
                {children ? (
                  <Accordion.Panel>
                    {children?.map((sub, index2) => {
                      const index = parseInt(`${index1}${index2}`);
                      return (
                        <NavLink key={index} to={sub.to}>
                          {({ isActive }) => (
                            <SidebarTile active={isActive} label={sub.label} />
                          )}
                        </NavLink>
                      );
                    })}
                  </Accordion.Panel>
                ) : null}
              </Accordion.Item>
            );
          })}
        </Accordion>
      </Navbar.Section>
      {/* <Navbar.Section>a</Navbar.Section> */}
    </Navbar>
  );
};