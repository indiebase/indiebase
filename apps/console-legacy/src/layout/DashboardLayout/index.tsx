import { FC, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { styled, useTheme } from '@mui/material/styles';
import {
  AppBar,
  Box,
  CssBaseline,
  Toolbar,
  useMediaQuery,
} from '@mui/material';
import { drawerWidth } from '@/common/constants';

import { TitleBar } from './TitleBar';
import { Header } from './Header';
import { Sidebar } from './Sidebar';
import { menuList } from '@/pages/menuList';
import { IconChevronRight } from '@tabler/icons';

const DashboardLayoutWrapper: FC<any> = styled('main', {
  shouldForwardProp: (prop) => prop !== 'open',
})((props) => {
  const { theme, open } = props as any;
  return {
    ...(theme.typography as any).mainContent,
    ...(!open && {
      borderBottomLeftRadius: 0,
      borderBottomRightRadius: 0,
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      [theme.breakpoints.up('md')]: {
        marginLeft: -(drawerWidth - 20),
        width: `calc(100% - ${drawerWidth}px)`,
      },
      [theme.breakpoints.down('md')]: {
        marginLeft: '20px',
        width: `calc(100% - ${drawerWidth}px)`,
        padding: '16px',
      },
      [theme.breakpoints.down('sm')]: {
        marginLeft: '10px',
        width: `calc(100% - ${drawerWidth}px)`,
        padding: '16px',
        marginRight: '10px',
      },
    }),
    ...(open && {
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
      borderBottomLeftRadius: 0,
      borderBottomRightRadius: 0,
      width: `calc(100% - ${drawerWidth}px)`,
      [theme.breakpoints.down('md')]: {
        marginLeft: '20px',
      },
      [theme.breakpoints.down('sm')]: {
        marginLeft: '10px',
      },
    }),
  };
});

const ToolbarWrapper = styled(Toolbar)(({ theme }) => ({
  paddingTop: theme.spacing(1.2),
  paddingBottom: theme.spacing(1.2),
}));

export interface DashboardLayoutProps {
  sidebarWidth?: number;
  [key: string]: any;
}

export const DashboardLayout: FC<DashboardLayoutProps> = () => {
  const theme = useTheme();
  const matchDownMd = useMediaQuery(theme.breakpoints.down('lg'));

  const leftDrawerOpened = true;
  /* useSelector((state) => state.customization.opened); */
  // const dispatch = useDispatch();
  const handleLeftDrawerToggle = () => {
    // dispatch({ type: SET_MENU, opened: !leftDrawerOpened });`
  };

  useEffect(() => {
    // dispatch({ type: SET_MENU, opened: !matchDownMd });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [matchDownMd]);

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar
        enableColorOnDark
        position="fixed"
        color="inherit"
        elevation={0}
        sx={{
          bgcolor: theme.palette.background.default,
          transition: leftDrawerOpened
            ? theme.transitions.create('width')
            : 'none',
        }}
      >
        <ToolbarWrapper>
          <Header handleLeftDrawerToggle={handleLeftDrawerToggle} />
        </ToolbarWrapper>
      </AppBar>

      <Sidebar
        drawerOpen={leftDrawerOpened}
        drawerToggle={handleLeftDrawerToggle}
      />

      <DashboardLayoutWrapper theme={theme} open={true}>
        <TitleBar
          separator={IconChevronRight}
          navigation={menuList}
          icon
          title
          rightAlign
        />
        <Outlet />
      </DashboardLayoutWrapper>
    </Box>
  );
};
