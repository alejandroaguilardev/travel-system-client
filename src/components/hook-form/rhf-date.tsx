
import { Controller, useFormContext } from 'react-hook-form';
import { DatePicker, DatePickerProps } from '@mui/x-date-pickers/DatePicker';
import { Box } from '@mui/material';
import { ErrorMessage } from './error-message';

interface FormInputDateProps extends DatePickerProps<Date> {
    name: string;
}

export const RHFDate: React.FC<FormInputDateProps> = ({
    name,
    label,
    value,
    ...rest
}) => {
    const { control } = useFormContext();

    return (
        <Controller
            name={name}
            control={control}
            render={({ field }) => (
                <Box width="100%" >
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
                        {...rest}

                    />
                    <ErrorMessage name={name} />
                </Box >
            )}
        />
    );
};