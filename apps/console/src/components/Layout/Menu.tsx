import {
  Text,
  Box,
  Group,
  Navbar,
  ScrollArea,
  ThemeIcon,
  UnstyledButton,
  Accordion,
} from '@mantine/core';
import { FC, useState } from 'react';
import { Link, Navigate, NavLink, useNavigate } from 'react-router-dom';
import { useMenu } from '../../use-menu';

export interface MenuProps {
  opened: boolean;
}

interface MenuItemProps {
  label: string;
  active: boolean;
  onClick?: (e: any) => void;
}

function MenuItem({ label, active, onClick }: MenuItemProps) {
  return (
    // <Link to={'/home'}>
    <UnstyledButton
      onClick={onClick}
      sx={(theme) => ({
        display: 'block',
        width: '100%',
        padding: theme.spacing.xs,
        paddingLeft: 20,
        borderRadius: theme.radius.sm,
        color: active ? theme.colors.blue[6] : 'none',
        fontSize: theme.fontSizes.xs,
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
    // </Link>
  );
}

export const Menu: FC<MenuProps> = function (props) {
  const menuTree = useMenu();
  const [active, setActive] = useState(null);
  const navigate = useNavigate();

  return (
    <Navbar
      p="md"
      hiddenBreakpoint="sm"
      width={{ sm: 200, lg: 250 }}
      style={{ borderRight: 0 }}
      hidden={props.opened}
      onClick={(e) => {
        setActive(null);
      }}
    >
      <Navbar.Section grow component={ScrollArea} mx="-xs" px="xs">
        <Accordion
          disableIconRotation
          transitionDuration={0}
          offsetIcon={false}
          multiple
          styles={(theme) => ({
            item: { borderBottom: 0 },
            contentInner: { padding: 0 },
            itemTitle: { borderRadius: theme.radius.sm, overflow: 'hidden' },
          })}
        >
          {menuTree.map((node, index1) => {
            return (
              <Accordion.Item
                key={index1}
                label={node.label}
                icon={
                  <ThemeIcon color={node.color} variant="light">
                    {node.icon}
                  </ThemeIcon>
                }
              >
                {node?.children.map((sub, index2) => {
                  const index = parseInt(`${index1}${index2}`);
                  return (
                    <MenuItem
                      key={index}
                      active={index === active}
                      label={sub.label}
                      onClick={(e) => {
                        e.stopPropagation();
                        setActive(index);
                        navigate(sub.to);
                      }}
                    />
                  );
                })}
              </Accordion.Item>
            );
          })}
        </Accordion>
      </Navbar.Section>
      <Navbar.Section>a</Navbar.Section>
    </Navbar>
  );
};
