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

import { useSettingsContext } from 'src/components/settings';

// ----------------------------------------------------------------------

export default function QuizesView() {
  const settings = useSettingsContext();

  const [selectedOption, setSelectedOption] = useState('');
  const [textInput1, setTextInput1] = useState('');
  const [textInput2, setTextInput2] = useState('');

  const handleOptionChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedOption((event.target as HTMLInputElement).value);
  }, []);

  const handleSubmit = useCallback(() => {
    // Basic validation
    if (!selectedOption) {
      alert('Please select an option (a, b, c, or d).');
      return;
    }
    if (!textInput1.trim() || !textInput2.trim()) {
      alert('Please fill in both text input areas.');
      return;
    }
    console.log('Submitted Data:', {
      option: selectedOption,
      input1: textInput1,
      input2: textInput2,
    });
    alert('Quiz data submitted! Check console for details.');
    // Optionally reset fields
    setSelectedOption('');
    setTextInput1('');
    setTextInput2('');
  }, [selectedOption, textInput1, textInput2]);

  return (
    <Container maxWidth={settings.themeStretch ? false : 'xl'}>
      <Typography variant="h4" sx={{ mb: 5 }}> Create Quiz </Typography>

      <Box
        component="form"
        sx={{
          display: 'grid',
          gap: 3,
          // For a single column layout
          gridTemplateColumns: '1fr' ,
          maxWidth: '600px', // Limit form width for better readability
          mx: 'auto', // Center the form
        }}
        noValidate
        autoComplete="off"
      >
        <FormControl component="fieldset">
          <FormLabel component="legend">Choose an Option</FormLabel>
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
          label="Text Input 1"
          value={textInput1}
          onChange={(e) => setTextInput1(e.target.value)}
          fullWidth
          multiline
          rows={3}
        />

        <TextField
          required
          label="Text Input 2"
          value={textInput2}
          onChange={(e) => setTextInput2(e.target.value)}
          fullWidth
          multiline
          rows={3}
        />
        
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
          <Button variant="contained" color="primary" onClick={handleSubmit}>
            Submit Quiz
          </Button>
        </Box>
      </Box>
    </Container>
  );
}
