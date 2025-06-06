import { useState, useEffect } from 'react';

import Container from '@mui/material/Container';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import {
  Box,
  Card,
  Grid,
  Modal,
  Button,
  TextField,
  CardMedia,
  Typography,
  IconButton,
  CardContent,
  CircularProgress,
} from '@mui/material';

import { HOST_API } from 'src/config-global';
import {
  getChartsOfDay,
  deleteChartOfDay,
  updateChartOfDay,
} from 'src/api/chart_of_day';

import { useSettingsContext } from 'src/components/settings';
import { useSnackbar } from 'src/components/snackbar/use-snackbar';

// ----------------------------------------------------------------------

interface Chart {
  _id: string;
  imageUrl: string;
  description: string;
}

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function ChartOfDayListView() {
  const settings = useSettingsContext();
  const { showSnackbar } = useSnackbar();
  const [charts, setCharts] = useState<Chart[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingItem, setEditingItem] = useState<Chart | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editedDescription, setEditedDescription] = useState('');

  useEffect(() => {
    const fetchCharts = async () => {
      try {
        setLoading(true);
        const response = await getChartsOfDay();
        setCharts(response.data.result);
      } catch (error) {
        console.error('Failed to fetch charts', error);
        showSnackbar('Failed to fetch charts', 'error');
      } finally {
        setLoading(false);
      }
    };
    fetchCharts();
  }, [showSnackbar]);

  const handleOpenModal = (item: Chart) => {
    setEditingItem(item);
    setEditedDescription(item.description);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingItem(null);
    setEditedDescription('');
  };

  const handleUpdate = async () => {
    if (!editingItem) return;

    try {
      await updateChartOfDay(editingItem._id, {
        imageUrl: editingItem.imageUrl,
        description: editedDescription,
      });
      setCharts(
        charts.map((c) =>
          c._id === editingItem._id ? { ...c, description: editedDescription } : c
        )
      );
      showSnackbar('Chart updated successfully', 'success');
      handleCloseModal();
    } catch (error) {
      showSnackbar('Failed to update chart', 'error');
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteChartOfDay(id);
      setCharts(charts.filter((c) => c._id !== id));
      showSnackbar('Chart deleted successfully', 'success');
    } catch (error) {
      showSnackbar('Failed to delete chart', 'error');
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
        Chart of the Day List
      </Typography>
      <Grid container spacing={3}>
        {charts.map((chart) => (
          <Grid item xs={12} sm={6} md={4} key={chart._id}>
            <Card>
              <CardMedia
                component="img"
                height="140"
                image={`${HOST_API}/${chart.imageUrl}`}
                alt={chart.description}
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {chart.description}
                </Typography>
                <Box>
                  <IconButton edge="end" aria-label="edit" onClick={() => handleOpenModal(chart)}>
                    <EditIcon />
                  </IconButton>
                  <IconButton edge="end" aria-label="delete" onClick={() => handleDelete(chart._id)}>
                    <DeleteIcon />
                  </IconButton>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
      <Modal open={isModalOpen} onClose={handleCloseModal}>
        <Box sx={style}>
          <Typography variant="h6" component="h2">
            Edit Chart Description
          </Typography>
          <TextField
            fullWidth
            multiline
            rows={4}
            value={editedDescription}
            onChange={(e) => setEditedDescription(e.target.value)}
            sx={{ mt: 2, mb: 2 }}
          />
          <Button onClick={handleUpdate} variant="contained">
            Save
          </Button>
        </Box>
      </Modal>
    </Container>
  );
} 