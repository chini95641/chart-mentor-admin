import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import { useMemo, useEffect } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import MenuItem from '@mui/material/MenuItem';
import LoadingButton from '@mui/lab/LoadingButton';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';

import { useTranslate } from 'src/locales';

import FormProvider, { RHFSelect, RHFTextField, RHFDatePicker } from 'src/components/hook-form';

import { IUser } from '../../types/user_type';


type Props = {
  open: boolean;
  onClose: () => void;
  onCreate: (user: IUser) => void;
  onEdit: (user: IUser) => void;
  currentUser: IUser | null;
};

export default function UserNewEditForm({ open, onClose, onCreate, onEdit, currentUser }: Props) {
  const { t } = useTranslate();

  const NewUserSchema = Yup.object().shape({
    first_name: Yup.string().required(t('userNewEditForm.errors.firstName.required')),
    last_name: Yup.string().required(t('userNewEditForm.errors.lastName.required')),
    email: Yup.string().required(t('userNewEditForm.errors.email.required')).email(t('userNewEditForm.errors.email.invalid')),
    phone_number: Yup.string().required(t('userNewEditForm.errors.phoneNumber.required')),
    address: Yup.string().required(t('userNewEditForm.errors.address.required')),
    role: Yup.string().required(t('userNewEditForm.errors.role.required')),
    membership: Yup.string<"free" | "premium">().required(t('userNewEditForm.errors.membership.required')),
    expiration_date: Yup.date().nullable(),
  });

  const defaultValues = useMemo(
    () => ({
        first_name: currentUser?.first_name || '',
        last_name: currentUser?.last_name || '',
        email: currentUser?.email || '',
        phone_number: currentUser?.phone_number || '',
        address: currentUser?.address || '',
        role: currentUser?.role || '',
        membership: currentUser?.membership || 'free' as const,
        expiration_date: currentUser?.expiration_date || null,
    }),
    [currentUser]
  );

  const methods = useForm<IUser>({
    resolver: yupResolver(NewUserSchema),
    defaultValues,
  });

  const {
    reset,
    watch,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  useEffect(() => {
    if (currentUser) {
      reset(defaultValues);
    }
  }, [currentUser, defaultValues, reset]);

  const values = watch();

  const onSubmit = handleSubmit(async (data) => {
    try {
      if (currentUser) {
        onEdit({ ...data, id: currentUser.id });
      } else {
        onCreate(data);
      }
      reset();
      onClose();
    } catch (error) {
      console.error(error);
    }
  });

  return (
    <Dialog
      fullWidth
      maxWidth={false}
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: { maxWidth: 720 },
      }}
    >
      <FormProvider methods={methods} onSubmit={onSubmit}>
        <DialogTitle>{currentUser ? t('userNewEditForm.titleEdit') : t('userNewEditForm.titleCreate')}</DialogTitle>

        <DialogContent>
          <Box
            rowGap={3}
            columnGap={2}
            display="grid"
            gridTemplateColumns={{
              xs: 'repeat(1, 1fr)',
              sm: 'repeat(2, 1fr)',
            }}
          >
            <RHFTextField name="first_name" label={t('userNewEditForm.labels.firstName')} />
            <RHFTextField name="last_name" label={t('userNewEditForm.labels.lastName')} />
            <RHFTextField name="email" label={t('userNewEditForm.labels.email')} />
            <RHFTextField name="phone_number" label={t('userNewEditForm.labels.phoneNumber')} />
            <RHFTextField name="address" label={t('userNewEditForm.labels.address')} />
            
            <RHFSelect name="role" label={t('userNewEditForm.labels.role')}>
              <MenuItem value="admin">{t('userNewEditForm.roles.admin')}</MenuItem>
              <MenuItem value="staff">{t('userNewEditForm.roles.staff')}</MenuItem>
              <MenuItem value="none">{t('userNewEditForm.roles.none')}</MenuItem>
            </RHFSelect>
            
            <RHFSelect name="membership" label={t('userNewEditForm.labels.membership')}>
              <MenuItem value="free">{t('userNewEditForm.memberships.free')}</MenuItem>
              <MenuItem value="premium">{t('userNewEditForm.memberships.premium')}</MenuItem>
            </RHFSelect>

            {values.membership === 'premium' && (
              <RHFDatePicker name="expiration_date" label={t('userNewEditForm.labels.expirationDate')} />
            )}
          </Box>
        </DialogContent>

        <DialogActions>
          <Button variant="outlined" onClick={onClose}>
            {t('userNewEditForm.buttons.cancel')}
          </Button>

          <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
            {currentUser ? t('userNewEditForm.buttons.update') : t('userNewEditForm.buttons.create')}
          </LoadingButton>
        </DialogActions>
      </FormProvider>
    </Dialog>
  );
} 