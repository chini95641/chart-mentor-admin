import { useState, useEffect, useCallback } from 'react';

import Table from '@mui/material/Table';
import Paper from '@mui/material/Paper';
import TableRow from '@mui/material/TableRow';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import TableContainer from '@mui/material/TableContainer';
import { Box, Button, Tooltip, IconButton, TablePagination } from '@mui/material';

import axios from 'src/utils/axios';

import { useTranslate } from 'src/locales';

import Iconify from 'src/components/iconify';
import { useSettingsContext } from 'src/components/settings';

import { IUser } from 'src/types/user_type';

import UserNewEditForm from './user-new-edit-form';

// ----------------------------------------------------------------------

type Role = 'admin' | 'staff' | 'none';

interface UserWithRole {
  id: string;
  name: string;
  email: string;
  phone_number: string;
  address: string;
  membership: string;
  expiration_date: string;
  currentRole: Role;
}

export default function RoleView() {
  const settings = useSettingsContext();
  const [usersList, setUsersList] = useState<UserWithRole[]>([]);
  const { t } = useTranslate();
  const [open, setOpen] = useState(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [total, setTotal] = useState(0);
  const [currentUser, setCurrentUser] = useState<IUser | null>(null);

  const getUsers = useCallback(async () => {
    try {
      const response = await axios.get('/api/auth/get-users', {
        params: {
          page: page + 1,
          limit: rowsPerPage,
        },
      });
      const { users, total: totalUsers } = response.data.result;
      const formattedUsers = users.map((user: any) => ({
        id: user.id,
        name: user.name,
        email: user.email,
        phone_number: user.phone_number,
        address: user.address,
        membership: user.membership,
        expiration_date: user.expiration_date
          ? new Date(user.expiration_date).toLocaleDateString()
          : '',
        currentRole: user.role as Role,
      }));
      setUsersList(formattedUsers);
      setTotal(totalUsers);
    } catch (error) {
      console.error(error);
    }
  }, [page, rowsPerPage]);

  useEffect(() => {
    getUsers();
  }, [getUsers]);

  const handleChangePage = (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleEditUser = (user: UserWithRole) => {
    const userToEdit: IUser = {
      id: user.id,
      first_name: user.name.split(' ')[0],
      last_name: user.name.split(' ')[1],
      email: user.email,
      phone_number: user.phone_number,
      address: user.address,
      role: user.currentRole,
      membership: user.membership as 'free' | 'premium',
      expiration_date: user.expiration_date ? new Date(user.expiration_date) : null,
    };
    setCurrentUser(userToEdit);
    setOpen(true);
  };

  const handleDeleteUser = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      try {
        await axios.delete(`/api/auth/${id}`);
        getUsers();
      } catch (error) {
        console.error(error);
      }
    }
  };

  const handleCreateUser = async (user: IUser) => {
    try {
      const response = await axios.post('/api/auth/register', { user });
      const { user_id, email, role, name, phone_number, address, membership, expiration_date } =
        response.data.result;
      const newUser: UserWithRole = {
        id: user_id,
        name,
        email,
        phone_number,
        address,
        membership,
        expiration_date: expiration_date ? new Date(expiration_date).toLocaleDateString() : '',
        currentRole: role as Role,
      };
      setUsersList((prevUsers) => [...prevUsers, newUser]);
    } catch (error) {
      console.error(error);
    }
  };

  const handleUpdateUser = async (user: IUser) => {
    try {
      await axios.put(`/api/auth/${user.id}`, { user });
      getUsers();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Container maxWidth={settings.themeStretch ? false : 'xl'}>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          mb: 5,
        }}
      >
        <Typography variant="h4">{t('roleManagement.title')}</Typography>
        <Button
          variant="contained"
          startIcon={<Iconify icon="mingcute:add-line" />}
          onClick={() => setOpen(true)}
        >
          {t('roleManagement.newUser')}
        </Button>
      </Box>

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="role management table">
          <TableHead>
            <TableRow>
              <TableCell>{t('roleManagement.table.name')}</TableCell>
              <TableCell>{t('roleManagement.table.email')}</TableCell>
              <TableCell>{t('roleManagement.table.phone_number')}</TableCell>
              <TableCell>{t('roleManagement.table.address')}</TableCell>
              <TableCell>{t('roleManagement.table.membership')}</TableCell>
              <TableCell>{t('roleManagement.table.expiration_date')}</TableCell>
              <TableCell>{t('roleManagement.table.currentRole')}</TableCell>
              <TableCell align="center">{t('roleManagement.table.actions')}</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {usersList.map((user) => (
              <TableRow key={user.id}>
                <TableCell component="th" scope="row" sx={{ minWidth: 200 }}>
                  {user.name}
                </TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.phone_number}</TableCell>
                <TableCell>{user.address}</TableCell>
                <TableCell>{user.membership}</TableCell>
                <TableCell>{user.expiration_date}</TableCell>
                <TableCell sx={{ textTransform: 'capitalize' }}>
                  {user.currentRole
                    ? t(`roleManagement.roles.${user.currentRole.toLowerCase()}`)
                    : ''}
                </TableCell>
                <TableCell align="center">
                  <Tooltip title="Edit" placement="top">
                    <IconButton onClick={() => handleEditUser(user)}>
                      <Iconify icon="solar:pen-bold" />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Delete" placement="top">
                    <IconButton onClick={() => handleDeleteUser(user.id)}>
                      <Iconify icon="solar:trash-bin-trash-bold" />
                    </IconButton>
                  </Tooltip>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={total}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
      <UserNewEditForm
        open={open}
        onClose={() => {
          setOpen(false);
          setCurrentUser(null);
        }}
        onCreate={handleCreateUser}
        onEdit={handleUpdateUser}
        currentUser={currentUser}
      />
    </Container>
  );
}
