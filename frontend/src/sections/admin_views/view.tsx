import { useState } from 'react';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Paper from '@mui/material/Paper';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import EditIcon from '@mui/icons-material/Edit';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import { Theme, styled } from '@mui/material/styles';
// Placeholder icons for actions (replace with actual icons as needed)
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import MoreVertIcon from '@mui/icons-material/MoreVert';

import { useTranslate } from 'src/locales';

import { useSettingsContext } from 'src/components/settings';
import { useSnackbar } from 'src/components/snackbar/use-snackbar';

// ----------------------------------------------------------------------

interface AdminAction {
  id: string;
  label: string;
  icon?: React.ReactElement;
  onClick: (itemId: string) => void;
}

interface AdminFeedItem {
  id: string;
  avatarUrl?: string;
  actorName: string;
  actorHandle: string;
  timestamp: Date;
  content: string;
  imageUrl?: string;
  actions: AdminAction[];
}

const useSampleAdminFeedItems = () => {
  const { t } = useTranslate();
  const { showSnackbar } = useSnackbar();

  const handleAdminAction = (actionLabel: string, itemId: string) => {
    showSnackbar(`${actionLabel} clicked for item ${itemId}`, 'info');
  };

  const sampleAdminFeedItems: AdminFeedItem[] = [
    {
      id: 'item1',
      avatarUrl: '/assets/images/avatar/avatar_1.jpg',
      actorName: t('adminViews.feed.userSubmission.actorName'),
      actorHandle: '@user_jane_doe',
      timestamp: new Date(Date.now() - 1 * 60 * 60 * 1000),
      content: t('adminViews.feed.userSubmission.content'),
      imageUrl: '/assets/images/placeholder.svg',
      actions: [
        {
          id: 'approve1',
          label: t('adminViews.actions.approve'),
          icon: <ThumbUpIcon fontSize="small" />,
          onClick: () => handleAdminAction('Approve', 'item1'),
        },
        {
          id: 'reject1',
          label: t('adminViews.actions.reject'),
          icon: <DeleteIcon fontSize="small" />,
          onClick: () => handleAdminAction('Reject', 'item1'),
        },
        {
          id: 'edit1',
          label: t('adminViews.actions.edit'),
          icon: <EditIcon fontSize="small" />,
          onClick: () => handleAdminAction('Edit', 'item1'),
        },
      ],
    },
    {
      id: 'item2',
      actorName: t('adminViews.feed.systemAlert.actorName'),
      actorHandle: '@system_monitor',
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
      content: t('adminViews.feed.systemAlert.content'),
      actions: [
        {
          id: 'view_details2',
          label: t('adminViews.actions.viewDetails'),
          onClick: () => handleAdminAction('View Details', 'item2'),
        },
        {
          id: 'acknowledge2',
          label: t('adminViews.actions.acknowledge'),
          onClick: () => handleAdminAction('Acknowledge', 'item2'),
        },
      ],
    },
    {
      id: 'item3',
      avatarUrl: '/assets/images/avatar/avatar_2.jpg',
      actorName: t('adminViews.feed.contentFlag.actorName'),
      actorHandle: '@moderation_bot',
      timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000),
      content: t('adminViews.feed.contentFlag.content'),
      actions: [
        {
          id: 'review_comment3',
          label: t('adminViews.actions.reviewComment'),
          onClick: () => handleAdminAction('Review Comment', 'item3'),
        },
        {
          id: 'remove_comment3',
          label: t('adminViews.actions.removeComment'),
          icon: <DeleteIcon fontSize="small" />,
          onClick: () => handleAdminAction('Remove Comment', 'item3'),
        },
      ],
    },
  ];
  return sampleAdminFeedItems;
};

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  marginBottom: theme.spacing(2),
  borderRadius: theme.shape.borderRadius * 1.5,
  boxShadow: theme.customShadows.card,
}));

interface AdminFeedItemCardProps {
  item: AdminFeedItem;
}

function AdminFeedItemCard({ item }: AdminFeedItemCardProps) {
  return (
    <StyledPaper>
      <Stack direction="row" spacing={2} alignItems="flex-start">
        <Avatar src={item.avatarUrl} alt={item.actorName} sx={{ width: 48, height: 48 }} />
        <Box sx={{ flexGrow: 1 }}>
          <Stack direction="row" justifyContent="space-between" alignItems="center">
            <Box>
              <Typography variant="subtitle1" component="span" sx={{ fontWeight: 'bold' }}>
                {item.actorName}
              </Typography>
              <Typography variant="body2" component="span" color="text.secondary" sx={{ ml: 0.5 }}>
                {item.actorHandle} · {item.timestamp.toLocaleTimeString()}{' '}
                {item.timestamp.toLocaleDateString()}
              </Typography>
            </Box>
            <IconButton size="small">
              <MoreVertIcon fontSize="small" />
            </IconButton>
          </Stack>
          <Typography variant="body1" sx={{ my: 1.5 }}>
            {item.content}
          </Typography>
          {item.imageUrl && (
            <Box
              sx={{
                my: 1.5,
                borderRadius: 1,
                overflow: 'hidden',
                border: (theme: Theme) => `1px solid ${theme.palette.divider}`,
              }}
            >
              <img
                src={item.imageUrl}
                alt="Feed item visual"
                style={{ width: '100%', display: 'block' }}
              />
            </Box>
          )}
          <Stack direction="row" spacing={1} sx={{ mt: 1.5 }} justifyContent="flex-start">
            {item.actions.map((action) => (
              <Button
                key={action.id}
                size="small"
                variant="outlined"
                startIcon={action.icon}
                onClick={() => action.onClick(item.id)}
                sx={{ textTransform: 'none' }}
              >
                {action.label}
              </Button>
            ))}
          </Stack>
        </Box>
      </Stack>
    </StyledPaper>
  );
}

export default function AdminViewView() {
  const settings = useSettingsContext();
  const sampleAdminFeedItems = useSampleAdminFeedItems();
  const [feedItems] = useState<AdminFeedItem[]>(sampleAdminFeedItems);
  const { t } = useTranslate();

  return (
    <Container maxWidth={settings.themeStretch ? false : 'xl'}>
      <Typography variant="h4" sx={{ mb: 3 }}>
        {t('adminViews.title')}
      </Typography>

      <Box sx={{ maxWidth: 800, mx: 'auto' }}>
        {feedItems.length > 0 ? (
          feedItems.map((item) => <AdminFeedItemCard key={item.id} item={item} />)
        ) : (
          <Typography variant="body1" color="text.secondary" sx={{ textAlign: 'center', mt: 5 }}>
            {t('adminViews.noItems')}
          </Typography>
        )}
      </Box>
    </Container>
  );
}
