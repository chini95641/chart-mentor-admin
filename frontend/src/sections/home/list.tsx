import { useState, useEffect } from 'react';

import Container from '@mui/material/Container';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import {
  Box,
  Card,
  Grid,
  List,
  Modal,
  Button,
  ListItem,
  TextField,
  Typography,
  IconButton,
  CardContent,
  ListItemText,
  CircularProgress,
} from '@mui/material';

import {
  getQuotes,
  getComments,
  deleteQuote,
  updateQuote,
  deleteComment,
  updateComment,
} from 'src/api/home';

import { useSettingsContext } from 'src/components/settings';
import { useSnackbar } from 'src/components/snackbar/use-snackbar';

// ----------------------------------------------------------------------

interface Item {
  _id: string;
  text: string;
  createdAt: string;
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

export default function HomeListView() {
  const settings = useSettingsContext();
  const { showSnackbar } = useSnackbar();
  const [quotes, setQuotes] = useState<Item[]>([]);
  const [comments, setComments] = useState<Item[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingItem, setEditingItem] = useState<Item | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editedText, setEditedText] = useState('');
  const [itemType, setItemType] = useState<'quote' | 'comment' | null>(null);

  useEffect(() => {
    const fetchAllData = async () => {
      try {
        setLoading(true);
        const [quotesRes, commentsRes] = await Promise.all([getQuotes(), getComments()]);
        setQuotes(quotesRes.data.result);
        setComments(commentsRes.data.result);
      } catch (error) {
        console.error('Failed to fetch data', error);
        showSnackbar('Failed to fetch data', 'error');
      } finally {
        setLoading(false);
      }
    };
    fetchAllData();
  }, [showSnackbar]);

  const handleOpenModal = (item: Item, type: 'quote' | 'comment') => {
    setEditingItem(item);
    setEditedText(item.text);
    setItemType(type);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingItem(null);
    setEditedText('');
    setItemType(null);
  };

  const handleUpdate = async () => {
    if (!editingItem || !itemType) return;

    try {
      if (itemType === 'quote') {
        await updateQuote(editingItem._id, editedText);
        setQuotes(quotes.map((q) => (q._id === editingItem._id ? { ...q, text: editedText } : q)));
      } else {
        await updateComment(editingItem._id, editedText);
        setComments(
          comments.map((c) => (c._id === editingItem._id ? { ...c, text: editedText } : c))
        );
      }
      showSnackbar('Item updated successfully', 'success');
      handleCloseModal();
    } catch (error) {
      showSnackbar('Failed to update item', 'error');
    }
  };

  const handleDelete = async (id: string, type: 'quote' | 'comment') => {
    try {
      if (type === 'quote') {
        await deleteQuote(id);
        setQuotes(quotes.filter((q) => q._id !== id));
      } else {
        await deleteComment(id);
        setComments(comments.filter((c) => c._id !== id));
      }
      showSnackbar('Item deleted successfully', 'success');
    } catch (error) {
      showSnackbar('Failed to delete item', 'error');
    }
  };

  const renderList = (title: string, items: Item[], type: 'quote' | 'comment') => (
    <Card>
      <CardContent>
        <Typography variant="h5" component="div" gutterBottom>
          {title}
        </Typography>
        <List>
          {items.map((item) => (
            <ListItem
              key={item._id}
              divider
              secondaryAction={
                <Box>
                  <IconButton edge="end" aria-label="edit" onClick={() => handleOpenModal(item, type)}>
                    <EditIcon />
                  </IconButton>
                  <IconButton edge="end" aria-label="delete" onClick={() => handleDelete(item._id, type)}>
                    <DeleteIcon />
                  </IconButton>
                </Box>
              }
            >
              <ListItemText
                primary={item.text}
                secondary={`Created on: ${new Date(item.createdAt).toLocaleDateString()}`}
              />
            </ListItem>
          ))}
        </List>
      </CardContent>
    </Card>
  );

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
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          {renderList('Quotes', quotes, 'quote')}
        </Grid>
        <Grid item xs={12} md={6}>
          {renderList('Comments', comments, 'comment')}
        </Grid>
      </Grid>
      <Modal open={isModalOpen} onClose={handleCloseModal}>
        <Box sx={style}>
          <Typography variant="h6" component="h2">
            Edit Item
          </Typography>
          <TextField
            fullWidth
            multiline
            rows={4}
            value={editedText}
            onChange={(e) => setEditedText(e.target.value)}
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
