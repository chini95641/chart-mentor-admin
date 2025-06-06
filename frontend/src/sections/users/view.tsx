import { useState, useEffect } from 'react';

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
import { CircularProgress } from '@mui/material';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';

import { getUsers } from 'src/api/user';
import { useTranslate } from 'src/locales';

import { useSettingsContext } from 'src/components/settings';
import { useSnackbar } from 'src/components/snackbar/use-snackbar';

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

export default function UsersView() {
  const settings = useSettingsContext();
  const [membershipFilter, setMembershipFilter] = useState<'all' | 'free' | 'premium'>('all');
  const [users, setUsers] = useState<User[]>([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const { t } = useTranslate();
  const { showSnackbar } = useSnackbar();

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      try {
        const response = await getUsers(page + 1, rowsPerPage, membershipFilter);
        setUsers(response.result.users);
        setTotal(response.result.total);
      } catch (error) {
        console.error('Failed to fetch users', error);
        showSnackbar(t('alerts.fetchUsersFail'), 'error');
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, [page, rowsPerPage, membershipFilter, showSnackbar, t]);

  const handleMembershipFilterChange = (event: SelectChangeEvent<'all' | 'free' | 'premium'>) => {
    setMembershipFilter(event.target.value as 'all' | 'free' | 'premium');
    setPage(0);
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

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

      {loading ? (
        <CircularProgress />
      ) : (
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>S.No.</TableCell>
                <TableCell>{t('userList.table.userName')}</TableCell>
                <TableCell>{t('userList.table.mobileNumber')}</TableCell>
                <TableCell>{t('userList.table.email')}</TableCell>
                <TableCell>{t('userList.table.membership')}</TableCell>
                <TableCell>{t('userList.table.registrationDate')}</TableCell>
                <TableCell>{t('userList.table.expirationDate')}</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users.map((user, index) => (
                <TableRow
                  key={user.id}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell>{page * rowsPerPage + index + 1}</TableCell>
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
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={total}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </TableContainer>
      )}
    </Container>
  );
}
