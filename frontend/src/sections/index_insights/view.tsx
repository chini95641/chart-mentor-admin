import { useState, useCallback, ChangeEvent, SyntheticEvent } from 'react';

import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import List from '@mui/material/List';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import { Theme } from '@mui/material/styles';
import ListItem from '@mui/material/ListItem';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

import { useSettingsContext } from 'src/components/settings';

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

const initialIndicesData: Record<IndexId, IndexData> = {
  nifty: {
    id: 'nifty',
    name: 'Nifty 50',
    chartPlaceholder: 'Chart data for Nifty 50 (placeholder)',
    daysRange: '22,300.50 - 22,450.75',
    fiftyTwoWeekRange: '18,800.00 - 22,800.00',
    previousClose: '22,350.10',
    openPrice: '22,380.00',
    volume: '150.75M',
    avgVolume3m: '120.50M',
    currentTwoLinerText: 'Key support at 22,200. Watch for breakout or breakdown.',
    observationHistory: [
      { id: 'obsN1', timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000), marketStats: { daysRange: '22,250 - 22,350', fiftyTwoWeekRange: '18,750 - 22,750', previousClose: '22,200', openPrice: '22,280', volume: '140M', avgVolume3m: '115M' }, twoLinerText: 'Opened gap up, then consolidated.' },
    ],
  },
  bank_nifty: {
    id: 'bank_nifty',
    name: 'Bank Nifty',
    chartPlaceholder: 'Chart data for Bank Nifty (placeholder)',
    ...initialMarketStats,
    previousClose: '48,000',
    currentTwoLinerText: 'Awaiting PSU bank participation.',
    observationHistory: [],
  },
  fin_nifty: {
    id: 'fin_nifty',
    name: 'Fin Nifty',
    chartPlaceholder: 'Chart data for Fin Nifty (placeholder)',
    ...initialMarketStats,
    previousClose: '21,500',
    currentTwoLinerText: 'NBFCs in focus.',
    observationHistory: [],
  },
  midcap: {
    id: 'midcap',
    name: 'Nifty Midcap 100',
    chartPlaceholder: 'Chart data for Nifty Midcap 100 (placeholder)',
    ...initialMarketStats,
    previousClose: '40,000',
    currentTwoLinerText: 'Stock-specific action.',
    observationHistory: [],
  },
  sensex: {
    id: 'sensex',
    name: 'BSE Sensex',
    chartPlaceholder: 'Chart data for BSE Sensex (placeholder)',
    ...initialMarketStats,
    previousClose: '73,000',
    currentTwoLinerText: 'Global cues important.',
    observationHistory: [],
  },
};

