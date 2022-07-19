import {
  Text,
  Group,
  Navbar,
  ScrollArea,
  ThemeIcon,
  UnstyledButton,
  Accordion,
} from '@mantine/core';
import { FC, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export interface MenuNode {
  label: string;
  to?: string;
  icon?: React.ReactNode;
  color?: string;
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
  // const menuTree = useMenu();
  const [active, setActive] = useState<number | null>(null);
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
          {props.menu.map((node, index1) => {
            return (
              <Accordion.Item
                key={index1}
                label={node.label}
                onClick={(e) => {
                  if (node.children && node.children?.length <= 0) {
                    return;
                  }
                  e.stopPropagation();
                  setActive(null);
                  navigate(node.to!);
                }}
                icon={
                  <ThemeIcon color={node.color} variant="light">
                    {node.icon}
                  </ThemeIcon>
                }
              >
                {node?.children?.map((sub, index2) => {
                  const index = parseInt(`${index1}${index2}`);
                  return (
                    <MenuItem
                      key={index}
                      active={index === active}
                      label={sub.label}
                      onClick={(e) => {
                        e.stopPropagation();
                        setActive(index);
                        navigate(sub.to!);
                      }}
                    />
                  );
                })}
              </Accordion.Item>
            );
          })}
        </Accordion>
      </Navbar.Section>
      {/* <Navbar.Section>a</Navbar.Section> */}
    </Navbar>
  );
};
