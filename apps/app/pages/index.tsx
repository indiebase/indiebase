/* eslint-disable  react/no-unescaped-entities */
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
import { IconFileCode } from '@tabler/icons';
import {
  Animator,
  ScrollContainer,
  ScrollPage,
  batch,
  Fade,
  FadeIn,
  Move,
  MoveIn,
  MoveOut,
  Sticky,
  StickyIn,
  ZoomIn,
} from 'react-scroll-motion';

const ZoomInScrollOut = batch(StickyIn(), FadeIn(), ZoomIn());
const FadeUp = batch(Fade(), Move(), Sticky());

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

  const isMobileDevice = width < theme.breakpoints.values.xl || isMobile;

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

      <ScrollContainer>
        <ScrollPage page={0}>
          <Animator animation={batch(Fade(), Sticky(), MoveOut(0, -200))}>
            <TextParticleWrapper>
              <TextParticle
                text="letscollab"
                resolution={5}
                boxWidth={isMobileDevice ? 1800 : width}
                boxHeight={400}
                size={300}
              />

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
            </TextParticleWrapper>
          </Animator>
        </ScrollPage>
        <ScrollPage page={1}>
          <Animator animation={ZoomInScrollOut}>
            <span style={{ fontSize: '40px' }}>I'm FadeUpScrollOut ✨</span>
          </Animator>
        </ScrollPage>
        <ScrollPage page={2}>
          <Animator animation={FadeUp}>
            <span style={{ fontSize: '40px' }}>I'm FadeUp ⛅️</span>
          </Animator>
        </ScrollPage>
        <ScrollPage page={3}>
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              height: '100%',
            }}
          >
            <span style={{ fontSize: '40px' }}>
              <Animator animation={MoveIn(-1000, 0)}>Hello Guys 👋🏻</Animator>
              <Animator animation={MoveIn(1000, 0)}>
                Nice to meet you 🙋🏻‍♀️
              </Animator>
              - I'm Seonghyeok -
              <Animator animation={MoveOut(1000, 0)}>Good bye ✋🏻</Animator>
              <Animator animation={MoveOut(-1000, 0)}>See you 💛</Animator>
            </span>
          </div>
        </ScrollPage>
        <ScrollPage page={4}>
          <Animator animation={batch(Fade(), Sticky())}>
            <span style={{ fontSize: '40px' }}>Done</span>
            <br />
            <span style={{ fontSize: '30px' }}>
              There's FadeAnimation, MoveAnimation, StickyAnimation,
              ZoomAnimation
            </span>
          </Animator>
        </ScrollPage>
      </ScrollContainer>
      <Footer />
    </>
  );
};

export default Home;
