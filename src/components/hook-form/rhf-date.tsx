
import { Controller, useFormContext } from 'react-hook-form';
import { DateTimePicker, DatePickerProps } from '@mui/x-date-pickers';
import { Box } from '@mui/material';
import { ErrorMessage } from './error-message';

interface FormInputDateProps extends DatePickerProps<Date> {
    name: string;
    format?: string;
}

export const RHFDate: React.FC<FormInputDateProps> = ({
    name,
    label,
    value,
    format = 'DD/MM/YYYY'
}) => {
    const { control } = useFormContext();

    return (
        <Controller
            name={name}
            control={control}
            render={({ field }) => (
                <Box width="100%" >
                    <DateTimePicker
                        label={label}
                        inputRef={field.ref}
                        onChange={(date) => {
                            field.onChange(date);
                        }}
                        sx={{
                            width: "100%"
                        }}

                        value={value}
                        format={format}
                    />
                    <ErrorMessage name={name} />
                </Box >
            )}
        />
    );
};