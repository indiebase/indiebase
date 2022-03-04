import { useTheme } from '@mui/material/styles';
import { Avatar, Box, ButtonBase, IconButton } from '@mui/material';

import { LogoLinker } from '../LogoLinker';
import { Search } from './Search';
import { Profile } from './Profile';
import { Notification } from './Notification';
import { IconMenu2 } from '@tabler/icons';

export const Header = ({ handleLeftDrawerToggle }) => {
  const theme = useTheme();

  return (
    <>
      <Box
        sx={{
          width: 228,
          display: 'flex',
          [theme.breakpoints.down('md')]: {
            width: 'auto',
          },
        }}
      >
        <Box
          component="span"
          sx={{ display: { xs: 'none', md: 'block' }, flexGrow: 1 }}
        >
          <LogoLinker />
        </Box>

        {/* <Avatar
            variant="rounded"
            sx={{
              ...(theme.typography as any).commonAvatar,
              ...(theme.typography as any).mediumAvatar,
              transition: 'all .2s ease-in-out',
              background: theme.palette.secondary.light,
              color: theme.palette.secondary.dark,
              '&:hover': {
                background: theme.palette.secondary.dark,
                color: theme.palette.secondary.light,
              },
            }}
            onClick={handleLeftDrawerToggle}
            color="inherit"
          ></Avatar> */}
        <IconButton color="secondary" aria-label="add an alarm">
          <IconMenu2 stroke={1.5} size="1.3rem" />
        </IconButton>
      </Box>

      <Box sx={{ flexGrow: 1 }} />
      <Box sx={{ flexGrow: 1 }} />

      <Notification />
      <Profile />
    </>
  );
};
