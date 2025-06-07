import { useForm, Controller } from 'react-hook-form';
import { useState, useEffect, useCallback } from 'react';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import DeleteIcon from '@mui/icons-material/Delete';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import FacebookIcon from '@mui/icons-material/Facebook';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import InstagramIcon from '@mui/icons-material/Instagram';
import CircularProgress from '@mui/material/CircularProgress';
import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined';

import { fDate } from 'src/utils/format-time';

import { useTranslate } from 'src/locales';
import {
  getAdminPosts,
  likeAdminPost,
  createAdminPost,
  addAdminComment,
  deleteAdminComment,
} from 'src/api/adminPost';

import { useSettingsContext } from 'src/components/settings';
import { useSnackbar } from 'src/components/snackbar/use-snackbar';

import { IAdminPost, IAdminComment } from 'src/types/admin-post';

// ----------------------------------------------------------------------
// All components are now in this single file to avoid import/creation issues.
// ----------------------------------------------------------------------

function AdminPostCreate({ onPostCreated }: { onPostCreated: () => void }) {
  const { showSnackbar } = useSnackbar();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      content: '',
    },
  });

  const onSubmit = async (data: { content: string }) => {
    setIsSubmitting(true);
    try {
      // TODO: Get the author ID from the authenticated user context
      const authorId = '60d0fe4f5311236168a109ca'; // Placeholder
      await createAdminPost({ content: data.content, author: authorId });
      showSnackbar('Post created successfully', 'success');
      reset();
      onPostCreated();
    } catch (error) {
      showSnackbar('Failed to create post', 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card sx={{ p: 3, mb: 3 }}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={2}>
          <Controller
            name="content"
            control={control}
            rules={{ required: 'Content is required' }}
            render={({ field }) => (
              <TextField
                {...field}
                fullWidth
                multiline
                rows={4}
                placeholder="What's on your mind?"
                variant="outlined"
                error={!!errors.content}
                helperText={errors.content?.message}
              />
            )}
          />
          <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Button type="submit" variant="contained" disabled={isSubmitting}>
              Post
            </Button>
          </Box>
        </Stack>
      </form>
    </Card>
  );
}

// ----------------------------------------------------------------------

function CommentsSection({
  postId,
  comments,
  onUpdate,
}: {
  postId: string;
  comments: IAdminComment[];
  onUpdate: () => void;
}) {
  const { showSnackbar } = useSnackbar();
  const { control, handleSubmit, reset } = useForm({ defaultValues: { text: '' } });

  const onCommentSubmit = async (data: { text: string }) => {
    try {
      // TODO: Get current user from auth context
      const user = {
        _id: '60d0fe4f5311236168a109ca', // Placeholder
        name: 'Current User',
      };
      await addAdminComment(postId, { text: data.text, user: user._id });
      reset();
      onUpdate();
    } catch (error) {
      showSnackbar('Failed to add comment', 'error');
    }
  };

  const handleCommentDelete = async (commentId: string) => {
    try {
      await deleteAdminComment(postId, commentId);
      showSnackbar('Comment deleted', 'success');
      onUpdate();
    } catch (error) {
      showSnackbar('Failed to delete comment', 'error');
    }
  };

  return (
    <Stack spacing={2}>
      <Typography variant="subtitle1">Comments</Typography>

      {comments.map((comment) => (
        <Stack key={comment._id} direction="row" spacing={2} alignItems="flex-start">
          <Avatar src={comment.user.avatar} alt={comment.user.name} />
          <Box sx={{ flexGrow: 1 }}>
            <Typography variant="subtitle2">{comment.user.name}</Typography>
            <Typography variant="body2">{comment.text}</Typography>
          </Box>
          {/* TODO: Show delete button only for admin */}
          <IconButton size="small" onClick={() => handleCommentDelete(comment._id)}>
            <DeleteIcon fontSize="small" />
          </IconButton>
        </Stack>
      ))}

      <form onSubmit={handleSubmit(onCommentSubmit)}>
        <Stack direction="row" spacing={2} alignItems="center">
          <Controller
            name="text"
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <TextField {...field} fullWidth placeholder="Add a comment..." variant="outlined" />
            )}
          />
          <Button type="submit" variant="contained">
            Send
          </Button>
        </Stack>
      </form>
    </Stack>
  );
}

// ----------------------------------------------------------------------

