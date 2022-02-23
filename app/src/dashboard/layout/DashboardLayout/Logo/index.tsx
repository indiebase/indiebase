import { Link } from 'react-router-dom';
import { ButtonBase } from '@mui/material';

// project imports
// import config from 'config';
// import Logo from 'ui-component/Logo';

export const Logo = () => (
  <ButtonBase disableRipple component={Link} to="demo">
    {/* <Logo /> */}
    Logo
  </ButtonBase>
);
