import { useFormContext, Controller } from 'react-hook-form';
import TextField, { TextFieldProps } from '@mui/material/TextField';
import { InputAdornment } from '@mui/material';
import Iconify from '../iconify';


type Props = TextFieldProps & {
  name: string;
  icon?: string;
  inputAdornment?: boolean;
};

export default function RHFTextField({ name, helperText, inputAdornment = false, icon = "mdi:text", type, ...other }: Props) {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <TextField
          {...field}
          fullWidth
          type={type}
          value={type === 'number' && field.value === 0 ? '' : field.value}
          onChange={(event) => {
            if (type === 'number') {
              field.onChange(Number(event.target.value));
            } else {
              field.onChange(event.target.value);
            }
          }}
          error={!!error}
          helperText={error ? error?.message : helperText}
          InputProps={{
            ...inputAdornment
              ? {
                startAdornment: (
                  <InputAdornment position="start">
                    <Iconify icon={icon} />
                  </InputAdornment>
                )
              } : {},
          }}
          {...other}
        />
      )}
    />
  );
}
