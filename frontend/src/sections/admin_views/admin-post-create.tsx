import { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

import { createAdminPost } from 'src/api/adminPost';

import { useSnackbar } from 'src/components/snackbar/use-snackbar';

// ----------------------------------------------------------------------

interface AdminPostCreateProps {
  onPostCreated: () => void;
}

export default function AdminPostCreate({ onPostCreated }: AdminPostCreateProps) {
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