function AdminPostCard({ post, onUpdate }: { post: IAdminPost; onUpdate: () => void }) {
  const { showSnackbar } = useSnackbar();
  const [isLiking, setIsLiking] = useState(false);

  // TODO: Get current user ID from auth context
  const currentUserId = '60d0fe4f5311236168a109ca'; // Placeholder
  const isLiked = post.likes.includes(currentUserId);

  const handleLike = async () => {
    setIsLiking(true);
    try {
      await likeAdminPost(post._id, currentUserId);
      onUpdate();
    } catch (error) {
      showSnackbar('Failed to update like', 'error');
    } finally {
      setIsLiking(false);
    }
  };

  const handleShare = (platform: 'whatsapp' | 'facebook' | 'instagram') => {
    const text = encodeURIComponent(`Check out this post: ${post.content}`);
    let url = '';
    switch (platform) {
      case 'whatsapp':
        url = `https://api.whatsapp.com/send?text=${text}`;
        break;
      case 'facebook':
        url = `https://www.facebook.com/sharer/sharer.php?u=${window.location.href}`;
        break;
      case 'instagram':
        showSnackbar('Sharing on Instagram is not directly supported via web.', 'info');
        return;
      default:
        return;
    }
    window.open(url, '_blank');
  };

  return (
    <Card sx={{ p: 3, mb: 3 }}>
      <Stack spacing={2}>
        <Stack direction="row" spacing={2} alignItems="center">
          <Avatar src={post.author?.avatar} alt={post.author?.name} />
          <Box>
            <Typography variant="subtitle2">{post.author?.name}</Typography>
            <Typography variant="caption" color="text.secondary">
              {fDate(post.createdAt)}
            </Typography>
          </Box>
          <Box sx={{ flexGrow: 1 }} />
          <IconButton>
            <MoreVertIcon />
          </IconButton>
        </Stack>

        <Typography variant="body1">{post.content}</Typography>

        <Stack direction="row" alignItems="center" spacing={1}>
          <IconButton onClick={handleLike} disabled={isLiking}>
            {isLiked ? <ThumbUpIcon color="primary" /> : <ThumbUpOutlinedIcon />}
          </IconButton>
          <Typography variant="body2">{post.likes.length} Likes</Typography>
          <Box sx={{ flexGrow: 1 }} />
          <IconButton onClick={() => handleShare('whatsapp')}>
            <WhatsAppIcon />
          </IconButton>
          <IconButton onClick={() => handleShare('facebook')}>
            <FacebookIcon />
          </IconButton>
          <IconButton onClick={() => handleShare('instagram')}>
            <InstagramIcon />
          </IconButton>
        </Stack>

        <Divider />

        <CommentsSection postId={post._id} comments={post.comments} onUpdate={onUpdate} />
      </Stack>
    </Card>
  );
}

// ----------------------------------------------------------------------

export default function AdminViewView() {
  const settings = useSettingsContext();
  const { t } = useTranslate();
  const { showSnackbar } = useSnackbar();

  const [posts, setPosts] = useState<IAdminPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchPosts = useCallback(async () => {
    try {
      setLoading(true);
      const fetchedPosts = await getAdminPosts();
      setPosts(fetchedPosts);
      setError(null);
    } catch (e: any) {
      setError(e.message || 'Failed to fetch posts');
      showSnackbar(e.message || 'Failed to fetch posts', 'error');
    } finally {
      setLoading(false);
    }
  }, [showSnackbar]);

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  return (
    <Container maxWidth={settings.themeStretch ? false : 'xl'}>
      <Typography variant="h4" sx={{ mb: 3 }}>
        {t('adminViews.title')}
      </Typography>

      <Box sx={{ maxWidth: 800, mx: 'auto' }}>
        <AdminPostCreate onPostCreated={fetchPosts} />

        {loading && <CircularProgress />}
        {error && (
          <Typography variant="body1" color="error" sx={{ textAlign: 'center', mt: 5 }}>
            {error}
          </Typography>
        )}
        {!loading && !error && (
          <>
            {posts.length > 0 ? (
              posts.map((post) => (
                <AdminPostCard key={post._id} post={post} onUpdate={fetchPosts} />
              ))
            ) : (
              <Typography variant="body1" color="text.secondary" sx={{ textAlign: 'center', mt: 5 }}>
                {t('adminViews.noItems')}
              </Typography>
            )}
          </>
        )}
      </Box>
    </Container>
  );
}
