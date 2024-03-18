import { TextFieldProps } from '@mui/material';
import { AutocompleteServer } from '../../../../components/autocomplete/selector/autocomplete-server';
import { OrderValue } from '../../../../modules/shared/domain/criteria/sorting';
import { ErrorMessage } from '../../../../components/hook-form/error-message';
import { Criteria } from '../../../../modules/shared/domain/criteria/criteria';
import { Folder } from '../../../../modules/folders/domain/folder';

const globalFilterProperties = [
    { field: "name", value: "string" },
];

type Props = Partial<Criteria> & {
    folder: Folder | null;
    field: string;
    handleFolder: (folder: Folder | null) => void;
    textField?: TextFieldProps;
    newPerson?: boolean;
}

export const SearchFolder = ({
    folder,
    field,
    handleFolder,
    textField = {
        label: "Seleccionar folder",
        placeholder: "Buscar y seleccionar un folder...",
    },
    newPerson = true,
    ...rest
}: Props) => {

    return (
        <>
            <AutocompleteServer<Folder>
                {...rest}
                collection='folders'
                sorting={[{ orderBy: "name", orderType: OrderValue.ASC }]}
                globalFilterProperties={globalFilterProperties}
                defaultValue={folder}
                callback={(value) => handleFolder(value as Folder | null)}
                getOptionLabel={(option) => option.name}
                textField={textField}
            />
            <ErrorMessage name={field} />
        </>
    )
}