import {
  MediaQuery,
  Header as MantineHeader,
  Burger,
  useMantineTheme,
  Group,
  Anchor,
  Avatar,
  Text,
  Divider,
} from '@mantine/core';
import { FC, forwardRef } from 'react';
import { Link } from 'react-router-dom';
import { IconBuildingCommunity } from '@tabler/icons';
import { useAtom } from 'jotai';
import { navbarSwitchAtom } from '../../atoms';

export interface NavHeaderProps {
  onNavbarOpen?: () => void;
  logo: React.ReactNode;
  logoWidth: number;
  nav?: React.ReactNode;
  basename: string;
  menu?: React.ReactElement;
  leading?: React.ReactElement;
}

export interface OrgSelectProps extends React.ComponentPropsWithoutRef<'div'> {
  logo: string;
  label: string;
  value: string;
}

export const SelectItem = forwardRef<HTMLDivElement, OrgSelectProps>(
  ({ logo, label, value, ...rest }, ref) => {
    return (
      <div ref={ref} {...rest}>
        <Group noWrap spacing={7}>
          {logo && (
            <Avatar src={logo} radius="xl" size={15}>
              <IconBuildingCommunity size={12} />
            </Avatar>
          )}
          <Text lineClamp={1} size="xs">
            {label}
          </Text>
        </Group>
      </div>
    );
  },
);

export const Header: FC<NavHeaderProps> = function (props) {
  const theme = useMantineTheme();
  const [opened, toggle] = useAtom(navbarSwitchAtom);

  return (
    <MantineHeader
      fixed
      sx={{
        borderBottom: 'unset',
        backdropFilter: 'saturate(180%) blur(10px)',
        backgroundColor: 'hsla(0,0%,100%,.7)',
        alignItems: 'center',
      }}
      height={65}
      // styles={{ root: { zIndex: 0 } }}
      p="md"
    >
      <Group
        position="apart"
        sx={(theme) => ({
          height: '100%',
          a: {
            textDecoration: 'none',
            color: theme.colors.dark[6],
            fontSize: 14,
          },
        })}
      >
        <Group>
          <MediaQuery largerThan="sm" styles={{ display: 'none' }}>
            <Burger
              opened={opened}
              onClick={() => toggle(!opened)}
              size="sm"
              color={theme.colors.gray[6]}
            />
          </MediaQuery>
          <MediaQuery smallerThan="sm" styles={{ display: 'none', width: 100 }}>
            {props.leading}
          </MediaQuery>
        </Group>

        <Anchor
          component={Link}
          to={props.basename}
          reloadDocument={false}
          underline={false}
          style={{
            position: 'absolute',
            left: '50%',
            marginLeft: `-${props.logoWidth / 2}px`,
          }}
        >
          {props.logo}
        </Anchor>

        <Group
          sx={() => ({
            height: '100%',
          })}
        >
          <MediaQuery smallerThan="sm" styles={{ display: 'none' }}>
            <Group
              sx={() => ({
                height: '100%',
              })}
            >
              <Group sx={{ marginRight: 10, height: '100%' }} spacing="xl">
                {props.nav}
              </Group>
              <Divider mr={10} orientation="vertical" />
              <Group mr={30} spacing={6}>
                {props.menu}
              </Group>
            </Group>
          </MediaQuery>
        </Group>
      </Group>
    </MantineHeader>
  );
};
