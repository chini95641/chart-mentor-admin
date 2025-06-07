import { useState, useEffect, useCallback } from 'react';

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
  CardMedia,
  Typography,
  IconButton,
  CircularProgress,
} from '@mui/material';

import { uploadImage } from 'src/api/upload';
import { HOST_API } from 'src/config-global';
import { getQuiz, updateQuiz } from 'src/api/quiz';

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

interface QuizEditViewProps {
  id: string;
}

export default function QuizEditView({ id }: QuizEditViewProps) {
  const settings = useSettingsContext();
  const { showSnackbar } = useSnackbar();
  const [question, setQuestion] = useState('');
  const [video, setVideo] = useState('');
  const [options, setOptions] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [dragActive, setDragActive] = useState(false);

  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        const quiz = await getQuiz(id);
        const { result } = quiz;
        setQuestion(result.question);
        setVideo(result.video);
        setOptions(result.options.length > 0 ? result.options : ['','','','']);
      } catch (error) {
        console.error(error);
        showSnackbar('Failed to fetch quiz details', 'error');
      } finally {
        setFetching(false);
      }
    };
    fetchQuiz();
  }, [id, showSnackbar]);

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
    if (!question) {
      showSnackbar('Question is required', 'warning');
      return;
    }
    setLoading(true);

    let videoPath = video;
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
      await updateQuiz(id, { question, video: videoPath, options: options.filter(o => o) });
      showSnackbar('Quiz updated successfully', 'success');
    } catch (error) {
      console.error(error);
      showSnackbar('Failed to update quiz', 'error');
    } finally {
      setLoading(false);
    }
  }, [id, question, video, selectedFile, options, showSnackbar]);

  if (fetching) {
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
        Edit Quiz
      </Typography>

      <TextField
        fullWidth
        label="Question"
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        sx={{ mb: 3 }}
      />

      <Typography variant="h6" sx={{ mb: 2 }}>
        Current Video
      </Typography>
      {video && (
        <CardMedia
            component="video"
            controls
            height="140"
            image={`${HOST_API}/${video}`}
            title={question}
            sx={{ mb: 3 }}
        />
      )}

      <Typography variant="h6" sx={{ mb: 2 }}>
        Upload New Video
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
          {loading ? <CircularProgress size={24} /> : 'Update Quiz'}
        </Button>
      </Box>
    </Container>
  );
}
