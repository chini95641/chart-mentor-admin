import { useState, useCallback } from 'react';

import Table from '@mui/material/Table';
import Paper from '@mui/material/Paper';
import TableRow from '@mui/material/TableRow';
import MenuItem from '@mui/material/MenuItem';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import FormControl from '@mui/material/FormControl';
import TableContainer from '@mui/material/TableContainer';
import Select, { SelectChangeEvent } from '@mui/material/Select';

import { useSettingsContext } from 'src/components/settings';

// ----------------------------------------------------------------------

type Role = 'admin' | 'staff' | 'none';

interface UserWithRole {
  id: string;
  name: string;
  email: string;
  currentRole: Role;
}

const sampleUsers: UserWithRole[] = [
  { id: 'user1', name: 'Alice Wonderland', email: 'alice@example.com', currentRole: 'admin' },
  { id: 'user2', name: 'Bob The Builder', email: 'bob@example.com', currentRole: 'staff' },
  { id: 'user3', name: 'Charlie Brown', email: 'charlie@example.com', currentRole: 'none' },
  { id: 'user4', name: 'Diana Prince', email: 'diana@example.com', currentRole: 'staff' },
  { id: 'user5', name: 'Edward Scissorhands', email: 'edward@example.com', currentRole: 'none' },
];

const roleOptions: { value: Role; label: string }[] = [
  { value: 'admin', label: 'Admin' },
  { value: 'staff', label: 'Staff' },
  { value: 'none', label: 'None' },
];

export default function RoleView() {
  const settings = useSettingsContext();
  const [usersList, setUsersList] = useState<UserWithRole[]>(sampleUsers);

  const handleRoleChange = useCallback((userId: string, event: SelectChangeEvent<Role>) => {
    const newRole = event.target.value as Role;
    setUsersList(prevUsers => 
      prevUsers.map(user => 
        user.id === userId ? { ...user, currentRole: newRole } : user
      )
    );
    // In a real app, you would also make an API call here to update the role on the backend.
    console.log(`User ${userId} role changed to ${newRole}`);
  }, []);

  return (
    <Container maxWidth={settings.themeStretch ? false : 'xl'}>
      <Typography variant="h4" sx={{ mb: 5 }}>Role Management</Typography>

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="role management table">
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Current Role</TableCell>
              <TableCell align="center">Change Role</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {usersList.map((user) => (
              <TableRow key={user.id}>
                <TableCell component="th" scope="row">
                  {user.name}
                </TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell sx={{ textTransform: 'capitalize' }}>{user.currentRole}</TableCell>
                <TableCell align="center">
                  <FormControl size="small" sx={{ minWidth: 120 }}>
                    <Select
                      value={user.currentRole}
                      onChange={(event) => handleRoleChange(user.id, event)}
                      displayEmpty
                      inputProps={{ 'aria-label': `Change role for ${user.name}` }}
                    >
                      {roleOptions.map(option => (
                        <MenuItem key={option.value} value={option.value} sx={{ textTransform: 'capitalize' }}>
                          {option.label}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
}
