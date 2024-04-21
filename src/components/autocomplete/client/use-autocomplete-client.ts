'use client';

import { useEffect, useState } from 'react';

type Property<T> = keyof T;

interface Props<T> {
    items: T[];
    defaultValue: T | null;
    properties: Property<T>[];
    maxFilter?: number;
    multiple?: boolean;
    callback?: (value: T | null) => void;
}

export const useAutocompleteClient = <T>({ items, defaultValue, properties, maxFilter = 10, callback }: Props<T>) => {
    const [input, setInput] = useState('');
    const [option, setOption] = useState<T | null>(defaultValue);
    const [options, setOptions] = useState<T[]>([]);

    useEffect(() => {
        setOptions(items?.slice(0, maxFilter))
    }, [items, maxFilter])

    useEffect(() => {
        setOption(defaultValue)
    }, [items, defaultValue])

    const handleInput = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = target;
        setInput(value);
        if (value?.length < 1) return setOptions(items.slice(0, maxFilter));

        const filter = items.filter((item) =>
            properties.some((property) =>
                String(item[property]).toLowerCase().startsWith(value.toLowerCase())
            )).slice(0, maxFilter);

        return setOptions(filter);
    };

    const handleChange = (value: T | null) => {
        setOption(value as T | null);
        if (callback) {
            callback(value as T | null);
        }
    }


    return {
        input,
        option,
        options,
        handleChange,
        handleInput,
    };
};
