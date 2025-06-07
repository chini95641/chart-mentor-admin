import { useState, useCallback, ChangeEvent, SyntheticEvent } from 'react';

import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import List from '@mui/material/List';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import { Theme } from '@mui/material/styles';
import ListItem from '@mui/material/ListItem';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

import { useTranslate } from 'src/locales';

import { useSettingsContext } from 'src/components/settings';
import { useSnackbar } from 'src/components/snackbar/use-snackbar';

// ----------------------------------------------------------------------

interface MarketStats {
  daysRange: string;
  fiftyTwoWeekRange: string;
  previousClose: string;
  openPrice: string;
  volume: string;
  avgVolume3m: string;
}

const initialMarketStats: MarketStats = {
  daysRange: '',
  fiftyTwoWeekRange: '',
  previousClose: '',
  openPrice: '',
  volume: '',
  avgVolume3m: '',
};

interface IndexObservationItem {
  id: string;
  timestamp: Date;
  marketStats: MarketStats;
  twoLinerText: string;
}

interface IndexData extends MarketStats {
  id: string;
  name: string;
  chartPlaceholder: string;
  currentTwoLinerText: string;
  observationHistory: IndexObservationItem[];
}

type IndexId = 'nifty' | 'bank_nifty' | 'fin_nifty' | 'midcap' | 'sensex';

const useInitialIndicesData = () => {
  const { t } = useTranslate();
  const initialIndicesData: Record<IndexId, IndexData> = {
    nifty: {
      id: 'nifty',
      name: t('indexInsights.indices.nifty.name'),
      chartPlaceholder: t('indexInsights.chartPlaceholder', {
        indexName: t('indexInsights.indices.nifty.name'),
      }),
      daysRange: '22,300.50 - 22,450.75',
      fiftyTwoWeekRange: '18,800.00 - 22,800.00',
      previousClose: '22,350.10',
      openPrice: '22,380.00',
      volume: '150.75M',
      avgVolume3m: '120.50M',
      currentTwoLinerText: t('indexInsights.indices.nifty.notes'),
      observationHistory: [
        {
          id: 'obsN1',
          timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
          marketStats: {
            daysRange: '22,250 - 22,350',
            fiftyTwoWeekRange: '18,750 - 22,750',
            previousClose: '22,200',
            openPrice: '22,280',
            volume: '140M',
            avgVolume3m: '115M',
          },
          twoLinerText: t('indexInsights.indices.nifty.history.0'),
        },
      ],
    },
    bank_nifty: {
      id: 'bank_nifty',
      name: t('indexInsights.indices.bank_nifty.name'),
      chartPlaceholder: t('indexInsights.chartPlaceholder', {
        indexName: t('indexInsights.indices.bank_nifty.name'),
      }),
      ...initialMarketStats,
      previousClose: '48,000',
      currentTwoLinerText: t('indexInsights.indices.bank_nifty.notes'),
      observationHistory: [],
    },
    fin_nifty: {
      id: 'fin_nifty',
      name: t('indexInsights.indices.fin_nifty.name'),
      chartPlaceholder: t('indexInsights.chartPlaceholder', {
        indexName: t('indexInsights.indices.fin_nifty.name'),
      }),
      ...initialMarketStats,
      previousClose: '21,500',
      currentTwoLinerText: t('indexInsights.indices.fin_nifty.notes'),
      observationHistory: [],
    },
    midcap: {
      id: 'midcap',
      name: t('indexInsights.indices.midcap.name'),
      chartPlaceholder: t('indexInsights.chartPlaceholder', {
        indexName: t('indexInsights.indices.midcap.name'),
      }),
      ...initialMarketStats,
      previousClose: '40,000',
      currentTwoLinerText: t('indexInsights.indices.midcap.notes'),
      observationHistory: [],
    },
    sensex: {
      id: 'sensex',
      name: t('indexInsights.indices.sensex.name'),
      chartPlaceholder: t('indexInsights.chartPlaceholder', {
        indexName: t('indexInsights.indices.sensex.name'),
      }),
      ...initialMarketStats,
      previousClose: '73,000',
      currentTwoLinerText: t('indexInsights.indices.sensex.notes'),
      observationHistory: [],
    },
  };
  return initialIndicesData;
};

