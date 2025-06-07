import { useState, useCallback } from 'react';

import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import {
  Box,
  alpha,
  Button,
  styled,
  Container,
  TextField,
  Typography,
  IconButton,
  CircularProgress,
} from '@mui/material';

import { createQuiz } from 'src/api/quiz';
import { uploadImage } from 'src/api/upload';

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

export default function QuizCreateView() {
  const settings = useSettingsContext();
  const { showSnackbar } = useSnackbar();
  const [question, setQuestion] = useState('');
  const [options, setOptions] = useState(['', '', '', '']);
  const [loading, setLoading] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [dragActive, setDragActive] = useState(false);

  const handleFileChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      if (event.target.files && event.target.files[0]) {
        setSelectedFile(event.target.files[0]);
      }
    },
    []
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
        if (e.dataTransfer.files[0].type.startsWith('video/')) {
          setSelectedFile(e.dataTransfer.files[0]);
        } else {
          showSnackbar('Please drop a video file', 'error');
        }
      }
    },
    [showSnackbar]
  );

  const handleOptionChange = (index: number, value: string) => {
    const newOptions = [...options];
    newOptions[index] = value;
    setOptions(newOptions);
  };

  const handleAddOption = () => {
    setOptions([...options, '']);
  };

  const handleRemoveOption = (index: number) => {
    const newOptions = [...options];
    newOptions.splice(index, 1);
    setOptions(newOptions);
  };

  const handleSubmit = useCallback(async () => {
    if (!question || !selectedFile) {
      showSnackbar('Question and video are required', 'warning');
      return;
    }
    setLoading(true);

    let videoPath = '';
    if (selectedFile) {
        const formData = new FormData();
        formData.append('images', selectedFile);
        setIsUploading(true);
        try {
          const response = await uploadImage(formData);
          const { image_urls } = response.data.result;
          if (image_urls && image_urls.length > 0) {
            videoPath = image_urls[0];
            showSnackbar('Video uploaded successfully', 'success');
          }
        } catch (error) {
          console.error(error);
          showSnackbar('Video upload failed', 'error');
          setIsUploading(false);
          setLoading(false);
          return;
        } finally {
          setIsUploading(false);
        }
      }

    try {
      await createQuiz({ question, video: videoPath, options: options.filter(o => o) });
      showSnackbar('Quiz created successfully', 'success');
      setQuestion('');
      setSelectedFile(null);
      setOptions(['', '', '', '']);
    } catch (error) {
      console.error(error);
      showSnackbar('Failed to create quiz', 'error');
    } finally {
      setLoading(false);
    }
  }, [question, selectedFile, options, showSnackbar]);

  return (
    <Container maxWidth={settings.themeStretch ? false : 'xl'}>
      <Typography variant="h4" sx={{ mb: 5 }}>
        Create Quiz
      </Typography>

      <TextField
        fullWidth
        label="Question"
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        sx={{ mb: 3 }}
      />

      <Typography variant="h6" sx={{ mb: 2 }}>
        Upload Video
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
          textAlign: 'center',
          transition: 'background-color 0.2s ease',
        }}
      >
        {isUploading ? (
          <CircularProgress />
        ) : (
          <>
            <Button
              component="label"
              variant="outlined"
              startIcon={<CloudUploadIcon />}
              sx={{ mb: 1 }}
            >
              Choose Video
              <VisuallyHiddenInput type="file" accept="video/*" onChange={handleFileChange} />
            </Button>
            {selectedFile ? (
              <Typography variant="body2" color="text.secondary">
                Selected file: {selectedFile.name}
              </Typography>
            ) : (
              <Typography variant="body2" color="text.secondary">
                or drag and drop a video file
              </Typography>
            )}
          </>
        )}
      </Box>

      <Typography variant="h6" sx={{ mb: 2 }}>
        Options
      </Typography>

      {options.map((option, index) => (
        <Box key={index} sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <TextField
            fullWidth
            label={`Option ${index + 1}`}
            value={option}
            onChange={(e) => handleOptionChange(index, e.target.value)}
          />
          <IconButton onClick={() => handleRemoveOption(index)} disabled={options.length <= 1}>
            <RemoveCircleOutlineIcon />
          </IconButton>
        </Box>
      ))}

      <Button
        startIcon={<AddCircleOutlineIcon />}
        onClick={handleAddOption}
        sx={{ mb: 3 }}
      >
        Add Option
      </Button>

      <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end' }}>
        <Button
          variant="contained"
          color="primary"
          onClick={handleSubmit}
          disabled={loading || isUploading}
        >
          {loading ? <CircularProgress size={24} /> : 'Create Quiz'}
        </Button>
      </Box>
    </Container>
  );
} 