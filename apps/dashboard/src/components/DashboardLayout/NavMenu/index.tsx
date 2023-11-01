import {
  Accordion,
  Group,
  MantineThemeColors,
  ThemeIcon,
  UnstyledButton,
  Text,
} from '@mantine/core';
import { FC, useEffect, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { navMenuTile } from './NavMenu.css';
import { useMenu } from '~/use-menu';

export interface NavMenuTile {
  label: string;
  to?: string;
  replace?: boolean;
  type?: 'node' | 'link';
  icon?: React.ReactNode;
  color?: keyof MantineThemeColors;
  children?: NavMenuTile[];
  access?: string[];
  onClick?: () => Promise<void> | void;
}

const useAccordionControl = function (menu: NavMenuTile[]) {
  const [value, setValue] = useState<string[]>([]);
  const location = useLocation();

  useEffect(() => {
    for (const item of menu) {
      if (Array.isArray(item.children)) {
        const r = item.children.find((e) => location.pathname.includes(e.to!));
        if (r) {
          setValue([...value, item.label]);
          break;
        }
      }
    }
  }, [location.pathname, menu, value]);

  return [value, setValue];
};

interface NavMenuTileProps {
  label: string;
  active: boolean;
}

function SidebarTile({ label, active, onClick }: any) {
  return (
    <UnstyledButton
      onClick={onClick}
      // sx={(theme) => ({
      //   display: 'block',
      //   width: '100%',
      //   padding: theme.spacing.xs,
      //   paddingLeft: 20,
      //   borderRadius: theme.radius.sm,
      //   color: active ? theme.colors.blue[6] : theme.colors.gray[7],
      //   fontSize: 13,
      //   backgroundColor: active ? theme.colors.gray[0] : 'none',
      //   fontWeight: active ? 'bolder' : 'unset',
      //   '&:hover': {
      //     backgroundColor:
      //       theme.colorScheme === 'dark'
      //         ? theme.colors.dark[6]
      //         : theme.colors.gray[0],
      //   },
      // })}
    >
      <Group>
        <Text size="sm">{label}</Text>
      </Group>
    </UnstyledButton>
  );
}

const NavMenuTile: FC<NavMenuTileProps> = function ({ label, active }) {
  return (
    <UnstyledButton className={navMenuTile[active ? 'active' : 'inactive']}>
      <Group>
        <Text size="sm">{label}</Text>
      </Group>
    </UnstyledButton>
  );
};

export const NavMenu: FC<any> = function (props) {
  // const [value, setValue] = useAccordionControl(props.menu);

  const menu = useMenu();

  return (
    <Accordion
      disableChevronRotation
      transitionDuration={0}
      chevronPosition="right"
      variant="contained"
      multiple
      // value={value as string[]}
      // onChange={setValue as any}
      styles={(theme) => ({
        item: { borderBottom: 0 },
        contentInner: { padding: 0 },
        itemTitle: { borderRadius: theme.radius.sm, overflow: 'hidden' },
      })}
    >
      {menu.map((node: any) => {
        const children = node?.children;

        return (
          <Accordion.Item
            key={node.label}
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
                // node.to && navigate(node.to, { replace: node.replace });
              }}
              chevron={children ? null : <span />}
              icon={
                <ThemeIcon color={node.color} variant="light">
                  {node.icon}
                </ThemeIcon>
              }
            >
              {/* <Text weight={500}>{node.label}</Text> */}
            </Accordion.Control>
            {children ? (
              <Accordion.Panel>
                {children?.map((sub) => {
                  return (
                    <NavLink key={sub.label} to={sub.to}>
                      {({ isActive }) => (
                        <NavMenuTile active={isActive} label={sub.label} />
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
  );
};
