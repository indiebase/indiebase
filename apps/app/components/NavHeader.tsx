import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import styled from '@mui/system/styled';
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';

const NavBarWrapper = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
}));

const LightTooltip = styled(({ className, ...props }: any) => (
  <Tooltip {...(props as any)} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: theme.palette.common.white,
    color: 'rgba(0, 0, 0, 0.87)',
    boxShadow: theme.shadows[1],
    fontSize: 11,
  },
}));

export interface NavHeaderProps {
  items?: {};
}

export const NavHeader = function (props) {
  return (
    <Grid container spacing={2}>
      <Grid item xs={6} />
      <Grid item xs={6}>
        <Stack justifyContent="flex-end" direction="row" spacing={10}>
          <Stack direction="row" spacing={2}>
            <Button>文档</Button>
            <Button>价格</Button>
            <LightTooltip title="WIP 🙀🙀🙀">
              <Button>Nawb</Button>
            </LightTooltip>
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
