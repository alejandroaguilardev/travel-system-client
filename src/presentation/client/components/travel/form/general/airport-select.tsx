import { AutocompleteSelectorClient } from '../../../../../../components/autocomplete/client/autocomplete-selector-client';
import AIRPORTS from '../../../../../../../public/data/airports.json'
import { useFormContext } from 'react-hook-form';

type Airport = string;

type Props = {
    name: string;
    label: string;
}


export function AutocompleteAirportSelect({ name, label }: Props) {
    const { watch, setValue } = useFormContext();
    const value = watch(name);

    const handleChange = (value: string) => {
        setValue(name, value)
    }

    return (
        <AutocompleteSelectorClient<Airport>
            freeText
            items={AIRPORTS}
            defaultValue={value}
            callback={(value) => handleChange(value ?? "")}
            getOptionLabel={(value) => value ?? ""}
            propertiesFilter={[]}
            textField={{
                label: label,
                placeholder: label,
            }}

        />
    )
}
