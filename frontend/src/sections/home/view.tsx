import { m } from 'framer-motion';

import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

import { useSettingsContext } from 'src/components/settings';
import { varFade, MotionViewport } from 'src/components/animate';

// ----------------------------------------------------------------------

export default function HomeView() {
  const settings = useSettingsContext();

  return (
    <Container maxWidth={settings.themeStretch ? false : 'xl'}>
      <Stack component={MotionViewport} spacing={5}>
        <m.div variants={varFade().inUp}>
          <Typography variant="h6">Today&apos;s Quotes</Typography>
        </m.div>

        <Stack spacing={3}>
          <m.div variants={varFade().inUp}>
            <TextField fullWidth label="Quote" />
          </m.div>
        </Stack>

        <m.div variants={varFade().inUp}>
          <Button size="large" variant="contained">
            Submit Quote
          </Button>
        </m.div>

        <Stack spacing={3}>
          <m.div variants={varFade().inUp}>
            <TextField fullWidth label="Enter your nifty comment" multiline rows={4} />
          </m.div>
        </Stack>

        <m.div variants={varFade().inUp}>
          <Button size="large" variant="contained">
            Submit Comment
          </Button>
        </m.div>
      </Stack>
    </Container>
  );
}
