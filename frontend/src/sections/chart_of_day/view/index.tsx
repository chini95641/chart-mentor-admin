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

// Internal imports
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

const ImagePreview = ({ src }: { src: string }) => (
  <Box
    component="img"
    src={src}
    alt="Uploaded chart"
    sx={{
      width: '100%',
      height: '100%',
      objectFit: 'contain',
    }}
  />
);

const UploadPrompt = ({ onFileSelect }: { onFileSelect: (e: React.ChangeEvent<HTMLInputElement>) => void }) => (
  <>
    <Button
      component="label"
      variant="contained"
      startIcon={<CloudUploadIcon />}
      sx={{ mb: 2 }}
    >
      Upload Chart
      <VisuallyHiddenInput
        type="file"
        accept="image/*"
        onChange={onFileSelect}
      />
    </Button>
    <Typography variant="body2" color="text.secondary">
      Drag and drop an image here, or click to select
    </Typography>
  </>
);

export default function ChartOfdayView() {
  const settings = useSettingsContext();
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const [description, setDescription] = useState('');

  const handleImageUpload = useCallback((file: File) => {
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      alert('Please upload an image file');
      return;
    }

    setIsUploading(true);
    const reader = new FileReader();
    reader.onload = () => {
      setSelectedImage(reader.result as string);
      setIsUploading(false);
    };
    reader.readAsDataURL(file);
  }, []);

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
      handleImageUpload(e.dataTransfer.files[0]);
    }
  }, [handleImageUpload]);

  const handleFileSelect = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      handleImageUpload(e.target.files[0]);
    }
  }, [handleImageUpload]);

  const renderContent = () => {
    if (isUploading) {
      return <CircularProgress />;
    }
    
    if (selectedImage) {
      return <ImagePreview src={selectedImage} />;
    }
    
    return <UploadPrompt onFileSelect={handleFileSelect} />;
  };

  const handleSubmit = useCallback(() => {
    // For now, just log the data. Replace with actual upload logic later.
    console.log('Selected Image:', selectedImage);
    console.log('Description:', description);

    if (!selectedImage) {
      alert('Please select an image to upload.');
      return;
    }
    // Here you would typically trigger an API call to upload the image and description
    // For example: await uploadChartApi({ image: selectedImage, description });
    alert('Chart and description ready for upload! (Check console for data)');
  }, [selectedImage, description]);

  return (
    <Container maxWidth={settings.themeStretch ? false : 'xl'}>
      <Typography variant="h4" sx={{ mb: 5 }}> Chart Of the Day </Typography>

      <Box
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        sx={{
          mt: 5,
          width: 1,
          height: 320,
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
        label="Description"
        placeholder="Enter a description for the chart..."
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        sx={{ mt: 3 }}
      />

      <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end' }}>
        <Button
          variant="contained"
          color="primary"
          onClick={handleSubmit}
          disabled={!selectedImage || isUploading}
        >
          Upload Chart Data
        </Button>
      </Box>
    </Container>
  );
}
