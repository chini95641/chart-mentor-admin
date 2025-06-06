// Third-party imports
import { useState, useCallback } from 'react';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { alpha, styled } from '@mui/material/styles';
// MUI imports
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import CircularProgress from '@mui/material/CircularProgress';

import { useTranslate } from 'src/locales';
import { uploadImage } from 'src/api/upload';
import { createChartOfDay } from 'src/api/chart_of_day';

import { useSettingsContext } from 'src/components/settings';
// Internal imports
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

const ImagePreview = ({ src }: { src: string }) => {
  const { t } = useTranslate();
  return (
    <Box
      component="img"
      src={src}
      alt={t('chartOfDay.uploadedChartAlt')}
      sx={{
        width: '100%',
        height: '100%',
        objectFit: 'contain',
      }}
    />
  );
};

const UploadPrompt = ({
  onFileSelect,
}: {
  onFileSelect: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) => {
  const { t } = useTranslate();
  return (
    <>
      <Button component="label" variant="outlined" startIcon={<CloudUploadIcon />} sx={{ mb: 2 }}>
        {t('chartOfDay.uploadChart')}
        <VisuallyHiddenInput type="file" accept="image/*" onChange={onFileSelect} />
      </Button>
      <Typography variant="body2" color="text.secondary">
        {t('chartOfDay.dragAndDrop')}
      </Typography>
    </>
  );
};

export default function ChartOfdayCreateView() {
  const settings = useSettingsContext();
  const { showSnackbar } = useSnackbar();
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [uploadedImageUrl, setUploadedImageUrl] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const [description, setDescription] = useState('');
  const { t } = useTranslate();

  const handleImageUpload = useCallback(
    async (file: File) => {
      if (!file) return;

      if (!file.type.startsWith('image/')) {
        showSnackbar(t('chartOfDay.errors.imageFile'), 'error');
        return;
      }

      setPreviewUrl(URL.createObjectURL(file));
      
      const formData = new FormData();
      formData.append('images', file);

      setIsUploading(true);
      try {
        const response = await uploadImage(formData);
        const { image_urls } = response.data.result;
        if (image_urls && image_urls.length > 0) {
          setUploadedImageUrl(image_urls[0]);
          showSnackbar(t('alerts.imageUploadSuccess'), 'success');
        }
      } catch (error) {
        console.error(error);
        showSnackbar(t('alerts.imageUploadFail'), 'error');
      } finally {
        setIsUploading(false);
      }
    },
    [showSnackbar, t]
  );

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      setDragActive(false);

      if (e.dataTransfer.files && e.dataTransfer.files[0]) {
        handleImageUpload(e.dataTransfer.files[0]);
      }
    },
    [handleImageUpload]
  );

  const handleFileSelect = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files?.[0]) {
        handleImageUpload(e.target.files[0]);
      }
    },
    [handleImageUpload]
  );

  const renderContent = () => {
    if (isUploading && !previewUrl) {
      return <CircularProgress />;
    }

    if (previewUrl) {
      return <ImagePreview src={previewUrl} />;
    }

    return <UploadPrompt onFileSelect={handleFileSelect} />;
  };

  const handleSubmit = useCallback(async () => {
    if (!uploadedImageUrl) {
      showSnackbar(t('chartOfDay.errors.selectImage'), 'warning');
      return;
    }
    if (!description) {
      showSnackbar(t('chartOfDay.errors.description'), 'warning');
      return;
    }
    try {
      await createChartOfDay({ imageUrl: uploadedImageUrl, description });
      showSnackbar(t('chartOfDay.successMessage'), 'success');
      setPreviewUrl(null);
      setUploadedImageUrl(null);
      setDescription('');
    } catch (error) {
      showSnackbar(t('chartOfDay.errors.submit'), 'error');
    }
  }, [uploadedImageUrl, description, showSnackbar, t]);

  return (
    <Container maxWidth={settings.themeStretch ? false : 'xl'}>
      <Typography variant="h4" sx={{ mb: 5 }}>
        {t('chartOfDay.title')}
      </Typography>

      <Typography variant="h6" sx={{ mb: 2 }}>
        {t('chartOfDay.uploadChart')}
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
          minHeight: 150,
          borderRadius: 2,
          bgcolor: (theme) => alpha(theme.palette.grey[500], dragActive ? 0.08 : 0.04),
          border: (theme) => `dashed 1px ${theme.palette.divider}`,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          transition: 'background-color 0.2s ease',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {renderContent()}
      </Box>

      <TextField
        fullWidth
        multiline
        rows={4}
        label={t('chartOfDay.description')}
        placeholder={t('chartOfDay.descriptionPlaceholder')}
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        sx={{ mt: 3 }}
      />

      <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end' }}>
        <Button
          variant="contained"
          color="primary"
          onClick={handleSubmit}
          disabled={!uploadedImageUrl || isUploading}
        >
          {t('chartOfDay.submit')}
        </Button>
      </Box>
    </Container>
  );
}
