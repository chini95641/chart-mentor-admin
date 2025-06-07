import { useState, useEffect, useCallback } from 'react';

import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import CardMedia from '@mui/material/CardMedia';
import CardActions from '@mui/material/CardActions';

import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';

import { useTranslate } from 'src/locales';
import { HOST_API } from 'src/config-global';
import { getQuotes, deleteQuote } from 'src/api/quote';

import Iconify from 'src/components/iconify';
import { useSettingsContext } from 'src/components/settings';
import { useSnackbar } from 'src/components/snackbar/use-snackbar';

export default function QuoteListView() {
  const { t } = useTranslate();
  const settings = useSettingsContext();
  const router = useRouter();
  const { showSnackbar } = useSnackbar();

  const [quotes, setQuotes] = useState([]);

  const fetchQuotes = useCallback(async () => {
    try {
      const { result: quotesData } = await getQuotes();
      setQuotes(quotesData || []);
    } catch (error) {
      showSnackbar('Failed to fetch quotes', 'error');
      setQuotes([]);
    }
  }, [showSnackbar]);

  useEffect(() => {
    fetchQuotes();
  }, [fetchQuotes]);

  const handleDelete = useCallback(
    async (id: string) => {
      try {
        await deleteQuote(id);
        showSnackbar('Quote deleted successfully', 'success');
        fetchQuotes();
      } catch (error) {
        showSnackbar('Failed to delete quote', 'error');
      }
    },
    [showSnackbar, fetchQuotes]
  );

  return (
    <Container maxWidth={settings.themeStretch ? false : 'xl'}>
      <Button
        variant="contained"
        startIcon={<Iconify icon="mingcute:add-line" />}
        onClick={() => router.push(paths.dashboard.quotes.create)}
        sx={{ mb: 2 }}
      >
        {t('quotes.newQuote', { defaultValue: 'New Quote' })}
      </Button>

      <Grid container spacing={3}>
        {quotes.map((quote: any) => (
          <Grid item xs={12} sm={6} md={4} key={quote._id}>
            <Card>
              <CardMedia
                component="img"
                height="200"
                image={`${HOST_API}/${quote.image}`}
                alt="quote"
              />
              <CardActions>
                <Button
                  size="small"
                  startIcon={<Iconify icon="solar:trash-bin-trash-bold" />}
                  onClick={() => handleDelete(quote._id)}
                  sx={{ color: 'error.main' }}
                >
                  {t('delete')}
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
} 