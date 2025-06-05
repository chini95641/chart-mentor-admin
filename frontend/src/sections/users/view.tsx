import { useState, useCallback } from 'react';

// MUI Core imports - sorted alphabetically
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import Typography from '@mui/material/Typography';
import FormControl from '@mui/material/FormControl';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import Select, { SelectChangeEvent } from '@mui/material/Select';
// MUI X Date Pickers imports - sorted alphabetically by named import
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';

import { useSettingsContext } from 'src/components/settings';

// ----------------------------------------------------------------------

export default function UsersView() {
  const settings = useSettingsContext();
  const [userName, setUserName] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [membership, setMembership] = useState<'' | 'free' | 'premium'>('');
  const [expirationDate, setExpirationDate] = useState<Date | null>(null);

  const handleMembershipChange = useCallback((event: SelectChangeEvent<'' | 'free' | 'premium'>) => {
    const newMembership = event.target.value as '' | 'free' | 'premium';
    setMembership(newMembership);
    if (newMembership !== 'premium') {
      setExpirationDate(null); // Reset expiration date if not premium
    }
  }, []);

  const handleAddUser = useCallback(() => {
    if (!userName || !mobileNumber || !membership) {
        alert('Please fill in all required fields: User Name, Mobile Number, and Membership.');
        return;
    }
    if (membership === 'premium' && !expirationDate) {
        alert('Please select an expiration date for premium membership.');
        return;
    }
    console.log('User Data:', {
      userName,
      mobileNumber,
      membership,
      expirationDate: membership === 'premium' ? expirationDate : null,
    });
    alert('User data ready to be added! Check console for details.');
    // Reset form after submission (optional)
    setUserName('');
    setMobileNumber('');
    setMembership('');
    setExpirationDate(null);
  }, [userName, mobileNumber, membership, expirationDate]);

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Container maxWidth={settings.themeStretch ? false : 'xl'}>
        <Typography variant="h4" sx={{ mb: 5 }}>Manage Users</Typography>

        <Box
          component="form"
          sx={{
            display: 'grid',
            gap: 3,
            // For a single column layout on smaller screens, and two columns on larger ones
            gridTemplateColumns: { xs: '1fr', md: 'repeat(2, 1fr)' }, 
          }}
          noValidate
          autoComplete="off"
        >
          <TextField
            required
            label="User Name"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            fullWidth
          />

          <TextField
            required
            label="Mobile Number"
            type="tel"
            value={mobileNumber}
            onChange={(e) => setMobileNumber(e.target.value)}
            fullWidth
          />

          <FormControl fullWidth required>
            <InputLabel id="membership-select-label">Membership</InputLabel>
            <Select
              labelId="membership-select-label"
              id="membership-select"
              value={membership}
              label="Membership"
              onChange={handleMembershipChange}
            >
              <MenuItem value=""><em>Select Membership</em></MenuItem>
              <MenuItem value="free">Free</MenuItem>
              <MenuItem value="premium">Premium</MenuItem>
            </Select>
          </FormControl>

          {membership === 'premium' && (
            <DatePicker
              label="Expiration Date"
              value={expirationDate}
              onChange={(newValue) => setExpirationDate(newValue)}
              sx={{ width: '100%' }} // Ensure DatePicker takes full width in grid cell
            />
          )}
        
          {/* This Box ensures the button spans both columns if they exist, or stays in its place in a single column */} 
          <Box sx={{ gridColumn: { md: '1 / -1' } , display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
            <Button variant="contained" color="primary" onClick={handleAddUser}>
              Add User
            </Button>
          </Box>
        </Box>
      </Container>
    </LocalizationProvider>
  );
}
