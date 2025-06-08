import { Controller, useFormContext } from 'react-hook-form';

import { DatePicker, DatePickerProps } from '@mui/x-date-pickers/DatePicker';

// ----------------------------------------------------------------------

type Props = DatePickerProps<Date> & {
  name: string;
};

export default function RHFDatePicker({ name, ...other }: Props) {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <DatePicker
          {...field}
          {...other}
          slotProps={{
            textField: {
              fullWidth: true,
              error: !!error,
              helperText: error?.message,
            },
          }}
        />
      )}
    />
  );
} 