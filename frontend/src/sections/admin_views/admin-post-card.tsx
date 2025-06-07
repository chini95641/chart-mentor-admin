import { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import FacebookIcon from '@mui/icons-material/Facebook';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import InstagramIcon from '@mui/icons-material/Instagram';
import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined';

import { fDate } from 'src/utils/format-time';

import { likeAdminPost, addAdminComment, deleteAdminComment } from 'src/api/adminPost';

import { useSnackbar } from 'src/components/snackbar/use-snackbar';

import { IAdminPost, IAdminComment } from 'src/types/admin-post';

// ----------------------------------------------------------------------

interface AdminPostCardProps {
  post: IAdminPost;
  onUpdate: () => void;
}

export default function AdminPostCard({ post, onUpdate }: AdminPostCardProps) {
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
        // Instagram sharing is more complex and usually requires using their API
        // or a mobile-only deep link. This is a placeholder.
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

interface CommentsSectionProps {
  postId: string;
  comments: IAdminComment[];
  onUpdate: () => void;
}

function CommentsSection({ postId, comments, onUpdate }: CommentsSectionProps) {
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