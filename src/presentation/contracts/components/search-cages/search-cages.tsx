import { TextFieldProps } from '@mui/material';
import { AutocompleteServer } from '../../../../components/autocomplete/selector/autocomplete-server';
import { OrderValue } from '../../../../modules/shared/domain/criteria/sorting';
import { ErrorMessage } from '../../../../components/hook-form/error-message';
import { Criteria } from '../../../../modules/shared/domain/criteria/criteria';
import { capitalize } from '../../../../modules/shared/domain/helpers';
import { Cage } from '../../../../modules/cages/domain/cage';


const globalFilterProperties = [
    { field: "modelCage", value: "string" },
    { field: "dimensionsCage", value: "string" },
    { field: "typeCage", value: "string" },
];


type Props = Partial<Criteria> & {
    cage: Cage | null;
    field: string;
    handleValue: (cage: Cage | null) => void;
    textField?: TextFieldProps;
}

export const SearchCages = ({
    cage,
    field,
    handleValue,
    textField = {
        label: "Buscar y Seleccionar una jaula(*)",
        placeholder: "Buscar y seleccionar un jaula...",
    },
    ...rest
}: Props) => {

    return (
        <>
            <AutocompleteServer<Cage>
                {...rest}
                collection='cages'
                sorting={[{ orderBy: "name", orderType: OrderValue.ASC }]}
                globalFilterProperties={globalFilterProperties}
                defaultValue={cage}
                callback={(value) => handleValue(value as Cage | null)}
                getOptionLabel={(option: Cage) => option?.modelCage && option?.dimensionsCage && option?.typeCage ? `${option.modelCage} ${option.dimensionsCage} (${capitalize(option.typeCage)})` : ''}
                textField={textField}
            />
            <ErrorMessage name={field} />
        </>
    )
}
