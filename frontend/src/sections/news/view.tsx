import { useState } from 'react';

import Card from '@mui/material/Card';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';

import { useTranslate } from 'src/locales';

import { useSettingsContext } from 'src/components/settings';

// ----------------------------------------------------------------------

interface NewsItem {
  id: string;
  title: string;
  source: string;
  timestamp: Date;
  summary: string;
  imageUrl?: string; // Optional
  articleUrl: string;
}

const useSampleNewsItems = () => {
  const { t } = useTranslate();
  // Sample Data
  const sampleNewsItems: NewsItem[] = [
    {
      id: 'news1',
      title: t('news.items.marketRally.title'),
      source: 'Financial Times',
      timestamp: new Date(Date.now() - 1 * 60 * 60 * 1000), // 1 hour ago
      summary: t('news.items.marketRally.summary'),
      imageUrl: '/assets/images/placeholder.svg', // Replace with actual or better placeholder
      articleUrl: '#', // Replace with actual article link
    },
    {
      id: 'news2',
      title: t('news.items.aiBreakthrough.title'),
      source: 'TechCrunch',
      timestamp: new Date(Date.now() - 3 * 60 * 60 * 1000), // 3 hours ago
      summary: t('news.items.aiBreakthrough.summary'),
      imageUrl: '/assets/images/placeholder.svg', // Replace with actual or better placeholder
      articleUrl: '#',
    },
    {
      id: 'news3',
      title: t('news.items.centralBank.title'),
      source: 'Reuters',
      timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000), // 5 hours ago
      summary: t('news.items.centralBank.summary'),
      // No image for this one to show how it renders
      articleUrl: '#',
    },
    {
      id: 'news4',
      title: t('news.items.oilPrices.title'),
      source: 'Bloomberg',
      timestamp: new Date(Date.now() - 8 * 60 * 60 * 1000), // 8 hours ago
      summary: t('news.items.oilPrices.summary'),
      imageUrl: '/assets/images/placeholder.svg',
      articleUrl: '#',
    },
  ];
  return sampleNewsItems;
};

export default function NewsView() {
  const settings = useSettingsContext();
  const sampleNewsItems = useSampleNewsItems();
  const [newsItems] = useState<NewsItem[]>(sampleNewsItems);
  const { t } = useTranslate();

  // In a real application, newsItems would be fetched from an API

  return (
    <Container maxWidth={settings.themeStretch ? false : 'xl'}>
      <Typography variant="h4" sx={{ mb: 5 }}>
        {t('news.title')}
      </Typography>

      <Grid container spacing={3}>
        {newsItems.length > 0 ? (
          newsItems.map((item) => (
            <Grid item xs={12} sm={6} md={4} key={item.id}>
              <Card sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                {item.imageUrl && (
                  <CardMedia
                    component="img"
                    sx={{ height: 140 }} // Or use aspect ratio approach
                    image={item.imageUrl}
                    alt={item.title}
                  />
                )}
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography
                    gutterBottom
                    variant="h6"
                    component="div"
                    sx={{
                      maxHeight: '3.6em',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      display: '-webkit-box',
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: 'vertical',
                    }}
                  >
                    {item.title}
                  </Typography>
                  <Typography variant="caption" color="text.secondary" gutterBottom>
                    {item.source} - {item.timestamp.toLocaleDateString()}{' '}
                    {item.timestamp.toLocaleTimeString()}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.primary"
                    sx={{
                      maxHeight: '4.5em',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      display: '-webkit-box',
                      WebkitLineClamp: 3,
                      WebkitBoxOrient: 'vertical',
                      mt: 1,
                    }}
                  >
                    {item.summary}
                  </Typography>
                </CardContent>
                <CardActions sx={{ justifyContent: 'flex-start', mt: 'auto' }}>
                  <Button
                    size="small"
                    component={Link}
                    href={item.articleUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {t('news.readMore')}
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))
        ) : (
          <Grid item xs={12}>
            <Typography variant="body1" color="text.secondary" sx={{ textAlign: 'center', mt: 5 }}>
              {t('news.noItems')}
            </Typography>
          </Grid>
        )}
      </Grid>
    </Container>
  );
}
