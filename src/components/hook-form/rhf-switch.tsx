import { useFormContext, Controller } from 'react-hook-form';
import { Switch, FormControlLabel, FormControlLabelProps } from '@mui/material';

type IProps = Omit<FormControlLabelProps, 'control'>;

interface Props extends IProps {
  name: string;
}

export default function RHFSwitch({ name, ...other }: Props) {
  const { control, formState } = useFormContext();

  return (
    <>
      <FormControlLabel
        control={
          < Controller
            name={name}
            control={control}
            render={({ field }) => <Switch {...field} checked={field.value} />}
          />
        }
        {...other}
      />
      {formState.errors[name] && formState.errors[name]?.message}
    </>
  );
}
