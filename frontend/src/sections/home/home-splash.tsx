import { useRef } from 'react';
import { m } from 'framer-motion';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { alpha, styled } from '@mui/material/styles';

import { useTranslate } from 'src/locales';
import { bgGradient } from 'src/theme/css';

import { varFade, MotionContainer } from 'src/components/animate';

const StyledRoot = styled('div')(({ theme }) => ({
  ...bgGradient({
    color: alpha(theme.palette.background.default, theme.palette.mode === 'light' ? 0.9 : 0.94),
    imgUrl: '/assets/background/overlay_3.jpg',
  }),
  width: '100%',
  height: '100%',
  position: 'relative',
}));

// ----------------------------------------------------------------------

export default function HomeSplash() {
  const heroRef = useRef<HTMLDivElement | null>(null);

  const { t } = useTranslate();

  return (
    <StyledRoot ref={heroRef}>
      <Box
        sx={{
          height: '100%',
          py: { xs: 15, md: 20 },
          overflow: 'hidden',
          position: 'relative',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          /* backgroundImage: 'url(/assets/background/splash.jpg)', */
        }}
      >
        <Container component={MotionContainer}>
          <Stack
            spacing={3}
            sx={{
              textAlign: 'center',
              mb: { xs: 5, md: 10 },
            }}
          >
            <m.div variants={varFade().inUp}>
              <Typography component="div" variant="h2" sx={{ color: '#d69c00' }}>
                {t('Welcome to Genie App!')}
              </Typography>
            </m.div>

            {/*  <m.div variants={varFade().inDown}>
              <Typography variant="overline">
                <b>{t('Here you can search for people buried')}</b>,{' '}
                <small>{t('in currently 109 cemetery administrations')}</small>,{' '}
                <b>{t('842 cemeteries and 0 people buried.')}</b>
                <br />
                <b>{t('At')}</b> <small>{t('administrations')}</small>{' '}
                <b>{t('with the symbol *, you can also order grave care.')}</b>
              </Typography>
            </m.div> */}
          </Stack>
        </Container>
      </Box>
    </StyledRoot>
  );
}
