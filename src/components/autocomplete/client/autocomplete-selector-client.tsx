import { TextFieldProps, Autocomplete, ListItem, TextField } from "@mui/material";
import { useAutocompleteClient } from "./use-autocomplete-client";

interface Props<T> {
    items: T[],
    defaultValue: T | null;
    propertiesFilter: (keyof T)[],
    maxFilter?: number;
    textField?: TextFieldProps;
    getOptionLabel: (option: T | null) => string;
    callback: (value: T | null) => void;
}

export function AutocompleteSelectorClient<T>({ items, propertiesFilter, defaultValue, maxFilter = 100, textField, getOptionLabel, callback }: Props<T>) {
    const { options, option, input, handleInput, handleChange } = useAutocompleteClient<T>({
        items: items as T[],
        properties: propertiesFilter,
        defaultValue,
        maxFilter,
        callback,
    });

    return (
        <Autocomplete
            options={options}
            fullWidth
            value={option}
            renderOption={(props, optionRender) => (<ListItem {...props} >
                {getOptionLabel(optionRender)}
            </ListItem>)
            }
            getOptionLabel={getOptionLabel}
            onChange={handleChange}
            renderInput={
                (params) => <TextField {...params} value={input} onChange={handleInput} {...textField} />
            }
        />
    )
}
