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

import { useTranslate } from 'src/locales';

import { useSettingsContext } from 'src/components/settings';
import { useSnackbar } from 'src/components/snackbar/use-snackbar';

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
  videoTitle: string;
  notes: string;
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
  const { t } = useTranslate();
  const { showSnackbar } = useSnackbar();

  // State for Chart Insights Tab
  const [chartInsights, setChartInsights] = useState<ChartInsightsData>({
    chartImageUrl: '', // Or a default placeholder image URL
    keyTakeaways: '',
    videoTitle: '',
    notes: '',
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
      submittedTabName = t('learn.tabs.chartInsights');
      dataToSubmit = chartInsights;
      // Optionally clear fields after submit
      // setChartInsights({ chartImageUrl: '', keyTakeaways: '' });
    } else if (activeTab === 1) {
      submittedTabName = t('learn.tabs.articleSummary');
      dataToSubmit = articleSummary;
      // setArticleSummary({ articleTitle: '', fullText: '', summary: '' });
    } else if (activeTab === 2) {
      submittedTabName = t('learn.tabs.videoNotes');
      dataToSubmit = videoNotes;
      // setVideoNotes({ videoUrl: '', videoTitle: '', notes: '' });
    }

    if (
      !Object.values(dataToSubmit).some((value) => typeof value === 'string' && value.trim() !== '')
    ) {
      showSnackbar(t('learn.alerts.fillData', { tabName: submittedTabName }), 'warning');
      return;
    }

    console.log(`Submitting data for tab: ${submittedTabName}`, dataToSubmit);
    showSnackbar(t('learn.alerts.submitSuccess', { tabName: submittedTabName }), 'success');
  }, [activeTab, chartInsights, articleSummary, videoNotes, t, showSnackbar]);

  return (
    <Container maxWidth={settings.themeStretch ? false : 'xl'}>
      <Typography variant="h4" sx={{ mb: 3 }}>
        {t('learn.title')}
      </Typography>

      <Paper elevation={2} sx={{ flexGrow: 1 }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs
            value={activeTab}
            onChange={handleTabChange}
            aria-label="Learn page tabs"
            variant="fullWidth"
          >
            <Tab label={t('learn.tabs.chartInsights')} {...a11yProps(0)} />
            <Tab label={t('learn.tabs.articleSummary')} {...a11yProps(1)} />
            <Tab label={t('learn.tabs.videoNotes')} {...a11yProps(2)} />
          </Tabs>
        </Box>

        <TabPanel value={activeTab} index={0}>
          <Typography variant="h6" sx={{ mb: 2 }}>
            {t('learn.chartAnalysis.title')}
          </Typography>
          <TextField
            fullWidth
            label={t('learn.chartAnalysis.imageUrlLabel')}
            value={chartInsights.chartImageUrl}
            onChange={handleInputChange(setChartInsights, 'chartImageUrl')}
            sx={{ mb: 2 }}
            placeholder={t('learn.chartAnalysis.imageUrlPlaceholder')}
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
                alt={t('learn.chartAnalysis.chartPreviewAlt')}
                style={{ maxWidth: '100%', maxHeight: '250px' }}
              />
            ) : (
              <Typography color="text.secondary">{t('learn.chartAnalysis.previewArea')}</Typography>
            )}
          </Box>
          <TextField
            fullWidth
            multiline
            rows={4}
            label={t('learn.chartAnalysis.takeawaysLabel')}
            value={chartInsights.keyTakeaways}
            onChange={handleInputChange(setChartInsights, 'keyTakeaways')}
          />
        </TabPanel>

        <TabPanel value={activeTab} index={1}>
          <Typography variant="h6" sx={{ mb: 2 }}>
            {t('learn.articleSummary.title')}
          </Typography>
          <TextField
            fullWidth
            label={t('learn.articleSummary.articleTitleLabel')}
            value={articleSummary.articleTitle}
            onChange={handleInputChange(setArticleSummary, 'articleTitle')}
            sx={{ mb: 2 }}
          />
          <TextField
            fullWidth
            multiline
            rows={6}
            label={t('learn.articleSummary.fullTextLabel')}
            value={articleSummary.fullText}
            onChange={handleInputChange(setArticleSummary, 'fullText')}
            sx={{ mb: 2 }}
          />
          <TextField
            fullWidth
            multiline
            rows={4}
            label={t('learn.articleSummary.summaryLabel')}
            value={articleSummary.summary}
            onChange={handleInputChange(setArticleSummary, 'summary')}
          />
        </TabPanel>

        <TabPanel value={activeTab} index={2}>
          <Typography variant="h6" sx={{ mb: 2 }}>
            {t('learn.videoNotes.title')}
          </Typography>
          <TextField
            fullWidth
            label={t('learn.videoNotes.videoUrlLabel')}
            value={videoNotes.videoUrl}
            onChange={handleInputChange(setVideoNotes, 'videoUrl')}
            sx={{ mb: 2 }}
          />
          <TextField
            fullWidth
            label={t('learn.videoNotes.videoTitleLabel')}
            value={videoNotes.videoTitle}
            onChange={handleInputChange(setVideoNotes, 'videoTitle')}
            sx={{ mb: 2 }}
          />
          <TextField
            fullWidth
            multiline
            rows={6}
            label={t('learn.videoNotes.notesLabel')}
            value={videoNotes.notes}
            onChange={handleInputChange(setVideoNotes, 'notes')}
          />
        </TabPanel>

        <Box sx={{ p: 2, display: 'flex', justifyContent: 'flex-end', borderTop: 1, borderColor: 'divider' }}>
          <Button variant="contained" color="primary" onClick={handleSubmit}>
            {t('learn.submit')}
          </Button>
        </Box>
      </Paper>
    </Container>
  );
}
