import { useState, useEffect } from 'react';
import { Link as RouterLink } from 'react-router-dom';

import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import {
  Box,
  Card,
  Grid,
  Container,
  CardMedia,
  Typography,
  IconButton,
  CardContent,
  CircularProgress,
} from '@mui/material';

import { paths } from 'src/routes/paths';

import { HOST_API } from 'src/config-global';
import { getQuizzes, deleteQuiz } from 'src/api/quiz';

import { useSettingsContext } from 'src/components/settings';
import { useSnackbar } from 'src/components/snackbar/use-snackbar';

// ----------------------------------------------------------------------

interface Quiz {
  _id: string;
  question: string;
  video: string;
  options: string[];
}

export default function QuizListView() {
  const settings = useSettingsContext();
  const { showSnackbar } = useSnackbar();
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchQuizzes = async () => {
      try {
        setLoading(true);
        const response = await getQuizzes();
        if (response && Array.isArray(response.result)) {
            setQuizzes(response.result);
        } else {
            setQuizzes([]);
        }
      } catch (error) {
        console.error('Failed to fetch quizzes', error);
        showSnackbar('Failed to fetch quizzes', 'error');
      } finally {
        setLoading(false);
      }
    };
    fetchQuizzes();
  }, [showSnackbar]);

  const handleDelete = async (id: string) => {
    try {
      await deleteQuiz(id);
      setQuizzes(quizzes.filter((q) => q._id !== id));
      showSnackbar('Quiz deleted successfully', 'success');
    } catch (error) {
      showSnackbar('Failed to delete quiz', 'error');
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
        Quizzes
      </Typography>
      <Grid container spacing={3}>
        {quizzes.map((quiz) => (
          <Grid item xs={12} sm={6} md={4} key={quiz._id}>
            <Card>
              {quiz.video && (
                <CardMedia
                  component="video"
                  controls
                  height="140"
                  image={`${HOST_API}/${quiz.video}`}
                  title={quiz.question}
                />
              )}
              <CardContent>
                <Typography variant="h6">{quiz.question}</Typography>
                <Box sx={{ mt: 2 }}>
                  {quiz.options.map((option, index) => (
                    <Typography key={index} variant="body2">
                      {index + 1}. {option}
                    </Typography>
                  ))}
                </Box>
                <Box>
                  <IconButton
                    component={RouterLink}
                    to={paths.dashboard.quizzes.edit(quiz._id)}
                    edge="end"
                    aria-label="edit"
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton edge="end" aria-label="delete" onClick={() => handleDelete(quiz._id)}>
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
