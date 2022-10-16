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
import { FC } from 'react';
import { useNavigate, NavLink } from 'react-router-dom';
import React from 'react';

export interface MenuNode {
  label: string;
  to?: string;
  replace?: boolean;
  type?: 'node' | 'link';
  icon?: React.ReactNode;
  color?: keyof MantineThemeColors;
  children?: MenuNode[];
  onClick?: () => Promise<void> | void;
}
export interface MenuProps {
  opened: boolean;
  menu: MenuNode[];
}

interface MenuItemProps {
  label: string;
  active: boolean;
  onClick?: (e: any) => void;
}

function MenuItem({ label, active, onClick }: MenuItemProps) {
  console.log(active, label);
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

export const Menu: FC<MenuProps> = function (props) {
  const navigate = useNavigate();

  return (
    <Navbar
      p="md"
      position={{ top: 65 }}
      hiddenBreakpoint="sm"
      width={{ sm: 200, lg: 250 }}
      style={{ borderRight: 0, zIndex: 'unset' }}
      hidden={props.opened}
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
            return (
              <Accordion.Item
                key={index1}
                value={node.label}
                style={{
                  border: 'none',
                  backgroundColor: 'unset',
                }}
                onClick={(e) => {
                  e.stopPropagation();
                  node.to && navigate(node.to, { replace: node.replace });
                }}
              >
                <Accordion.Control
                  pl={8}
                  icon={
                    <ThemeIcon color={node.color} variant="light">
                      {node.icon}
                    </ThemeIcon>
                  }
                >
                  <Text weight={500}>{node.label}</Text>
                </Accordion.Control>

                <Accordion.Panel>
                  {node?.children?.map((sub, index2) => {
                    const index = parseInt(`${index1}${index2}`);
                    return (
                      <NavLink key={index} to={sub.to}>
                        {({ isActive }) => (
                          <MenuItem active={isActive} label={sub.label} />
                        )}
                      </NavLink>
                    );
                  })}
                </Accordion.Panel>
              </Accordion.Item>
            );
          })}
        </Accordion>
      </Navbar.Section>
      {/* <Navbar.Section>a</Navbar.Section> */}
    </Navbar>
  );
};
