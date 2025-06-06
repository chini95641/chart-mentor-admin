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

// Sample Data
const sampleNewsItems: NewsItem[] = [
  {
    id: 'news1',
    title: 'Global Markets Rally on Positive Economic Outlook',
    source: 'Financial Times',
    timestamp: new Date(Date.now() - 1 * 60 * 60 * 1000), // 1 hour ago
    summary:
      'Stock markets worldwide saw a significant surge today following the release of strong manufacturing data and optimistic growth forecasts from leading economists.',
    imageUrl: '/assets/images/placeholder.svg', // Replace with actual or better placeholder
    articleUrl: '#', // Replace with actual article link
  },
  {
    id: 'news2',
    title: 'Tech Giants Announce Breakthrough in AI Development',
    source: 'TechCrunch',
    timestamp: new Date(Date.now() - 3 * 60 * 60 * 1000), // 3 hours ago
    summary:
      'A consortium of leading technology companies has unveiled a new AI model that promises to revolutionize natural language processing and machine learning capabilities.',
    imageUrl: '/assets/images/placeholder.svg', // Replace with actual or better placeholder
    articleUrl: '#',
  },
  {
    id: 'news3',
    title: 'Central Bank Hints at Interest Rate Adjustments Amid Inflation Concerns',
    source: 'Reuters',
    timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000), // 5 hours ago
    summary:
      'In a recent address, the Central Bank governor suggested potential shifts in monetary policy to curb rising inflation, causing ripples in bond and currency markets.',
    // No image for this one to show how it renders
    articleUrl: '#',
  },
  {
    id: 'news4',
    title: 'Crude Oil Prices Fluctuate as OPEC+ Deliberates Output Levels',
    source: 'Bloomberg',
    timestamp: new Date(Date.now() - 8 * 60 * 60 * 1000), // 8 hours ago
    summary:
      'Oil markets remain on edge as OPEC+ nations meet to discuss future production quotas, with analysts predicting continued volatility based on the outcome.',
    imageUrl: '/assets/images/placeholder.svg',
    articleUrl: '#',
  },
];

export default function NewsView() {
  const settings = useSettingsContext();
  const [newsItems] = useState<NewsItem[]>(sampleNewsItems);

  // In a real application, newsItems would be fetched from an API

  return (
    <Container maxWidth={settings.themeStretch ? false : 'xl'}>
      <Typography variant="h4" sx={{ mb: 5 }}>
        Latest News
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
                    Read More
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))
        ) : (
          <Grid item xs={12}>
            <Typography variant="body1" color="text.secondary" sx={{ textAlign: 'center', mt: 5 }}>
              No news items available at the moment.
            </Typography>
          </Grid>
        )}
      </Grid>
    </Container>
  );
}
