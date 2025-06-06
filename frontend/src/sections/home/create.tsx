import { useState } from 'react';
import { m } from 'framer-motion';

import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

import { useTranslate } from 'src/locales';
import { createQuote, createComment } from 'src/api/home';

import { useSettingsContext } from 'src/components/settings';
import { varFade, MotionViewport } from 'src/components/animate';
import { useSnackbar } from 'src/components/snackbar/use-snackbar';

// ----------------------------------------------------------------------

export default function HomeCreate() {
  const settings = useSettingsContext();
  const { t } = useTranslate();
  const { showSnackbar } = useSnackbar();
  const [quote, setQuote] = useState('');
  const [comment, setComment] = useState('');

  const handleQuoteSubmit = async () => {
    if (!quote) {
      showSnackbar('Please enter a quote.', 'warning');
      return;
    }
    try {
      await createQuote(quote);
      showSnackbar('Quote submitted successfully!', 'success');
      setQuote('');
    } catch (error) {
      console.error(error);
      showSnackbar('Failed to submit quote.', 'error');
    }
  };

  const handleCommentSubmit = async () => {
    if (!comment) {
      showSnackbar('Please enter a comment.', 'warning');
      return;
    }
    try {
      await createComment(comment);
      showSnackbar('Comment submitted successfully!', 'success');
      setComment('');
    } catch (error) {
      console.error(error);
      showSnackbar('Failed to submit comment.', 'error');
    }
  };

  return (
    <Container maxWidth={settings.themeStretch ? false : 'xl'}>
      <Stack component={MotionViewport} spacing={5}>
        <m.div variants={varFade().inUp}>
          <Typography variant="h6">{t('home.todaysQuotes')}</Typography>
        </m.div>

        <Stack spacing={3}>
          <m.div variants={varFade().inUp}>
            <TextField
              fullWidth
              label={t('home.quote')}
              value={quote}
              onChange={(e) => setQuote(e.target.value)}
            />
          </m.div>
        </Stack>

        <m.div variants={varFade().inUp}>
          <Button size="large" variant="contained" onClick={handleQuoteSubmit}>
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
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
          </m.div>
        </Stack>

        <m.div variants={varFade().inUp}>
          <Button size="large" variant="contained" onClick={handleCommentSubmit}>
            {t('home.submitComment')}
          </Button>
        </m.div>
      </Stack>
    </Container>
  );
}
