import { useState, useCallback } from 'react';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { alpha, styled } from '@mui/material/styles';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

import { useTranslate } from 'src/locales';

import { useSettingsContext } from 'src/components/settings';
import { useSnackbar } from 'src/components/snackbar/use-snackbar';

// ----------------------------------------------------------------------

const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});

export default function VideosView() {
  const settings = useSettingsContext();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [youtubeUrl, setYoutubeUrl] = useState('');
  const [dragActive, setDragActive] = useState(false);
  const { t } = useTranslate();
  const { showSnackbar } = useSnackbar();

  const handleFileChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setSelectedFile(event.target.files[0]);
      setYoutubeUrl(''); // Clear YouTube URL if a file is selected
    }
  }, []);

  const handleYoutubeUrlChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setYoutubeUrl(event.target.value);
    if (event.target.value) {
        setSelectedFile(null); // Clear selected file if a YouTube URL is entered
    }
  }, []);

  const handleVideoSubmit = useCallback(() => {
    if (selectedFile) {
      console.log('Selected Video File:', selectedFile.name);
      // Add actual file upload logic here
      showSnackbar(t('videos.alerts.fileReady', { fileName: selectedFile.name }), 'info');
    } else if (youtubeUrl) {
      console.log('YouTube URL:', youtubeUrl);
      // Add logic to process YouTube URL here
      showSnackbar(t('videos.alerts.youtubeReady', { youtubeUrl }), 'info');
    } else {
      showSnackbar(t('videos.alerts.noInput'), 'warning');
    }
  }, [selectedFile, youtubeUrl, t, showSnackbar]);

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      if (e.dataTransfer.files[0].type.startsWith('video/')) {
        setSelectedFile(e.dataTransfer.files[0]);
        setYoutubeUrl(''); // Clear YouTube URL if a file is dropped
      } else {
        showSnackbar(t('videos.alerts.dropVideo'), 'error');
      }
    }
  }, [t, showSnackbar]);


  return (
    <Container maxWidth={settings.themeStretch ? false : 'xl'}>
      <Typography variant="h4" sx={{ mb: 5 }}>
        {t('videos.title')}
      </Typography>

      {/* Video File Upload Section */}
      <Typography variant="h6" sx={{ mb: 2 }}>
        {t('videos.uploadTitle')}
      </Typography>
      <Box
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        sx={{
          mb: 3,
          p: 3,
          width: 1,
          minHeight: 150, // Adjusted height for video upload area
          borderRadius: 2,
          bgcolor: (theme) => alpha(theme.palette.grey[500], dragActive ? 0.08 : 0.04),
          border: (theme) => `dashed 1px ${theme.palette.divider}`,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          transition: 'background-color 0.2s ease',
        }}
      >
        <Button
          component="label"
          variant="outlined"
          startIcon={<CloudUploadIcon />}
          sx={{ mb: 1 }}
        >
          {t('videos.chooseVideo')}
          <VisuallyHiddenInput type="file" accept="video/*" onChange={handleFileChange} />
        </Button>
        {selectedFile ? (
          <Typography variant="body2" color="text.secondary">
            {t('videos.selectedFile', { fileName: selectedFile.name })}
          </Typography>
        ) : (
          <Typography variant="body2" color="text.secondary">
            {t('videos.dragAndDrop')}
          </Typography>
        )}
      </Box>

      <Typography variant="h6" sx={{ mb: 2, mt: 4 }}>
        {t('videos.youtubeTitle')}
      </Typography>
      <TextField
        fullWidth
        label={t('videos.youtubeLabel')}
        placeholder={t('videos.youtubePlaceholder')}
        value={youtubeUrl}
        onChange={handleYoutubeUrlChange}
        sx={{ mb: 3 }}
        disabled={!!selectedFile} // Disable if a file is selected
      />

      {/* Submit Button */}
      <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end' }}>
        <Button
          variant="contained"
          color="primary"
          onClick={handleVideoSubmit}
          disabled={!selectedFile && !youtubeUrl} // Disable if neither is provided
        >
          {t('videos.submit')}
        </Button>
      </Box>
    </Container>
  );
}
