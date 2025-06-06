import { useState, useEffect } from 'react';

import Container from '@mui/material/Container';
import DeleteIcon from '@mui/icons-material/Delete';
import {
  Box,
  Card,
  Grid,
  CardMedia,
  Typography,
  IconButton,
  CardContent,
  CircularProgress,
} from '@mui/material';

import { useTranslate } from 'src/locales';
import { HOST_API } from 'src/config-global';
import { getVideos, deleteVideo } from 'src/api/video';

import { useSettingsContext } from 'src/components/settings';
import { useSnackbar } from 'src/components/snackbar/use-snackbar';

// ----------------------------------------------------------------------

interface Video {
  _id: string;
  youtubeUrl?: string;
  filePath?: string;
}

export default function VideoListView() {
  const settings = useSettingsContext();
  const { showSnackbar } = useSnackbar();
  const { t } = useTranslate();
  const [videos, setVideos] = useState<Video[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        setLoading(true);
        const response = await getVideos();
        setVideos(response);
      } catch (error) {
        console.error('Failed to fetch videos', error);
        showSnackbar(t('alerts.fetchVideosFail'), 'error');
      } finally {
        setLoading(false);
      }
    };
    fetchVideos();
  }, [showSnackbar, t]);

  const handleDelete = async (id: string) => {
    try {
      await deleteVideo(id);
      setVideos(videos.filter((v) => v._id !== id));
      showSnackbar(t('alerts.deleteVideoSuccess'), 'success');
    } catch (error) {
      showSnackbar(t('alerts.deleteVideoFail'), 'error');
    }
  };

  if (loading) {
    return (
      <Container
        maxWidth={settings.themeStretch ? false : 'xl'}
        sx={{ display: 'flex', justifyContent: 'center', mt: 5 }}
      >
        <CircularProgress />
      </Container>
    );
  }

  return (
    <Container maxWidth={settings.themeStretch ? false : 'xl'}>
      <Typography variant="h4" sx={{ mb: 5 }}>
        {t('videos.listTitle')}
      </Typography>
      <Grid container spacing={3}>
        {videos.map((video) => (
          <Grid item xs={12} sm={6} md={4} key={video._id}>
            <Card>
              {video.filePath && (
                <CardMedia
                  component="video"
                  controls
                  height="140"
                  image={`${HOST_API}/${video.filePath}`}
                />
              )}
              {video.youtubeUrl && (
                <CardMedia
                  component="iframe"
                  height="140"
                  src={video.youtubeUrl.replace('watch?v=', 'embed/')}
                />
              )}
              <CardContent>
                <Box>
                  <IconButton edge="end" aria-label="delete" onClick={() => handleDelete(video._id)}>
                    <DeleteIcon />
                  </IconButton>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
} 