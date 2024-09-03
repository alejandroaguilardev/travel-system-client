import { useCallback, useEffect, useMemo, useState } from 'react';
import { Collections } from '../../../modules/shared/domain/collections';
import { useSwrQueryPagination } from '../../../hooks/use-swr-query-pagination';
import { conditionPersistence } from '../../material-table/helpers/condition-persistence';
import { criteriaFactory } from '../../../modules/shared/domain/criteria/criteria.factory';
import { Criteria } from '../../../modules/shared/domain/criteria/criteria';


interface Props<T> extends Partial<Criteria> {
    collection: Collections;
    defaultValue: T | T[] | null;
    callback: (value: T | T[] | null) => void;
    formatOptions?: (rows: any) => T[];
}

export const useAutocompleteServer = <T>({ defaultValue, collection, globalFilterProperties, filters, globalFilter: globalFilterDefault = "", sorting, start, size, selectProperties, formatOptions, callback }: Props<T>) => {

    const [options, setOptions] = useState<T[]>([]);
    const [countTotal, setCountTotal] = useState(0);
    const [option, setOption] = useState<T | T[] | null>(defaultValue);
    const [globalFilter, setGlobalFilter] = useState<string>(globalFilterDefault);


    const criteria = useMemo(() => criteriaFactory({
        filters,
        sorting,
        start,
        size,
        globalFilter,
        globalFilterProperties,
        selectProperties,
    }),
        [filters, globalFilter, sorting, start, size, globalFilterProperties, selectProperties])


    const result = useSwrQueryPagination<T>({ key: collection, criteria, search: conditionPersistence(collection) })


    const handleInput = useCallback((value: string) => {
        setGlobalFilter(value.trim());
    }, [setGlobalFilter]);

    const handleChange = useCallback((value: T | readonly T[] | null) => {
        setOption(value as T[] | T | null);
        if (callback) {
            setGlobalFilter("");
            callback(value as T[] | T | null);
        }
    }, [callback])

    useEffect(() => {
        setOptions(formatOptions ? formatOptions(result.rows) : result.rows as T[]);
        setCountTotal(result.count);
    }, [result, formatOptions])

    return {
        input: globalFilter,
        option,
        options,
        countTotal,
        handleChange,
        handleInput,
    };
};
