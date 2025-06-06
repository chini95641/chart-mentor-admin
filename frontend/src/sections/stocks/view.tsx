import { useState, useCallback } from 'react';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import Typography from '@mui/material/Typography';
import FormControl from '@mui/material/FormControl';
import { alpha, styled } from '@mui/material/styles';
import CircularProgress from '@mui/material/CircularProgress';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import Select, { SelectChangeEvent } from '@mui/material/Select';

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

// Moved ImagePreview outside StocksView
interface ImagePreviewProps {
  src: string;
}
const ImagePreview = ({ src }: ImagePreviewProps) => (
  <Box
    component="img"
    src={src}
    alt="Uploaded stock chart"
    sx={{ width: '100%', height: '100%', objectFit: 'contain' }}
  />
);

// Moved UploadUserPrompt outside StocksView
interface UploadUserPromptProps {
  onFileChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}
const UploadUserPrompt = ({ onFileChange }: UploadUserPromptProps) => {
  const { t } = useTranslate();
  return (
    <>
      <Button component="label" variant="outlined" startIcon={<CloudUploadIcon />} sx={{ mb: 1 }}>
        {t('stocks.uploadImage')}
        <VisuallyHiddenInput type="file" accept="image/*" onChange={onFileChange} />
      </Button>
      <Typography variant="body2" color="text.secondary">
        {t('stocks.dragAndDrop')}
      </Typography>
    </>
  );
};

// Renamed from FourView to StocksView
export default function StocksView() {
  const settings = useSettingsContext();
  const { t } = useTranslate();
  const { showSnackbar } = useSnackbar();

  const [optionType, setOptionType] = useState<'' | 'swing' | 'long'>('');
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [description, setDescription] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const [dragActive, setDragActive] = useState(false);

  const handleImageFileSelect = useCallback((file: File) => {
    if (!file) return;
    if (!file.type.startsWith('image/')) {
      showSnackbar(t('stocks.alerts.imageFile'), 'error');
      return;
    }
    setIsUploading(true);
    const reader = new FileReader();
    reader.onloadend = () => {
      setSelectedImage(reader.result as string);
      setIsUploading(false);
    };
    reader.onerror = () => {
      setIsUploading(false);
      showSnackbar(t('stocks.alerts.fileReadError'), 'error');
    };
    reader.readAsDataURL(file);
  }, [t, showSnackbar]);

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') setDragActive(true);
    else if (e.type === 'dragleave') setDragActive(false);
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      setDragActive(false);
      if (e.dataTransfer.files && e.dataTransfer.files[0]) {
        handleImageFileSelect(e.dataTransfer.files[0]);
      }
    },
    [handleImageFileSelect]
  );

  const handleInputChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      handleImageFileSelect(event.target.files[0]);
    }
  }, [handleImageFileSelect]);

  const handleSubmit = useCallback(() => {
    if (!optionType) {
      showSnackbar(t('stocks.alerts.selectOptionType'), 'warning');
      return;
    }
    if (!selectedImage) {
      showSnackbar(t('stocks.alerts.uploadImage'), 'warning');
      return;
    }
    console.log('Stock Data:', {
      optionType,
      image: selectedImage, // This will be a base64 string
      description,
    });
    showSnackbar(t('stocks.alerts.submitSuccess'), 'success');
    // Optionally reset form
    setOptionType('');
    setSelectedImage(null);
    setDescription('');
  }, [optionType, selectedImage, description, t, showSnackbar]);

  // Function to render image upload content, replacing nested ternary
  const renderImageUploadContent = () => {
    if (isUploading) {
      return <CircularProgress />;
    }
    if (selectedImage) {
      return <ImagePreview src={selectedImage} />;
    }
    return <UploadUserPrompt onFileChange={handleInputChange} />;
  };

  return (
    <Container maxWidth={settings.themeStretch ? false : 'xl'}>
      <Typography variant="h4" sx={{ mb: 5 }}>
        {t('stocks.title')}
      </Typography>

      <Box sx={{ display: 'grid', gap: 3, gridTemplateColumns: { xs: '1fr', md: '1fr' } }}>
        <FormControl fullWidth required>
          <InputLabel id="option-type-select-label">{t('stocks.optionType')}</InputLabel>
          <Select
            labelId="option-type-select-label"
            value={optionType}
            label={t('stocks.optionType')}
            onChange={(e: SelectChangeEvent<'' | 'swing' | 'long'>) =>
              setOptionType(e.target.value as '' | 'swing' | 'long')
            }
          >
            <MenuItem value="">
              <em>{t('stocks.optionTypes.none')}</em>
            </MenuItem>
            <MenuItem value="swing">{t('stocks.optionTypes.swing')}</MenuItem>
            <MenuItem value="long">{t('stocks.optionTypes.long')}</MenuItem>
          </Select>
        </FormControl>

        <Box // Image Upload Area
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
          sx={{
            p: 3,
            width: 1,
            minHeight: 200,
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
          {renderImageUploadContent()} {/* Using the new render function */}
        </Box>

        <TextField
          fullWidth
          multiline
          rows={4}
          label={t('stocks.descriptionLabel')}
          placeholder={t('stocks.descriptionPlaceholder')}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
          <Button
            variant="contained"
            color="primary"
            onClick={handleSubmit}
            disabled={!optionType || !selectedImage || isUploading}
          >
            {t('stocks.submit')}
          </Button>
        </Box>
      </Box>
    </Container>
  );
}
