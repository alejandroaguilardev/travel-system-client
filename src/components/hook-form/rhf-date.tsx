
import { Controller, useFormContext } from 'react-hook-form';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker, DatePickerProps } from '@mui/x-date-pickers/DatePicker';

interface FormInputDateProps extends DatePickerProps<Date> {
    name: string;
}

export const RHFDate: React.FC<FormInputDateProps> = ({
    name,
    label,
    value,
}) => {
    const { control } = useFormContext();

    return (
        <Controller
            name={name}
            control={control}
            render={({ field }) => (
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                        label={label}
                        inputRef={field.ref}
                        onChange={(date) => {
                            field.onChange(date);
                        }}
                        sx={{
                            width: "100%"
                        }}
                        format='DD/MM/YYYY'
                        value={value}

                    />
                </LocalizationProvider>
            )}
        />
    );
};