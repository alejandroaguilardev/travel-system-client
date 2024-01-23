import { Controller, useFormContext } from 'react-hook-form';
import { Autocomplete, Chip, SxProps, TextField } from '@mui/material';
import { capitalize } from '../../modules/shared/domain/helpers/capitalize';
import { IconKeys } from '../icon-wrapper';

type Props = {
    name: string;
    label?: string;
    options: string[],
    readOnly?: boolean,
    filterSelectedOptions?: boolean,
    disabled?: boolean,
    sx?: SxProps,
    multiple?: boolean;
    required?: boolean;
    callback?: (value?: string) => void;
    icon?: IconKeys;
    position?: 'startAdornment' | 'endAdornment';
};


export default function RHFTags({ sx, multiple = true, required, disabled = false, name, filterSelectedOptions, label = 'Etiquetas', options = [], readOnly, callback }: Props) {

    const { control, setValue, watch } = useFormContext();
    const currentValue = watch(name);


    return (
        <Controller
            name={name}
            control={control}
            render={({ field }) => (
                <Autocomplete
                    {...field}
                    sx={sx}
                    disabled={disabled}
                    multiple={multiple}
                    filterSelectedOptions={filterSelectedOptions}
                    readOnly={readOnly}
                    freeSolo
                    fullWidth
                    onChange={(event, newValue) => {
                        if (callback) callback(newValue)
                        field.onChange(newValue)
                    }}
                    options={options}
                    clearOnBlur
                    renderTags={(value, getTagProps) =>
                        (value).map((option, index) => (
                            option &&
                            <Chip
                                {...getTagProps({ index })}
                                key={index}
                                size="small"
                                label={capitalize(option)}
                            />
                        ))
                    }
                    renderInput={(params) =>
                        <TextField
                            {...params} label={label} required={required}
                            onBlur={({ target }) => {
                                if (multiple) {
                                    setValue(name, target.value ? [...currentValue, target.value] : [...currentValue]);
                                } else {
                                    setValue(name, capitalize(target.value));
                                }
                                if (callback) callback(target.value)
                            }}
                        />}
                />
            )}
        />
    )
}
