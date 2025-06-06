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

import { useSettingsContext } from 'src/components/settings';

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

const handleAdminAction = (actionLabel: string, itemId: string) => {
  alert(`${actionLabel} clicked for item ${itemId}`);
};

const sampleAdminFeedItems: AdminFeedItem[] = [
  {
    id: 'item1',
    avatarUrl: '/assets/images/avatar/avatar_1.jpg',
    actorName: 'User Submission',
    actorHandle: '@user_jane_doe',
    timestamp: new Date(Date.now() - 1 * 60 * 60 * 1000),
    content:
      'A new travel blog post titled "Exploring the Alps" has been submitted and is awaiting approval. Please review for content guidelines and quality.',
    imageUrl: '/assets/images/placeholder.svg',
    actions: [
      {
        id: 'approve1',
        label: 'Approve',
        icon: <ThumbUpIcon fontSize="small" />,
        onClick: () => handleAdminAction('Approve', 'item1'),
      },
      {
        id: 'reject1',
        label: 'Reject',
        icon: <DeleteIcon fontSize="small" />,
        onClick: () => handleAdminAction('Reject', 'item1'),
      },
      {
        id: 'edit1',
        label: 'Edit',
        icon: <EditIcon fontSize="small" />,
        onClick: () => handleAdminAction('Edit', 'item1'),
      },
    ],
  },
  {
    id: 'item2',
    actorName: 'System Alert',
    actorHandle: '@system_monitor',
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
    content:
      'Unusual login activity detected for admin account @admin_ops. Multiple failed attempts from an unrecognized IP address. Recommend immediate investigation.',
    actions: [
      {
        id: 'view_details2',
        label: 'View Details',
        onClick: () => handleAdminAction('View Details', 'item2'),
      },
      {
        id: 'acknowledge2',
        label: 'Acknowledge',
        onClick: () => handleAdminAction('Acknowledge', 'item2'),
      },
    ],
  },
  {
    id: 'item3',
    avatarUrl: '/assets/images/avatar/avatar_2.jpg',
    actorName: 'Content Flag',
    actorHandle: '@moderation_bot',
    timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000),
    content:
      'A comment on post ID #P5678 has been flagged for potentially violating community guidelines regarding hate speech. Please review immediately.',
    actions: [
      {
        id: 'review_comment3',
        label: 'Review Comment',
        onClick: () => handleAdminAction('Review Comment', 'item3'),
      },
      {
        id: 'remove_comment3',
        label: 'Remove Comment',
        icon: <DeleteIcon fontSize="small" />,
        onClick: () => handleAdminAction('Remove Comment', 'item3'),
      },
    ],
  },
];

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

export default function AdminViewsView() {
  const settings = useSettingsContext();
  const [feedItems] = useState<AdminFeedItem[]>(sampleAdminFeedItems);

  return (
    <Container maxWidth={settings.themeStretch ? false : 'xl'}>
      <Typography variant="h4" sx={{ mb: 3 }}>
        Admin Activity Feed
      </Typography>

      <Box sx={{ maxWidth: 800, mx: 'auto' }}>
        {feedItems.length > 0 ? (
          feedItems.map((item) => <AdminFeedItemCard key={item.id} item={item} />)
        ) : (
          <Typography variant="body1" color="text.secondary" sx={{ textAlign: 'center', mt: 5 }}>
            No items in the admin feed.
          </Typography>
        )}
      </Box>
    </Container>
  );
}
