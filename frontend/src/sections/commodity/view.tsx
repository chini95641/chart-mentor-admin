// React imports
import { useState, useCallback, ChangeEvent, SyntheticEvent } from 'react';

// MUI Core imports
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
import ListItemText from '@mui/material/ListItemText'; // For explicit theme typing

// Internal imports
import { useSettingsContext } from 'src/components/settings';

// ----------------------------------------------------------------------

interface Observation {
  id: string;
  timestamp: Date;
  text: string;
}

interface Commodity {
  id: string;
  name: string;
  chartPlaceholder: string; // Placeholder for chart data/image URL
  currentObservation: string;
  observationHistory: Observation[];
}

type CommodityId = 'crude' | 'natural_gas' | 'gold' | 'silver';

const initialCommoditiesData: Record<CommodityId, Commodity> = {
  crude: {
    id: 'crude',
    name: 'Crude Oil',
    chartPlaceholder: 'Chart data for Crude Oil (placeholder)',
    currentObservation: 'Crude looking bullish, might test $80.',
    observationHistory: [
      { id: 'obsC1', timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000), text: 'Initial observation: Crude stable around $78.' },
      { id: 'obsC2', timestamp: new Date(Date.now() - 1 * 60 * 60 * 1000), text: 'Correction: Slight dip to $77.50 due to inventory news.' },
    ],
  },
  natural_gas: {
    id: 'natural_gas',
    name: 'Natural Gas',
    chartPlaceholder: 'Chart data for Natural Gas (placeholder)',
    currentObservation: 'Natural Gas prices are volatile.',
    observationHistory: [
      { id: 'obsNG1', timestamp: new Date(Date.now() - 3 * 60 * 60 * 1000), text: 'Natural Gas futures up slightly.' },
    ],
  },
  gold: {
    id: 'gold',
    name: 'Gold',
    chartPlaceholder: 'Chart data for Gold (placeholder)',
    currentObservation: 'Gold holding steady above $2000.',
    observationHistory: [
      { id: 'obsG1', timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000), text: 'Gold reached a new high yesterday.' },
      { id: 'obsG2', timestamp: new Date(Date.now() - 0.5 * 60 * 60 * 1000), text: 'Minor pullback in Gold prices.' },
    ],
  },
  silver: {
    id: 'silver',
    name: 'Silver',
    chartPlaceholder: 'Chart data for Silver (placeholder)',
    currentObservation: 'Silver following Gold\'s trend.',
    observationHistory: [
      { id: 'obsS1', timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), text: 'Silver showing resilience.' },
    ],
  },
};

export default function CommodityView() {
  const settings = useSettingsContext();
  const [selectedCommodityId, setSelectedCommodityId] = useState<CommodityId>('crude');
  const [commoditiesData, setCommoditiesData] = useState<Record<CommodityId, Commodity>>(initialCommoditiesData);
  const [newObservationText, setNewObservationText] = useState('');

  const handleTabChange = useCallback((event: SyntheticEvent, newValue: CommodityId) => {
    setSelectedCommodityId(newValue);
    setNewObservationText(''); // Clear input when changing tabs
  }, []);

  const handleNewObservationChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    setNewObservationText(event.target.value);
  }, []);

  const handleSubmitObservation = useCallback(() => {
    if (!newObservationText.trim()) {
      alert('Please enter an observation.');
      return;
    }

    const newObs: Observation = {
      id: `obs_${Date.now()}`, // Simple unique ID
      timestamp: new Date(),
      text: newObservationText.trim(),
    };

    setCommoditiesData(prevData => {
      const currentCommodity = prevData[selectedCommodityId];
      return {
        ...prevData,
        [selectedCommodityId]: {
          ...currentCommodity,
          currentObservation: newObs.text,
          observationHistory: [newObs, ...currentCommodity.observationHistory],
        },
      };
    });

    setNewObservationText(''); // Clear input field
  }, [newObservationText, selectedCommodityId]);

  const selectedCommodity = commoditiesData[selectedCommodityId];

  return (
    <Container maxWidth={settings.themeStretch ? false : 'xl'}>
      <Typography variant="h4" sx={{ mb: 3 }}>Commodity Market Observations</Typography>

      <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
        <Tabs value={selectedCommodityId} onChange={handleTabChange} aria-label="commodity selection tabs">
          <Tab label="Crude Oil" value="crude" />
          <Tab label="Natural Gas" value="natural_gas" />
          <Tab label="Gold" value="gold" />
          <Tab label="Silver" value="silver" />
        </Tabs>
      </Box>

      {selectedCommodity && (
        <Paper elevation={3} sx={{ p: 3 }}>
          <Typography variant="h5" gutterBottom>{selectedCommodity.name}</Typography>
          
          <Box sx={{ my: 2, p: 2, border: '1px dashed grey', borderRadius: 1, minHeight: 100, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Typography variant="body1" color="text.secondary">
              {selectedCommodity.chartPlaceholder}
            </Typography>
          </Box>

          <Typography variant="h6" sx={{ mt: 3 }}>Current Market Observation:</Typography>
          <Typography variant="body1" paragraph sx={{ fontStyle: 'italic', mb:3 }}>
            {selectedCommodity.currentObservation}
          </Typography>

          <Typography variant="h6" sx={{ mt: 3 }}>Add New Observation:</Typography>
          <TextField
            fullWidth
            multiline
            rows={2}
            label={`Observation for ${selectedCommodity.name}...`}
            value={newObservationText}
            onChange={handleNewObservationChange}
            sx={{ mb: 2 }}
          />
          <Button variant="contained" color="primary" onClick={handleSubmitObservation}>
            Submit Observation
          </Button>

          <Typography variant="h6" sx={{ mt: 4, mb: 2 }}>Observation History:</Typography>
          {selectedCommodity.observationHistory.length > 0 ? (
            <List dense sx={{ maxHeight: 300, overflow: 'auto', border: (theme: Theme) => `1px solid ${theme.palette.divider}`, borderRadius: 1, p:1 }}>
              {selectedCommodity.observationHistory.map((obs) => (
                <ListItem key={obs.id} divider sx={{ flexDirection: 'column', alignItems: 'flex-start', mb: 1, bgcolor: (theme: Theme) => theme.palette.action.hover }}>
                  <ListItemText
                    primary={obs.text}
                    secondary={obs.timestamp.toLocaleString()}
                    primaryTypographyProps={{ variant: 'body2' }}
                    secondaryTypographyProps={{ variant: 'caption', color: 'text.secondary' }}
                  />
                </ListItem>
              ))}
            </List>
          ) : (
            <Typography variant="body2" color="text.secondary">No past observations for {selectedCommodity.name}.</Typography>
          )}
        </Paper>
      )}
    </Container>
  );
} 