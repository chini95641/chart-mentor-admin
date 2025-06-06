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

import { useTranslate } from 'src/locales';

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

const useInitialCommoditiesData = () => {
  const { t } = useTranslate();
  const initialCommoditiesData: Record<CommodityId, Commodity> = {
    crude: {
      id: 'crude',
      name: t('commodity.crude.name'),
      chartPlaceholder: t('commodity.chartPlaceholder', { commodityName: t('commodity.crude.name') }),
      currentObservation: t('commodity.crude.observation'),
      observationHistory: [
        {
          id: 'obsC1',
          timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
          text: t('commodity.crude.history.0'),
        },
        {
          id: 'obsC2',
          timestamp: new Date(Date.now() - 1 * 60 * 60 * 1000),
          text: t('commodity.crude.history.1'),
        },
      ],
    },
    natural_gas: {
      id: 'natural_gas',
      name: t('commodity.naturalGas.name'),
      chartPlaceholder: t('commodity.chartPlaceholder', {
        commodityName: t('commodity.naturalGas.name'),
      }),
      currentObservation: t('commodity.naturalGas.observation'),
      observationHistory: [
        {
          id: 'obsNG1',
          timestamp: new Date(Date.now() - 3 * 60 * 60 * 1000),
          text: t('commodity.naturalGas.history.0'),
        },
      ],
    },
    gold: {
      id: 'gold',
      name: t('commodity.gold.name'),
      chartPlaceholder: t('commodity.chartPlaceholder', { commodityName: t('commodity.gold.name') }),
      currentObservation: t('commodity.gold.observation'),
      observationHistory: [
        {
          id: 'obsG1',
          timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
          text: t('commodity.gold.history.0'),
        },
        {
          id: 'obsG2',
          timestamp: new Date(Date.now() - 0.5 * 60 * 60 * 1000),
          text: t('commodity.gold.history.1'),
        },
      ],
    },
    silver: {
      id: 'silver',
      name: t('commodity.silver.name'),
      chartPlaceholder: t('commodity.chartPlaceholder', {
        commodityName: t('commodity.silver.name'),
      }),
      currentObservation: t('commodity.silver.observation'),
      observationHistory: [
        {
          id: 'obsS1',
          timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
          text: t('commodity.silver.history.0'),
        },
      ],
    },
  };
  return initialCommoditiesData;
};

export default function CommodityView() {
  const settings = useSettingsContext();
  const { t } = useTranslate();
  const initialCommoditiesData = useInitialCommoditiesData();
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
      alert(t('commodity.alerts.enterObservation'));
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
  }, [newObservationText, selectedCommodityId, t]);

  const selectedCommodity = commoditiesData[selectedCommodityId];

  return (
    <Container maxWidth={settings.themeStretch ? false : 'xl'}>
      <Typography variant="h4" sx={{ mb: 3 }}>
        {t('commodity.title')}
      </Typography>

      <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
        <Tabs
          value={selectedCommodityId}
          onChange={handleTabChange}
          aria-label="commodity selection tabs"
        >
          <Tab label={t('commodity.crude.name')} value="crude" />
          <Tab label={t('commodity.naturalGas.name')} value="natural_gas" />
          <Tab label={t('commodity.gold.name')} value="gold" />
          <Tab label={t('commodity.silver.name')} value="silver" />
        </Tabs>
      </Box>

      {selectedCommodity && (
        <Paper elevation={3} sx={{ p: 3 }}>
          <Typography variant="h5" gutterBottom>
            {selectedCommodity.name}
          </Typography>
          
          <Box sx={{ my: 2, p: 2, border: '1px dashed grey', borderRadius: 1, minHeight: 100, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Typography variant="body1" color="text.secondary">
              {selectedCommodity.chartPlaceholder}
            </Typography>
          </Box>

          <Typography variant="h6" sx={{ mt: 3 }}>
            {t('commodity.currentObservationTitle')}
          </Typography>
          <Typography variant="body1" paragraph sx={{ fontStyle: 'italic', mb:3 }}>
            {selectedCommodity.currentObservation}
          </Typography>

          <Typography variant="h6" sx={{ mt: 3 }}>
            {t('commodity.addObservationTitle')}
          </Typography>
          <TextField
            fullWidth
            multiline
            rows={2}
            label={t('commodity.observationLabel', { commodityName: selectedCommodity.name })}
            value={newObservationText}
            onChange={handleNewObservationChange}
            sx={{ mb: 2 }}
          />
          <Button variant="contained" color="primary" onClick={handleSubmitObservation}>
            {t('commodity.submitObservation')}
          </Button>

          <Typography variant="h6" sx={{ mt: 4, mb: 2 }}>
            {t('commodity.historyTitle')}
          </Typography>
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
            <Typography variant="body2" color="text.secondary">
              {t('commodity.noHistory', { commodityName: selectedCommodity.name })}
            </Typography>
          )}
        </Paper>
      )}
    </Container>
  );
} 