const marketStatLabels = (t: (key: string) => string): Record<keyof MarketStats, string> => ({
  daysRange: t('indexInsights.marketStats.daysRange'),
  fiftyTwoWeekRange: t('indexInsights.marketStats.fiftyTwoWeekRange'),
  previousClose: t('indexInsights.marketStats.previousClose'),
  openPrice: t('indexInsights.marketStats.openPrice'),
  volume: t('indexInsights.marketStats.volume'),
  avgVolume3m: t('indexInsights.marketStats.avgVolume3m'),
});

export default function IndexInsightsView() {
  const settings = useSettingsContext();
  const { t } = useTranslate();
  const { showSnackbar } = useSnackbar();
  const initialIndicesData = useInitialIndicesData();
  const [selectedIndexId, setSelectedIndexId] = useState<IndexId>('nifty');
  const [indicesData, setIndicesData] = useState<Record<IndexId, IndexData>>(initialIndicesData);

  const [newMarketStatsInput, setNewMarketStatsInput] = useState<MarketStats>(initialMarketStats);
  const [newTwoLinerNote, setNewTwoLinerNote] = useState('');

  const handleTabChange = useCallback((event: SyntheticEvent, newValue: IndexId) => {
    setSelectedIndexId(newValue);
    setNewMarketStatsInput(initialMarketStats);
    setNewTwoLinerNote('');
  }, []);

  const handleTwoLinerNoteChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    setNewTwoLinerNote(event.target.value);
  }, []);

  const handleSubmitObservation = useCallback(() => {
    const isAnyStatFilled = Object.values(newMarketStatsInput).some((val) => val.trim() !== '');
    if (!isAnyStatFilled && !newTwoLinerNote.trim()) {
      showSnackbar(t('indexInsights.alerts.noData'), 'warning');
      return;
    }

    const newObsItem: IndexObservationItem = {
      id: `obs_idx_${Date.now()}`,
      timestamp: new Date(),
      marketStats: { ...newMarketStatsInput },
      twoLinerText: newTwoLinerNote.trim(),
    };

    setIndicesData((prevData) => {
      const currentIndexData = prevData[selectedIndexId];
      const updatedStats: MarketStats = {
        daysRange: newMarketStatsInput.daysRange.trim() || currentIndexData.daysRange,
        fiftyTwoWeekRange:
          newMarketStatsInput.fiftyTwoWeekRange.trim() || currentIndexData.fiftyTwoWeekRange,
        previousClose: newMarketStatsInput.previousClose.trim() || currentIndexData.previousClose,
        openPrice: newMarketStatsInput.openPrice.trim() || currentIndexData.openPrice,
        volume: newMarketStatsInput.volume.trim() || currentIndexData.volume,
        avgVolume3m: newMarketStatsInput.avgVolume3m.trim() || currentIndexData.avgVolume3m,
      };

      return {
        ...prevData,
        [selectedIndexId]: {
          ...currentIndexData,
          ...updatedStats,
          currentTwoLinerText: newTwoLinerNote.trim() || currentIndexData.currentTwoLinerText,
          observationHistory: [newObsItem, ...currentIndexData.observationHistory],
        },
      };
    });

    setNewMarketStatsInput(initialMarketStats);
    setNewTwoLinerNote('');
  }, [newMarketStatsInput, newTwoLinerNote, selectedIndexId, t, showSnackbar]);

  const selectedIndex = indicesData[selectedIndexId];
  const labels = marketStatLabels(t);

  const renderMarketStats = (stats: MarketStats) => (
    <Box sx={{ fontSize: '0.875rem', '& p': { my: 0.5 } }}>
      <Typography variant="body2">
        <strong>{labels.daysRange}:</strong> {stats.daysRange || 'N/A'}
      </Typography>
      <Typography variant="body2">
        <strong>{labels.fiftyTwoWeekRange}:</strong> {stats.fiftyTwoWeekRange || 'N/A'}
      </Typography>
      <Typography variant="body2">
        <strong>{labels.previousClose}:</strong> {stats.previousClose || 'N/A'}
      </Typography>
      <Typography variant="body2">
        <strong>{labels.openPrice}:</strong> {stats.openPrice || 'N/A'}
      </Typography>
      <Typography variant="body2">
        <strong>{labels.volume}:</strong> {stats.volume || 'N/A'}
      </Typography>
      <Typography variant="body2">
        <strong>{labels.avgVolume3m}:</strong> {stats.avgVolume3m || 'N/A'}
      </Typography>
    </Box>
  );

  return (
    <Container maxWidth={settings.themeStretch ? false : 'xl'}>
      <Typography variant="h4" sx={{ mb: 3 }}>
        {t('indexInsights.title')}
      </Typography>

      <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
        <Tabs
          value={selectedIndexId}
          onChange={handleTabChange}
          aria-label="index selection tabs"
          variant="scrollable"
          scrollButtons="auto"
        >
          <Tab label={t('indexInsights.indices.nifty.name')} value="nifty" />
          <Tab label={t('indexInsights.indices.bank_nifty.name')} value="bank_nifty" />
          <Tab label={t('indexInsights.indices.fin_nifty.name')} value="fin_nifty" />
          <Tab label={t('indexInsights.indices.midcap.name')} value="midcap" />
          <Tab label={t('indexInsights.indices.sensex.name')} value="sensex" />
        </Tabs>
      </Box>

      {selectedIndex && (
        <Paper elevation={3} sx={{ p: 3 }}>
          <Typography variant="h5" gutterBottom>
            {selectedIndex.name}
          </Typography>

          <Box
            sx={{
              my: 2,
              p: 2,
              border: '1px dashed grey',
              borderRadius: 1,
              minHeight: 150,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              bgcolor: (theme: Theme) => theme.palette.action.hover,
            }}
          >
            <Typography variant="body1" color="text.secondary">
              {selectedIndex.chartPlaceholder}
            </Typography>
          </Box>

          <Typography variant="h6" sx={{ mt: 3 }}>
            {t('indexInsights.currentDataTitle')}
          </Typography>
          {renderMarketStats(selectedIndex)}

          <Typography variant="h6" sx={{ mt: 2 }}>
            {t('indexInsights.keyNotesTitle')}
          </Typography>
          <Typography
            variant="body2"
            paragraph
            sx={{ fontStyle: 'italic', whiteSpace: 'pre-line' }}
          >
            {selectedIndex.currentTwoLinerText || t('indexInsights.noNotes')}
          </Typography>

          <TextField
            fullWidth
            multiline
            rows={2}
            label={t('indexInsights.notesLabel', { indexName: selectedIndex.name })}
            value={newTwoLinerNote}
            onChange={handleTwoLinerNoteChange}
            sx={{ my: 2 }}
          />
          <Button variant="contained" color="primary" onClick={handleSubmitObservation}>
            {t('indexInsights.submitUpdate')}
          </Button>

          <Typography variant="h6" sx={{ mt: 4, mb: 2 }}>
            {t('indexInsights.historyTitle')}
          </Typography>
          {selectedIndex.observationHistory.length > 0 ? (
            <List
              dense
              sx={{
                maxHeight: 400,
                overflow: 'auto',
                border: (theme: Theme) => `1px solid ${theme.palette.divider}`,
                borderRadius: 1,
                p: 1,
              }}
            >
              {selectedIndex.observationHistory.map((obs) => (
                <ListItem
                  key={obs.id}
                  divider
                  sx={{
                    flexDirection: 'column',
                    alignItems: 'flex-start',
                    mb: 1,
                    bgcolor: (theme: Theme) => theme.palette.action.disabledBackground,
                  }}
                >
                  <Typography variant="caption" color="text.secondary" gutterBottom>
                    {obs.timestamp.toLocaleString()}
                  </Typography>
                  {renderMarketStats(obs.marketStats)}
                  {obs.twoLinerText && (
                    <Typography variant="body2" sx={{ mt: 1, fontStyle: 'italic' }}>
                      <strong>Notes:</strong> {obs.twoLinerText}
                    </Typography>
                  )}
                </ListItem>
              ))}
            </List>
          ) : (
            <Typography variant="body2" color="text.secondary">
              No past observations for {selectedIndex.name}.
            </Typography>
          )}
        </Paper>
      )}
    </Container>
  );
}
