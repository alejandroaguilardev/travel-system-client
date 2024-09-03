import { TextFieldProps, Autocomplete, ListItem, TextField } from "@mui/material";
import { useAutocompleteClient } from "./use-autocomplete-client";
import { PopperComponentAutocomplete } from "../common/popper-component";

interface Props<T> {
    items: T[],
    defaultValue: T | null;
    propertiesFilter: (keyof T)[],
    maxFilter?: number;
    textField?: TextFieldProps;
    freeText?: boolean;
    getOptionLabel: (option: T | string | null) => string;
    callback: (value: T | null) => void;
    renderOption?: (props: React.HTMLAttributes<HTMLLIElement>, option: T) => React.ReactNode;

}

export function AutocompleteSelectorClient<T>({ items, propertiesFilter, defaultValue, maxFilter = 100, textField, getOptionLabel, callback, renderOption, freeText = false }: Props<T>) {
    const { options, option, input, handleInput, handleChange } = useAutocompleteClient<T>({
        items: items as T[],
        properties: propertiesFilter,
        defaultValue,
        maxFilter,
        callback,
    });

    return (
        <Autocomplete
            freeSolo={freeText}
            options={options}
            fullWidth
            value={option}
            renderOption={(props, optionRender) => renderOption ? renderOption(props, optionRender) : (
                <ListItem {...props} key={JSON.stringify(optionRender)} >
                    {getOptionLabel ? getOptionLabel(optionRender) : undefined}
                </ListItem>)
            }
            getOptionLabel={getOptionLabel}
            onChange={(e, value: any) => handleChange(value)}
            PopperComponent={(props: any) => <PopperComponentAutocomplete countTotal={items.length} size={items.length} optionsLength={options.length} props={props} />}
            renderInput={
                (params) => <TextField {...params} value={input} onChange={handleInput} {...textField} />
            }
        />
    )
}
