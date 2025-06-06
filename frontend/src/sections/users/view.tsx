import { useState } from 'react';

// MUI Core imports - sorted alphabetically
import Box from '@mui/material/Box';
import MenuItem from '@mui/material/MenuItem';
import Container from '@mui/material/Container';
import InputLabel from '@mui/material/InputLabel';
import Typography from '@mui/material/Typography';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
// MUI X Date Pickers imports - sorted alphabetically by named import
// NEW MUI Table imports
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableRow from '@mui/material/TableRow';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableContainer from '@mui/material/TableContainer';

import { useTranslate } from 'src/locales';

import { useSettingsContext } from 'src/components/settings';

// ----------------------------------------------------------------------

interface User {
  id: string;
  userName: string;
  mobileNumber: string;
  email: string;
  membership: 'free' | 'premium';
  registrationDate: string;
  expirationDate?: string | null;
}

const sampleUsers: User[] = [
  { id: '1', userName: 'Alice Smith', mobileNumber: '555-0101', email: 'alice.smith@example.com', membership: 'premium', registrationDate: '2023-01-15', expirationDate: '2024-01-15' },
  { id: '2', userName: 'Bob Johnson', mobileNumber: '555-0102', email: 'bob.johnson@example.com', membership: 'free', registrationDate: '2023-03-22' },
  { id: '3', userName: 'Carol Williams', mobileNumber: '555-0103', email: 'carol.williams@example.com', membership: 'free', registrationDate: '2023-05-10' },
  { id: '4', userName: 'David Brown', mobileNumber: '555-0104', email: 'david.brown@example.com', membership: 'premium', registrationDate: '2023-07-01', expirationDate: '2024-07-01' },
  { id: '5', userName: 'Eve Davis', mobileNumber: '555-0105', email: 'eve.davis@example.com', membership: 'free', registrationDate: '2023-09-18' },
];

export default function UsersView() {
  const settings = useSettingsContext();
  const [membershipFilter, setMembershipFilter] = useState<'all' | 'free' | 'premium'>('all');
  const { t } = useTranslate();

  const handleMembershipFilterChange = (event: SelectChangeEvent<'all' | 'free' | 'premium'>) => {
    setMembershipFilter(event.target.value as 'all' | 'free' | 'premium');
  };

  const filteredUsers = sampleUsers.filter(user => 
    membershipFilter === 'all' || user.membership === membershipFilter
  );

  return (
    <Container maxWidth={settings.themeStretch ? false : 'xl'}>
      <Typography variant="h4" sx={{ mb: 3 }}>{t('userList.title')}</Typography>

      <Box sx={{ mb: 3, width: '100%', maxWidth: 300 }}>
        <FormControl fullWidth>
          <InputLabel id="membership-filter-label">{t('userList.filterByMembership')}</InputLabel>
          <Select
            labelId="membership-filter-label"
            id="membership-filter-select"
            value={membershipFilter}
            label={t('userList.filterByMembership')}
            onChange={handleMembershipFilterChange}
          >
            <MenuItem value="all">{t('userList.all')}</MenuItem>
            <MenuItem value="free">{t('userList.free')}</MenuItem>
            <MenuItem value="premium">{t('userList.premium')}</MenuItem>
          </Select>
        </FormControl>
      </Box>

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>{t('userList.table.userName')}</TableCell>
              <TableCell>{t('userList.table.mobileNumber')}</TableCell>
              <TableCell>{t('userList.table.email')}</TableCell>
              <TableCell>{t('userList.table.membership')}</TableCell>
              <TableCell>{t('userList.table.registrationDate')}</TableCell>
              <TableCell>{t('userList.table.expirationDate')}</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredUsers.map((user) => (
              <TableRow
                key={user.id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {user.userName}
                </TableCell>
                <TableCell>{user.mobileNumber}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{t(user.membership)}</TableCell>
                <TableCell>{user.registrationDate}</TableCell>
                <TableCell>{user.expirationDate || t('userList.na')}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
}
