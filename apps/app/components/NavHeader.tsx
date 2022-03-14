import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import styled from '@mui/system/styled';

const NavBarWrapper = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
}));

export interface NavHeaderProps {
  items?: {};
}

export const NavHeader = function (props) {
  return (
    <Grid container spacing={2}>
      <Grid item xs={6}></Grid>
      <Grid item xs={6}>
        <Stack justifyContent="flex-end" direction="row" spacing={10}>
          <Stack direction="row" spacing={2}>
            <Button>One</Button>
            <Button>Two</Button>
            <Button>Three</Button>
          </Stack>

          <Stack direction="row" spacing={2}>
            <Button variant="text">控制台</Button>
            <Button variant="text">登录</Button>
          </Stack>
        </Stack>
      </Grid>
    </Grid>
  );
};
