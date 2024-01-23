import { Stack } from '@mui/material';
import { Role } from '../../../../../modules/roles/domain/role';
import { OrderValue } from '../../../../../modules/shared/domain/criteria/sorting';
import { capitalize } from '../../../../../modules/shared/domain/helpers/capitalize';
import RHFTextField from '../../../../../components/hook-form/rhf-text-field';
import { AutocompleteServer } from '../../../../../components/autocomplete/selector/autocomplete-server';
import { useUserFormGeneral } from './use-user-form-general';

export const UserFormGeneral = () => {
    const { roles, handleRoles } = useUserFormGeneral()

    return (
        <Stack spacing={1} marginBottom={2}>
            <Stack direction={{ xs: "column", md: "row" }} spacing={1} marginBottom={1}>
                <RHFTextField
                    name='name'
                    fullWidth
                    label="Primer Nombre (*)"
                    variant="outlined"
                    inputAdornment
                />
                <RHFTextField
                    name='secondName'
                    fullWidth
                    label="Segundo Nombre"
                    variant="outlined"
                    inputAdornment
                />
            </Stack>
            <Stack direction={{ xs: "column", md: "row" }} spacing={1} marginBottom={1}>
                <RHFTextField
                    name='lastName'
                    fullWidth
                    label="Primer Apellido (*)"
                    variant="outlined"
                    inputAdornment
                />
                <RHFTextField
                    name='secondLastName'
                    fullWidth
                    label="Segundo Apellido"
                    variant="outlined"
                    inputAdornment
                />
            </Stack>
            <Stack direction={{ xs: "column", md: "row" }} spacing={1} marginBottom={1}>
                <RHFTextField
                    name='email'
                    fullWidth
                    label="Correo Electrónico (*)"
                    variant="outlined"
                    inputAdornment
                />
            </Stack>
            <Stack direction={{ xs: "column", md: "row" }} spacing={1} marginBottom={1}>

                <AutocompleteServer<Role>
                    collection='roles'
                    sorting={[{ orderBy: "name", orderType: OrderValue.ASC }]}
                    globalFilterProperties={[{ field: "name", value: "string" }]}
                    defaultValue={roles}
                    callback={handleRoles}
                    getOptionLabel={(option: Role) => capitalize(option.name)}
                    textField={{
                        label: "Seleccionar roles"
                    }}
                    multiple
                />
            </Stack>
        </Stack >
    )
}
