import { useState, useCallback, ChangeEvent, SyntheticEvent } from 'react';

import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { alpha, Theme } from '@mui/material/styles';

import { useSettingsContext } from 'src/components/settings';

// ----------------------------------------------------------------------

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`learn-tabpanel-${index}`}
      aria-labelledby={`learn-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `learn-tab-${index}`,
    'aria-controls': `learn-tabpanel-${index}`,
  };
}

// State types for each tab
interface ChartInsightsData {
  chartImageUrl: string; // For now, just a string, could be File object later
  keyTakeaways: string;
}

interface ArticleSummaryData {
  articleTitle: string;
  fullText: string;
  summary: string;
}

interface VideoNotesData {
  videoUrl: string;
  videoTitle: string;
  notes: string;
}

export default function LearnView() {
  const settings = useSettingsContext();
  const [activeTab, setActiveTab] = useState(0);

  // State for Chart Insights Tab
  const [chartInsights, setChartInsights] = useState<ChartInsightsData>({
    chartImageUrl: '', // Or a default placeholder image URL
    keyTakeaways: '',
  });

  // State for Article Summary Tab
  const [articleSummary, setArticleSummary] = useState<ArticleSummaryData>({
    articleTitle: '',
    fullText: '',
    summary: '',
  });

  // State for Video Notes Tab
  const [videoNotes, setVideoNotes] = useState<VideoNotesData>({
    videoUrl: '',
    videoTitle: '',
    notes: '',
  });

  const handleTabChange = useCallback((event: SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
  }, []);

  // Generic handler for TextField changes within tabs
  const handleInputChange =
    <T extends object>(setter: React.Dispatch<React.SetStateAction<T>>, field: keyof T) =>
    (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setter((prev) => ({ ...prev, [field]: event.target.value }));
    };

  const handleSubmit = useCallback(() => {
    let dataToSubmit: any = {};
    let submittedTabName = '';

    if (activeTab === 0) {
      submittedTabName = 'Chart Insights';
      dataToSubmit = chartInsights;
      // Optionally clear fields after submit
      // setChartInsights({ chartImageUrl: '', keyTakeaways: '' });
    } else if (activeTab === 1) {
      submittedTabName = 'Article Summary';
      dataToSubmit = articleSummary;
      // setArticleSummary({ articleTitle: '', fullText: '', summary: '' });
    } else if (activeTab === 2) {
      submittedTabName = 'Video Notes';
      dataToSubmit = videoNotes;
      // setVideoNotes({ videoUrl: '', videoTitle: '', notes: '' });
    }

    if (
      !Object.values(dataToSubmit).some((value) => typeof value === 'string' && value.trim() !== '')
    ) {
      alert(`Please fill in some data for the ${submittedTabName} tab before submitting.`);
      return;
    }

    console.log(`Submitting data for tab: ${submittedTabName}`, dataToSubmit);
    alert(`Data for ${submittedTabName} submitted! Check console for details.`);
  }, [activeTab, chartInsights, articleSummary, videoNotes]);

  return (
    <Container maxWidth={settings.themeStretch ? false : 'xl'}>
      <Typography variant="h4" sx={{ mb: 3 }}>
        Learn
      </Typography>

      <Paper elevation={2} sx={{ flexGrow: 1 }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs
            value={activeTab}
            onChange={handleTabChange}
            aria-label="Learn page tabs"
            variant="fullWidth"
          >
            <Tab label="Chart Insights" {...a11yProps(0)} />
            <Tab label="Article Summary" {...a11yProps(1)} />
            <Tab label="Video Notes" {...a11yProps(2)} />
          </Tabs>
        </Box>

        <TabPanel value={activeTab} index={0}>
          <Typography variant="h6" sx={{ mb: 2 }}>
            Chart Analysis
          </Typography>
          <TextField
            fullWidth
            label="Chart Image URL (Optional)"
            value={chartInsights.chartImageUrl}
            onChange={handleInputChange(setChartInsights, 'chartImageUrl')}
            sx={{ mb: 2 }}
            placeholder="Enter URL of the chart image or leave blank"
          />
          <Box
            sx={{
              border: (theme: Theme) => `1px dashed ${theme.palette.divider}`,
              borderRadius: 1,
              p: 2,
              minHeight: 200,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              mb: 2,
              bgcolor: (theme: Theme) => alpha(theme.palette.grey[500], 0.04),
            }}
          >
            {chartInsights.chartImageUrl ? (
              <img
                src={chartInsights.chartImageUrl}
                alt="Chart Preview"
                style={{ maxWidth: '100%', maxHeight: '250px' }}
              />
            ) : (
              <Typography color="text.secondary">Chart Preview Area</Typography>
            )}
          </Box>
          <TextField
            fullWidth
            multiline
            rows={4}
            label="Key Takeaways & Analysis"
            value={chartInsights.keyTakeaways}
            onChange={handleInputChange(setChartInsights, 'keyTakeaways')}
          />
        </TabPanel>

        <TabPanel value={activeTab} index={1}>
          <Typography variant="h6" sx={{ mb: 2 }}>
            Article Summary
          </Typography>
          <TextField
            fullWidth
            label="Article Title"
            value={articleSummary.articleTitle}
            onChange={handleInputChange(setArticleSummary, 'articleTitle')}
            sx={{ mb: 2 }}
          />
          <TextField
            fullWidth
            multiline
            rows={6}
            label="Full Article Text (or paste content here)"
            value={articleSummary.fullText}
            onChange={handleInputChange(setArticleSummary, 'fullText')}
            sx={{ mb: 2 }}
          />
          <TextField
            fullWidth
            multiline
            rows={4}
            label="Your Summary"
            value={articleSummary.summary}
            onChange={handleInputChange(setArticleSummary, 'summary')}
          />
        </TabPanel>

        <TabPanel value={activeTab} index={2}>
          <Typography variant="h6" sx={{ mb: 2 }}>
            Video Notes
          </Typography>
          <TextField
            fullWidth
            label="Video URL"
            value={videoNotes.videoUrl}
            onChange={handleInputChange(setVideoNotes, 'videoUrl')}
            sx={{ mb: 2 }}
          />
          <TextField
            fullWidth
            label="Video Title (Optional)"
            value={videoNotes.videoTitle}
            onChange={handleInputChange(setVideoNotes, 'videoTitle')}
            sx={{ mb: 2 }}
          />
          <TextField
            fullWidth
            multiline
            rows={6}
            label="Key Notes & Timestamps"
            value={videoNotes.notes}
            onChange={handleInputChange(setVideoNotes, 'notes')}
          />
        </TabPanel>
      </Paper>

      <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end' }}>
        <Button variant="contained" color="primary" size="large" onClick={handleSubmit}>
          Submit Current Tab Data
        </Button>
      </Box>
    </Container>
  );
}
