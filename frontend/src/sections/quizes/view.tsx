import { useState, useCallback } from 'react';

import Box from '@mui/material/Box';
import Radio from '@mui/material/Radio';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import FormLabel from '@mui/material/FormLabel';
import Typography from '@mui/material/Typography';
import RadioGroup from '@mui/material/RadioGroup';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';

import { useTranslate } from 'src/locales';

import { useSettingsContext } from 'src/components/settings';
import { useSnackbar } from 'src/components/snackbar/use-snackbar';

// ----------------------------------------------------------------------

export default function QuizesView() {
  const settings = useSettingsContext();
  const { showSnackbar } = useSnackbar();

  const [selectedOption, setSelectedOption] = useState('');
  const [textInput1, setTextInput1] = useState('');
  const [textInput2, setTextInput2] = useState('');
  const { t } = useTranslate();

  const handleOptionChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedOption((event.target as HTMLInputElement).value);
  }, []);

  const handleSubmit = useCallback(() => {
    // Basic validation
    if (!selectedOption) {
      showSnackbar(t('quizzes.alerts.selectOption'), 'warning');
      return;
    }
    if (!textInput1.trim() || !textInput2.trim()) {
      showSnackbar(t('quizzes.alerts.fillInputs'), 'warning');
      return;
    }
    console.log('Submitted Data:', {
      option: selectedOption,
      input1: textInput1,
      input2: textInput2,
    });
    showSnackbar(t('quizzes.alerts.submitSuccess'), 'success');
    // Optionally reset fields
    setSelectedOption('');
    setTextInput1('');
    setTextInput2('');
  }, [selectedOption, textInput1, textInput2, t, showSnackbar]);

  return (
    <Container maxWidth={settings.themeStretch ? false : 'xl'}>
      <Typography variant="h4" sx={{ mb: 5 }}>
        {t('quizzes.title')}
      </Typography>

      <Box
        component="form"
        sx={{
          display: 'grid',
          gap: 3,
          gridTemplateColumns: '1fr' ,
        }}
        noValidate
        autoComplete="off"
      >
        <FormControl component="fieldset">
          <FormLabel component="legend">{t('quizzes.chooseOption')}</FormLabel>
          <RadioGroup
            row
            aria-label="quiz-option"
            name="quiz-option-group"
            value={selectedOption}
            onChange={handleOptionChange}
          >
            <FormControlLabel value="a" control={<Radio />} label="a" />
            <FormControlLabel value="b" control={<Radio />} label="b" />
            <FormControlLabel value="c" control={<Radio />} label="c" />
            <FormControlLabel value="d" control={<Radio />} label="d" />
          </RadioGroup>
        </FormControl>

        <TextField
          required
          label={t('quizzes.input1Label')}
          value={textInput1}
          onChange={(e) => setTextInput1(e.target.value)}
          fullWidth
          multiline
          rows={3}
        />

        <TextField
          required
          label={t('quizzes.input2Label')}
          value={textInput2}
          onChange={(e) => setTextInput2(e.target.value)}
          fullWidth
          multiline
          rows={3}
        />
        
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
          <Button variant="contained" color="primary" onClick={handleSubmit}>
            {t('quizzes.submit')}
          </Button>
        </Box>
      </Box>
    </Container>
  );
}
