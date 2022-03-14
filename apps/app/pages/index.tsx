import type { NextPage } from 'next';
import { TextParticle } from 'city-night';
import { useWindowSize } from 'react-use';
import { isDesktop, isMobile } from 'react-device-detect';
import styled from '@mui/system/styled';
import Button from '@mui/material/Button';
import Toolbar from '@mui/material/Toolbar';
import AppBar from '@mui/material/AppBar';
import { Footer, NavHeader } from 'components';
import ButtonUnstyled, {
  buttonUnstyledClasses,
} from '@mui/base/ButtonUnstyled';
import { useTheme } from '@mui/material/styles';
import { IconFileCode } from '@tabler/icons';

const TextParticleWrapper = styled('div')(({ theme }) => ({
  width: '100%',
  height: 'calc(100vh - 60px)',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  '& canvas': {
    width: '100%',
    maxHeight: 400,
  },
}));

const CustomButton = styled(Button)({
  boxShadow: 'none',
  textTransform: 'none',
  padding: '8px 20px',
  backgroundColor: '#24292f',
  fontSize: '18px',
  borderRadius: '40px',
  fontFamily: [
    '-apple-system',
    'BlinkMacSystemFont',
    '"Segoe UI"',
    'Roboto',
    '"Helvetica Neue"',
    'Arial',
    'sans-serif',
    '"Apple Color Emoji"',
    '"Segoe UI Emoji"',
    '"Segoe UI Symbol"',
  ].join(','),
  '&:hover': {
    backgroundColor: '#333333',
    borderColor: '#333333',
    boxShadow: 'none',
  },
  '&:active': {
    boxShadow: 'none',
    backgroundColor: '#333333',
    borderColor: '#333333',
  },
});

const Home: NextPage = () => {
  const theme = useTheme();
  const { width } = useWindowSize();

  // const getTextParticleWidth = function () {};

  const isMobileDevice = width < theme.breakpoints.values.xl || isMobile;

  console.log(theme.breakpoints.values.xl, width, isMobile, isDesktop);

  return (
    <>
      <header>
        <AppBar
          enableColorOnDark
          position="fixed"
          color="inherit"
          elevation={0}
        >
          <Toolbar>
            <NavHeader />
          </Toolbar>
        </AppBar>
      </header>

      <TextParticleWrapper>
        <TextParticle
          text="letscollab"
          resolution={5}
          boxWidth={isMobileDevice ? 1800 : width}
          boxHeight={400}
          size={300}
        />
        {/* <NavButtonWrapper> */}
        <CustomButton
          size="large"
          variant="contained"
          endIcon={<IconFileCode />}
          sx={{
            color: '#fff',
            boxShadow: 'unset',
            background: '#242424',
          }}
        >
          开始
        </CustomButton>
        {/* </NavButtonWrapper> */}
      </TextParticleWrapper>

      <Footer />
    </>
  );
};

export default Home;