export default function IndexInsightsView() {
  const settings = useSettingsContext();
  const [selectedIndexId, setSelectedIndexId] = useState<IndexId>('nifty');
  const [indicesData, setIndicesData] = useState<Record<IndexId, IndexData>>(initialIndicesData);
  
  const [newMarketStatsInput, setNewMarketStatsInput] = useState<MarketStats>(initialMarketStats);
  const [newTwoLinerNote, setNewTwoLinerNote] = useState('');

  const handleTabChange = useCallback((event: SyntheticEvent, newValue: IndexId) => {
    setSelectedIndexId(newValue);
    setNewMarketStatsInput(initialMarketStats); 
    setNewTwoLinerNote('');
  }, []);

  const handleMarketStatInputChange = useCallback((field: keyof MarketStats, event: ChangeEvent<HTMLInputElement>) => {
    setNewMarketStatsInput(prev => ({ ...prev, [field]: event.target.value }));
  }, []);

  const handleTwoLinerNoteChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    setNewTwoLinerNote(event.target.value);
  }, []);

  const handleSubmitObservation = useCallback(() => {
    const isAnyStatFilled = Object.values(newMarketStatsInput).some(val => val.trim() !== '');
    if (!isAnyStatFilled && !newTwoLinerNote.trim()) {
      alert('Please enter some market data or a note.');
      return;
    }

    const newObsItem: IndexObservationItem = {
      id: `obs_idx_${Date.now()}`,
      timestamp: new Date(),
      marketStats: { ...newMarketStatsInput },
      twoLinerText: newTwoLinerNote.trim(),
    };

    setIndicesData(prevData => {
      const currentIndexData = prevData[selectedIndexId];
      const updatedStats: MarketStats = {
        daysRange: newMarketStatsInput.daysRange.trim() || currentIndexData.daysRange,
        fiftyTwoWeekRange: newMarketStatsInput.fiftyTwoWeekRange.trim() || currentIndexData.fiftyTwoWeekRange,
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
  }, [newMarketStatsInput, newTwoLinerNote, selectedIndexId]);

  const selectedIndex = indicesData[selectedIndexId];

  const renderMarketStats = (stats: MarketStats) => (
    <Box sx={{ fontSize: '0.875rem', '& p': { my: 0.5 } }}>
        <Typography variant="body2"><strong>Day&apos;s Range:</strong> {stats.daysRange || 'N/A'}</Typography>
        <Typography variant="body2"><strong>52 Week Range:</strong> {stats.fiftyTwoWeekRange || 'N/A'}</Typography>
        <Typography variant="body2"><strong>Prev. Close:</strong> {stats.previousClose || 'N/A'}</Typography>
        <Typography variant="body2"><strong>Open:</strong> {stats.openPrice || 'N/A'}</Typography>
        <Typography variant="body2"><strong>Volume:</strong> {stats.volume || 'N/A'}</Typography>
        <Typography variant="body2"><strong>Avg. Vol (3m):</strong> {stats.avgVolume3m || 'N/A'}</Typography>
    </Box>
  );

  return (
    <Container maxWidth={settings.themeStretch ? false : 'xl'}>
      <Typography variant="h4" sx={{ mb: 3 }}>
        Index Insights
      </Typography>

      <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
        <Tabs value={selectedIndexId} onChange={handleTabChange} aria-label="index selection tabs" variant="scrollable" scrollButtons="auto">
          <Tab label="Nifty 50" value="nifty" />
          <Tab label="Bank Nifty" value="bank_nifty" />
          <Tab label="Fin Nifty" value="fin_nifty" />
          <Tab label="Midcap 100" value="midcap" />
          <Tab label="Sensex" value="sensex" />
        </Tabs>
      </Box>

      {selectedIndex && (
        <Paper elevation={3} sx={{ p: 3 }}>
          <Typography variant="h5" gutterBottom>{selectedIndex.name}</Typography>
          
          <Box sx={{ my: 2, p: 2, border: '1px dashed grey', borderRadius: 1, minHeight: 150, display: 'flex', alignItems: 'center', justifyContent: 'center', bgcolor: (theme: Theme) => theme.palette.action.hover }}>
            <Typography variant="body1" color="text.secondary">
              {selectedIndex.chartPlaceholder}
            </Typography>
          </Box>

          <Typography variant="h6" sx={{ mt: 3 }}>Current Market Data:</Typography>
          {renderMarketStats(selectedIndex)}

          <Typography variant="h6" sx={{ mt: 2 }}>Key Notes:</Typography>
          <Typography variant="body2" paragraph sx={{ fontStyle: 'italic', whiteSpace: 'pre-line' }}>
            {selectedIndex.currentTwoLinerText || "No key notes."}
          </Typography>

          <Typography variant="h6" sx={{ mt: 3, mb: 2 }}>Add New Update:</Typography>
          <Grid container spacing={2}>
            {(Object.keys(initialMarketStats) as Array<keyof MarketStats>).map((key) => (
                <Grid item xs={12} sm={6} key={key}>
                    <TextField 
                        fullWidth 
                        size="small"
                        label={key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                        value={newMarketStatsInput[key]}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => handleMarketStatInputChange(key, e)}
                    />
                </Grid>
            ))}
          </Grid>
          <TextField
            fullWidth
            multiline
            rows={2}
            label={`Additional Notes (2 lines) for ${selectedIndex.name}...`}
            value={newTwoLinerNote}
            onChange={handleTwoLinerNoteChange}
            sx={{ my: 2 }}
          />
          <Button variant="contained" color="primary" onClick={handleSubmitObservation}>
            Submit Update
          </Button>

          <Typography variant="h6" sx={{ mt: 4, mb: 2 }}>Observation History:</Typography>
          {selectedIndex.observationHistory.length > 0 ? (
            <List dense sx={{ maxHeight: 400, overflow: 'auto', border: (theme: Theme) => `1px solid ${theme.palette.divider}`, borderRadius: 1, p:1 }}>
              {selectedIndex.observationHistory.map((obs) => (
                <ListItem key={obs.id} divider sx={{ flexDirection: 'column', alignItems: 'flex-start', mb: 1, bgcolor: (theme: Theme) => theme.palette.action.disabledBackground }}>
                    <Typography variant="caption" color="text.secondary" gutterBottom>{obs.timestamp.toLocaleString()}</Typography>
                    {renderMarketStats(obs.marketStats)}
                    {obs.twoLinerText && (
                        <Typography variant="body2" sx={{ mt: 1, fontStyle:'italic' }}><strong>Notes:</strong> {obs.twoLinerText}</Typography>
                    )}
                </ListItem>
              ))}
            </List>
          ) : (
            <Typography variant="body2" color="text.secondary">No past observations for {selectedIndex.name}.</Typography>
          )}
        </Paper>
      )}
    </Container>
  );
}
