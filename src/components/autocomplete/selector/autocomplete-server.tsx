import { ReactNode } from "react";
import { TextFieldProps, Autocomplete, ListItem, TextField, AutocompleteRenderGetTagProps, Popper, Paper, Typography, Box } from '@mui/material';
import { Collections } from '../../../modules/shared/domain/collections';
import { useAutocompleteServer } from "./use-autocomplete-server";
import { Criteria } from '../../../modules/shared/domain/criteria/criteria';
import { PopperComponentAutocomplete } from "../common/popper-component";

interface Props<T> extends Partial<Criteria> {
    collection: Collections;
    defaultValue?: T | T[] | null;
    getOptionLabel?: (option: T | any) => string;
    callback: (value: T | T[] | null) => void;
    formatOptions?: (rows: any) => T[];
    textField?: TextFieldProps;
    multiple?: boolean;
    sizeComponent?: "small" | "medium";
    noOptionsText?: ReactNode;
    renderOption?: (props: React.HTMLAttributes<HTMLLIElement>, option: T) => React.ReactNode;
    groupBy?: (option: T) => string;
    renderTags?: (value: T[], getTagProps: AutocompleteRenderGetTagProps,) => React.ReactNode; freeText?: boolean;
    disabled?: boolean;
}

export function AutocompleteServer<T>({
    collection,
    globalFilterProperties,
    filters,
    globalFilter,
    sorting,
    start,
    size = 10,
    selectProperties,
    textField,
    multiple = false,
    defaultValue = multiple ? [] : null,
    sizeComponent,
    noOptionsText = "No hay elementos en la búsqueda",
    getOptionLabel,
    formatOptions,
    callback,
    renderOption,
    renderTags,
    groupBy,
    freeText = false,
    disabled = false,
    ...rest
}: Props<T>) {
    const { options, option, countTotal, handleInput, handleChange } = useAutocompleteServer<T>({
        collection,
        globalFilterProperties,
        filters,
        globalFilter,
        sorting,
        start,
        size,
        selectProperties,
        defaultValue,
        callback,
        formatOptions,
    });

    return (
        <Autocomplete
            freeSolo={freeText}
            options={options}
            fullWidth
            value={defaultValue ?? option}
            renderOption={(props, optionRender) => renderOption ? renderOption(props, optionRender) : (
                <ListItem {...props} key={JSON.stringify(optionRender)} >
                    {getOptionLabel ? getOptionLabel(optionRender) : undefined}
                </ListItem>)
            }
            getOptionLabel={getOptionLabel}
            onChange={(e, value: any) => handleChange(value)}
            groupBy={groupBy}
            renderInput={
                (params) => <TextField
                    {...params}
                    onChange={({ target }) => handleInput(target.value)}
                    onBlur={({ target }) => {
                        if (freeText) callback(target.value as T)
                    }}
                    {...textField}
                    disabled={disabled}
                    InputProps={{
                        ...params.InputProps,
                        autoComplete: "off"
                    }}
                    autoComplete="off"
                />
            }
            disabled={disabled}
            multiple={multiple}
            size={sizeComponent}
            noOptionsText={noOptionsText}
            PopperComponent={(props: any) => <PopperComponentAutocomplete countTotal={countTotal} size={size} optionsLength={options.length} props={props} />}
            isOptionEqualToValue={(optionOld: any, optionCurrent: any) => {
                if (typeof optionCurrent === "string") return optionOld === optionCurrent;
                if (typeof optionCurrent === "object") return optionOld?.id === optionCurrent?.id;
                return optionOld === defaultValue;
            }}
            {...rest}


        />
    )
}
