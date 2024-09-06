import { Box, Button, TextFieldProps, Typography } from '@mui/material';
import { User } from '../../../../modules/users/domain/user';
import { AutocompleteServer } from '../../../../components/autocomplete/selector/autocomplete-server';
import { OrderValue } from '../../../../modules/shared/domain/criteria/sorting';
import { AuthPermission, AuthGroup } from '../../../../modules/auth/domain/auth-permission';
import { capitalize } from '../../../../modules/shared/domain/helpers/capitalize';
import { PermissionGuard } from '../../../permission/components/guard/permission-guard';
import { ErrorMessage } from '../../../../components/hook-form/error-message';
import { useClientDialogContext } from './client-dialog-context';
import { Criteria } from '../../../../modules/shared/domain/criteria/criteria';
import { ReactNode } from 'react';


const globalFilterProperties = [
    { field: "profile.document", value: "string" },
    { field: "profile.documentNumber", value: "string" },
    { field: "profile.name", value: "string" },
    { field: "profile.secondName", value: "string" },
    { field: "profile.lastName", value: "string" },
    { field: "profile.secondLasName", value: "string" },
    { field: "profile.email", value: "string" },
];

const getOptionLabel = (option: User) => {
    const names = `${capitalize(option?.profile?.name)} ${capitalize(option?.profile?.secondLastName)} ${capitalize(option?.profile?.lastName)} ${capitalize(option?.profile?.secondLastName)}`;

    const document = option?.profile?.document ? option?.profile?.document + ": " : "";
    const documentNumber = option?.profile?.documentNumber ? option?.profile?.documentNumber : "";

    return `${document} ${documentNumber} ${names}`

}
type Props = Partial<Criteria> & {
    client: User | null;
    field: string;
    handleClient: (user: User | null) => void;
    textField?: TextFieldProps;
    newPerson: boolean;
    labelNewPerson: string;
    noOptionsText?: ReactNode;
}

export const SearchClient = ({
    client,
    field,
    handleClient,
    textField = {
        label: "Buscar y Seleccionar cliente(*)",
        placeholder: "Buscar y seleccionar un cliente...",
    },
    newPerson = false,
    labelNewPerson,
    noOptionsText,
    ...rest
}: Props) => {
    const { onTrue } = useClientDialogContext();

    return (
        <>
            <AutocompleteServer<User>
                {...rest}
                collection='users'
                sorting={[{ orderBy: "name", orderType: OrderValue.ASC }]}
                globalFilterProperties={globalFilterProperties}
                defaultValue={client}
                callback={(value) => handleClient(value as User | null)}
                getOptionLabel={getOptionLabel}
                textField={textField}
                noOptionsText={noOptionsText ??
                    <Box width="100%" >
                        <Typography width="100%" textAlign="center" mb={1}>No se ha localizado a la persona que está buscando. ¿Desea crear un cliente ahora? </Typography>
                        {newPerson && <PermissionGuard group={AuthGroup.CLIENT} permission={AuthPermission.CREATE}>
                            <Button variant="outlined" fullWidth onClick={onTrue}>
                                Crear nuevo cliente
                            </Button>
                        </PermissionGuard>
                        }
                    </Box>
                }

            />
            {newPerson && <PermissionGuard group={AuthGroup.CLIENT} permission={AuthPermission.CREATE}>
                <Button variant="outlined" fullWidth onClick={onTrue}>
                    Crear nuevo cliente
                </Button>
            </PermissionGuard>
            }
            <ErrorMessage name={field} />
        </>
    )
}
