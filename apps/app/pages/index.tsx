import type { NextPage } from 'next';
import { TextParticle } from 'city-night';
import { useWindowSize } from 'react-use';
import { isMobile } from 'react-device-detect';
import styled from '@mui/system/styled';
import Button from '@mui/material/Button';
import Toolbar from '@mui/material/Toolbar';
import AppBar from '@mui/material/AppBar';
import { Footer, NavHeader } from 'components';
import { useTheme } from '@mui/material/styles';

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

const Home: NextPage = () => {
  const theme = useTheme();
  const { width } = useWindowSize();
  console.log(theme.breakpoints.values.xl, width);

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
          boxWidth={1800}
          boxHeight={400}
          size={width > theme.breakpoints.values.xl || isMobile ? 300 : 200}
        />

        <Button size="large" variant="outlined">
          开始
        </Button>
      </TextParticleWrapper>

      <Footer />
    </>
  );
};

export default Home;
