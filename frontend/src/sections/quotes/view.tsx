import { useState, useCallback, ChangeEvent } from 'react';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { alpha, Theme, styled } from '@mui/material/styles';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import CircularProgress from '@mui/material/CircularProgress';

import { useTranslate } from 'src/locales';

import { useSettingsContext } from 'src/components/settings';

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

const QuoteImagePreview = ({ src, altText }: { src: string; altText: string }) => (
  <Box
    component="img"
    src={src}
    alt={altText}
    sx={{
      maxWidth: '100%',
      maxHeight: '100%',
      objectFit: 'contain',
      p: 1,
    }}
  />
);

const UploadQuotePrompt = ({
  onFileSelect,
}: {
  onFileSelect: (e: ChangeEvent<HTMLInputElement>) => void;
}) => {
  const { t } = useTranslate();
  return (
    <>
      <Button component="label" variant="contained" startIcon={<CloudUploadIcon />} sx={{ mb: 2 }}>
        {t('quotes.uploadButton')}
        <VisuallyHiddenInput
          id="quote-image-upload-styled"
          type="file"
          accept="image/*"
          onChange={onFileSelect}
        />
      </Button>
      <Typography variant="body2" color="text.secondary">
        {t('quotes.uploadPrompt')}
      </Typography>
    </>
  );
};

export default function QuotesView() {
  const settings = useSettingsContext();
  const { t } = useTranslate();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  const handleImageUpload = useCallback((file: File | null) => {
    if (!file) {
      setSelectedFile(null);
      setPreviewUrl(null);
      setIsUploading(false);
      return;
    }

    if (!file.type.startsWith('image/')) {
      alert(t('quotes.alerts.imageFile'));
      setSelectedFile(null);
      setPreviewUrl(null);
      setIsUploading(false);
      return;
    }

    setIsUploading(true);
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreviewUrl(reader.result as string);
      setSelectedFile(file);
      setIsUploading(false);
    };
    reader.onerror = () => {
      setIsUploading(false);
      setSelectedFile(null);
      setPreviewUrl(null);
      alert(t('quotes.alerts.fileReadError'));
    };
    reader.readAsDataURL(file);
  }, [t]);

  const handleFileSelect = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      handleImageUpload(e.target.files[0]);
    } else {
      handleImageUpload(null);
    }
    e.target.value = '';
  }, [handleImageUpload]);

  const handleSubmit = useCallback(() => {
    if (!selectedFile) {
      alert(t('quotes.alerts.selectImage'));
      return;
    }
    console.log('Selected File:', selectedFile.name, selectedFile.type, selectedFile.size);
    alert(t('quotes.alerts.submitSuccess'));
    handleImageUpload(null);
  }, [selectedFile, handleImageUpload, t]);

  const renderUploadAreaContent = () => {
    if (isUploading) {
      return <CircularProgress />;
    }
    if (previewUrl && selectedFile) {
      return (
        <QuoteImagePreview
          src={previewUrl}
          altText={t('quotes.previewAlt', { fileName: selectedFile.name })}
        />
      );
    }
    return <UploadQuotePrompt onFileSelect={handleFileSelect} />;
  };

  return (
    <Container maxWidth={settings.themeStretch ? false : 'xl'}>
      <Typography variant="h4" sx={{ mb: 5 }}>
        {t('quotes.title')}
      </Typography>

      <Box
        sx={{
          width: 1,
          height: 320,
          borderRadius: 2,
          bgcolor: (theme: Theme) => alpha(theme.palette.grey[500], 0.04),
          border: (theme: Theme) => `dashed 1px ${theme.palette.divider}`,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          transition: 'background-color 0.2s ease',
          position: 'relative',
          overflow: 'hidden',
          p: 2,
        }}
      >
        {renderUploadAreaContent()}
      </Box>
      
      {selectedFile && !isUploading && previewUrl && (
        <Box sx={{ textAlign: 'center', mt: 1 }}>
           <Typography variant="caption" display="block">
                {selectedFile.name} ({Math.round(selectedFile.size / 1024)} KB)
            </Typography>
        </Box>
      )}

      <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end' }}>
        <Button
          variant="contained"
          color="primary"
          onClick={handleSubmit}
          disabled={!selectedFile || isUploading}
        >
          {t('quotes.submitButton')}
        </Button>
      </Box>
    </Container>
  );
}
