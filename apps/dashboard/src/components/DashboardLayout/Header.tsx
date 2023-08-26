import {
  Burger,
  useMantineTheme,
  Group,
  Anchor,
  Avatar,
  Text,
  Divider,
  AppShell
} from '@mantine/core';
import { FC, forwardRef } from 'react';
import { Link } from 'react-router-dom';
import { IconBuildingCommunity } from '@tabler/icons-react';
import { useAtom } from 'jotai';

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
  ({ logo, label, ...rest }, ref) => {
    return (
      <div ref={ref} {...rest}>
        <Group>
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
  // const [opened, toggle] = useAtom(navbarSwitchAtom);

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
      // position="apart"
      >
        <Group>
          {/* <MediaQuery largerThan="sm" styles={{ display: 'none' }}>
            <Burger
              opened={opened}
              onClick={() => toggle(!opened)}
              size="sm"
              color={theme.colors.gray[6]}
            />
          </MediaQuery>
          <MediaQuery smallerThan="sm" styles={{ display: 'none', width: 100 }}>
            {props.leading}
          </MediaQuery> */}
        </Group>

        <Anchor
          component={Link}
          to={props.basename}
          reloadDocument={false}
          style={{
            textDecoration: 'none',
            position: 'absolute',
            left: '50%',
            marginLeft: `-${props.logoWidth / 2}px`,
          }}
        >
          {props.logo}
        </Anchor>

        <Group>
          {/* <MediaQuery smallerThan="sm" styles={{ display: 'none' }}>
            <Group>
              <Group>{props.nav}</Group>
              <Divider mr={10} orientation="vertical" />
              <Group mr={30}>{props.menu}</Group>
            </Group>
          </MediaQuery> */}
        </Group>
      </Group>
    </MantineHeader>
  );
};
