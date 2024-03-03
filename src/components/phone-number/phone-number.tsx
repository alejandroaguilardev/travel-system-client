'use client'

import { useState, useEffect, ChangeEvent } from 'react';
import { Box, MenuItem, Select, TextField, TextFieldProps } from '@mui/material';
import { countries as totalCountries } from '../../modules/shared/domain/helpers/countries';

export const countryURL: string = '/assets/countries/';
export const defaultCountry = {
    name_es: 'Perú',
    dial_code: '+51',
    code_2: 'PE',
}

const defaultCode: string = '+51 ';


const countries = totalCountries.map(({ name_es, dial_code, code_2 }) => ({ name_es, dial_code, code_2 }))

interface Country {
    code_2: string;
    name_es: string;
    dial_code: string;
}

type Props = TextFieldProps & {
    callback: (value: string) => void,
    valueDefault?: string,
    size?: 'small' | 'medium',
    autoFocus?: boolean,
    focused?: boolean,
}

export function PhoneNumber({ valueDefault, label, callback, size = "medium", autoFocus = false, focused = false, ...rest }: Props) {

    const [selectedCountry, setSelectedCountry] = useState<Country | null>(defaultCountry);

    const [inputValue, setInputValue] = useState<string>(valueDefault || defaultCode);

    const handleSelect = (selected: Country | null) => {
        setSelectedCountry(selected);
        if (selected) setInputValue(`${selected.dial_code} `);
    };

    const handleChangeInput = ({ target }: ChangeEvent<HTMLInputElement>) => {
        const { value } = target;
        const sanitizedValue = value.replace(/[^0-9+\s]/g, '');
        setInputValue(sanitizedValue);
        onValue(sanitizedValue);
    };

    const onValue = (value: string) => {
        const sanitize = value.trim().replace('+', '').replaceAll(' ', '');
        callback(sanitize);
    };

    const getExtPhone = (input: string) => {
        const threeValue = countries.find((country) => country.dial_code === input.substring(0, 4));
        const twoValue = countries.find((country) => country.dial_code === input.substring(0, 3));
        return { threeValue, twoValue };
    };

    useEffect(() => {
        const flag = getExtPhone(inputValue);
        if (flag.threeValue && inputValue.length === 4) {
            setSelectedCountry(flag.threeValue);
            return;
        }
        if (flag.twoValue && inputValue.length === 3) {
            setSelectedCountry(flag.twoValue);
            return;
        }

        if (!flag.threeValue && !flag.twoValue && inputValue.length > 4) {
            setSelectedCountry(defaultCountry);
            setInputValue(defaultCode);
        }
    }, [inputValue]);

    useEffect(() => {
        const valueExt = `+${valueDefault}`;
        const flag = getExtPhone(valueExt);
        if (flag.threeValue) {
            setInputValue(valueExt);
            setSelectedCountry(flag.threeValue);
            return;
        }
        if (flag.twoValue) {
            setInputValue(valueExt);
            setSelectedCountry(flag.twoValue);
        }
    }, [valueDefault]);

    return (
        <Box display="flex" gap={1} width="100%">
            <Select
                onChange={(event) => {
                    const newValue = countries.find((country) => country.code_2 === event.target.value);
                    if (newValue) {
                        handleSelect(newValue);
                    }
                }}
                value={selectedCountry?.code_2 || ''}
                renderValue={(code_2) => <img src={`${countryURL}${code_2.toLowerCase()}.svg`} alt={code_2} width={30} />}
                sx={{ minWidth: 80, maxHeight: 200 }}
                size={size}
                MenuProps={{
                    PaperProps: {
                        style: { maxHeight: 200 }
                    }
                }}
            >
                {countries.map((country) => (
                    <MenuItem value={country.code_2} key={country.code_2}>
                        <Box sx={{ display: 'flex', p: 0.5, fontSize: 12, alignItems: 'center', gap: 1, boxShadow: 1 }}>
                            <img src={`${countryURL}${country.code_2.toLowerCase()}.svg`} alt={country.code_2} width={30} />
                            <Box sx={{ width: 240, whiteSpace: 'nowrap' }}>
                                {country.name_es} {country.dial_code}
                            </Box>
                        </Box>
                    </MenuItem>
                ))}
            </Select>

            <TextField
                {...rest}
                size={size}
                type="tel"
                fullWidth
                onChange={handleChangeInput}
                variant="outlined"
                label={label}
                value={inputValue}
                inputProps={{
                    pattern: '^[0-9+\\s]*$',
                    title: 'Solo números permitidos'
                }}
                autoFocus={autoFocus}
                focused={focused}
            />
        </Box>
    );
}
