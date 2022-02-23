import { Link } from 'react-router-dom';

// material-ui
import { ButtonBase } from '@mui/material';

// project imports
// import config from 'config';
// import Logo from 'ui-component/Logo';

// ==============================|| MAIN LOGO ||============================== //

const Logo = () => (
  <ButtonBase disableRipple component={Link} to="demo">
    {/* <Logo /> */}
  </ButtonBase>
);

export default Logo;
