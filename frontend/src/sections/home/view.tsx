import { m } from 'framer-motion';

import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

import { useTranslate } from 'src/locales';

import { useSettingsContext } from 'src/components/settings';
import { varFade, MotionViewport } from 'src/components/animate';

// ----------------------------------------------------------------------

export default function HomeView() {
  const settings = useSettingsContext();
  const { t } = useTranslate();

  return (
    <Container maxWidth={settings.themeStretch ? false : 'xl'}>
      <Stack component={MotionViewport} spacing={5}>
        <m.div variants={varFade().inUp}>
          <Typography variant="h6">{t('home.todaysQuotes')}</Typography>
        </m.div>

        <Stack spacing={3}>
          <m.div variants={varFade().inUp}>
            <TextField fullWidth label={t('home.quote')} />
          </m.div>
        </Stack>

        <m.div variants={varFade().inUp}>
          <Button size="large" variant="contained">
            {t('home.submitQuote')}
          </Button>
        </m.div>

        <Stack spacing={3}>
          <m.div variants={varFade().inUp}>
            <TextField
              fullWidth
              label={t('home.niftyComment')}
              multiline
              rows={4}
            />
          </m.div>
        </Stack>

        <m.div variants={varFade().inUp}>
          <Button size="large" variant="contained">
            {t('home.submitComment')}
          </Button>
        </m.div>
      </Stack>
    </Container>
  );
}
