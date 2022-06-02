/* eslint-disable  react/no-unescaped-entities */
import type { NextPage } from 'next';
import { TextParticle } from 'city-night';
import { useWindowSize } from 'react-use';
import { isMobile } from 'react-device-detect';
import styled from '@mui/system/styled';
import Button from '@mui/material/Button';
import Toolbar from '@mui/material/Toolbar';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import { NavHeader } from 'components';
import { useTheme } from '@mui/material/styles';
import { IconFileCode } from '@tabler/icons';
import dynamic from 'next/dynamic';

import {
  Animator,
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

const ScrollContainer = dynamic(
  async () => {
    const { ScrollContainer } = await import('react-scroll-motion');
    return ScrollContainer;
  },
  { ssr: false },
) as any;

const HomeStyleWrapper = styled('div')({
  h1: {
    fontSize: '60px',
  },
});

const TextParticleWrapper = styled('div')(({ theme }) => ({
  width: '100vw',
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
  color: '#ffffff',
  fontSize: '18px',
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

const CustomButton1 = styled(CustomButton)({
  backgroundColor: '#0DCF85',
  '&:hover': {
    backgroundColor: '#0DCF85',
    borderColor: '#0DCF85',
    boxShadow: 'none',
  },
  '&:active': {
    boxShadow: 'none',
    backgroundColor: '#0DCF85',
    borderColor: '#0DCF85',
  },
});

const Home: NextPage = () => {
  const theme = useTheme();
  const { width } = useWindowSize();

  const isMobileDevice = width < theme.breakpoints.values.xl || isMobile;

  return (
    <HomeStyleWrapper>
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

      <Box />

      <ScrollContainer>
        <ScrollPage page={0}>
          <Animator animation={batch(Fade(), MoveOut(0, -500))}>
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
                  background: '#242424',
                  borderRadius: '40px',
                }}
              >
                开始
              </CustomButton>
            </TextParticleWrapper>
          </Animator>
        </ScrollPage>

        <ScrollPage page={1}>
          <Animator animation={batch(StickyIn(), FadeIn(), ZoomIn())}>
            <p style={{ whiteSpace: 'nowrap' }}>
              <h1
                style={{
                  color: '#FF3D7E',
                  marginLeft: '4px',
                  marginBottom: '60px',
                }}
              >
                letscollab
              </h1>
              <h1 style={{ color: '#00A2FF' }} />
            </p>
          </Animator>
        </ScrollPage>

        <ScrollPage page={2}>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              flexDirection: 'column',
              height: '100%',
              textAlign: 'center',
            }}
          >
            <Animator animation={MoveIn(0, 0)}>
              <h1>letscollab可以做什么 ?</h1>
            </Animator>
            <Box sx={{ height: 10 }} />
            <Animator animation={MoveIn(-1000, 0)}>
              <h2>创始人</h2>
              <h4>招募与你志同道合的伙伴，一起做东西，管理项目的财政。</h4>
              <h4>
                letscollab pro
                会提供独立项目的基本业务，诸如用户，内购支付等功能。让产品的开发更加轻松。
              </h4>
            </Animator>
            <Box sx={{ height: 5 }} />
            <Animator animation={MoveIn(1000, 0)}>
              <h2>编程爱好者</h2>
              <h4>
                letscollab会分配项目所获得的营收，让每个参与者获得应有的回报。
              </h4>
              <h4>在项目中与来自五湖四海的Geek朋友交流学习。</h4>
            </Animator>
            <Animator animation={MoveIn(-2000, 0)}>
              <h2>企业</h2>
              <h4>通过 letscollab 公布开源或其他合适的项目，</h4>
              <h4>
                让拥有空余时间的开发者参与进来完善产品并给予报酬，
                使双方互利共赢。
              </h4>
            </Animator>
          </Box>
        </ScrollPage>

        <ScrollPage page={3}>
          <Animator animation={batch(Fade(), Move(), Sticky())}>
            <Box sx={{ textAlign: 'center' }}>
              <h1>加入letscollab</h1>
              <h2>letscollab作为letscollab的第一个项目欢迎大家的加入</h2>

              <CustomButton1
                size="large"
                variant="contained"
                sx={{ marginTop: '50px' }}
              >
                加入
              </CustomButton1>
            </Box>
          </Animator>
        </ScrollPage>
      </ScrollContainer>
    </HomeStyleWrapper>
  );
};

export default Home;
