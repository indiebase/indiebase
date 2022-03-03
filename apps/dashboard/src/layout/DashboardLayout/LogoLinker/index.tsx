import { Link } from 'react-router-dom';
import { ButtonBase } from '@mui/material';
import Logo from '@/components/Logo';

export const LogoLinker = () => (
  <ButtonBase disableRipple component={Link} to="/home">
    <Logo width={180} height={34} viewBox="0 0 1246 225" />
  </ButtonBase>
);
