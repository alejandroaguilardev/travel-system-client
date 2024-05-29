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
    folder: string | null;
    field: string;
    handleFolder: (folder: string) => void;
    handleQuantity: (quantity: number) => void;
    textField?: TextFieldProps;
    newPerson?: boolean;
}

export const SearchFolder = ({
    folder,
    field,
    handleFolder,
    handleQuantity,
    textField = {
        label: "Indicar folder",
        placeholder: "Buscar y seleccionar un folder...",
    },
    newPerson = true,
    ...rest
}: Props) => {

    return (
        <>
            <AutocompleteServer<string >
                {...rest}
                collection='folders'
                formatOptions={(rows: Folder[]) => rows.map((r) => r.name)}
                sorting={[{ orderBy: "name", orderType: OrderValue.ASC }]}
                globalFilterProperties={globalFilterProperties}
                defaultValue={folder}
                callback={(value: any) => {
                    console.log(value)
                    const name: any = typeof value === "string" ? value : value?.name;
                    const quantity: any = typeof value === "string" ? 300 : value?.quantity;
                    handleFolder(name);
                    console.log(quantity)
                    handleQuantity(quantity)
                }}
                getOptionLabel={(option) => {
                    if (typeof option === "string") return option;
                    return option.name
                }}
                textField={textField}
                freeText
            />
            <ErrorMessage name={field} />
        </>
    )
}