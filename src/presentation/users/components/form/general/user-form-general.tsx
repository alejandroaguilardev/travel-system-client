import { Divider, InputAdornment, MenuItem, Stack } from '@mui/material';
import { Role } from '../../../../../modules/roles/domain/role';
import { OrderValue } from '../../../../../modules/shared/domain/criteria/sorting';
import { capitalize } from '../../../../../modules/shared/domain/helpers/capitalize';
import RHFTextField from '../../../../../components/hook-form/rhf-text-field';
import { AutocompleteServer } from '../../../../../components/autocomplete/selector/autocomplete-server';
import { useUserFormGeneral } from './use-user-form-general';
import { PROFILE_DOCUMENT } from '../../../../../modules/users/domain/profile/profile-document';
import RHFSwitch from '../../../../../components/hook-form/rhf-switch';
import { PhoneNumber } from '../../../../../components/phone-number/phone-number';
import Iconify from '../../../../../components/iconify';

export const UserFormGeneral = () => {
    const { roles, phone, phoneError, isUser, handleRoles, handlePhone } = useUserFormGeneral();

    return (
        <Stack spacing={1} marginBottom={2}>
            <Stack direction={{ xs: "column", md: "row" }} spacing={1} marginBottom={1}>
                <RHFTextField
                    name='profile.document'
                    fullWidth
                    label="Documento (*)"
                    variant="outlined"
                    inputAdornment
                    select
                >
                    {PROFILE_DOCUMENT.map((document) => (
                        <MenuItem key={document} value={document}>
                            {document}
                        </MenuItem>
                    ))}
                </RHFTextField>
                <RHFTextField
                    name='profile.documentNumber'
                    fullWidth
                    label="Número de documento (*)"
                    variant="outlined"
                    inputAdornment
                />
            </Stack>
            <Divider sx={{ mb: 2 }} />
            <Stack direction={{ xs: "column", md: "row" }} spacing={1} marginBottom={1}>
                <RHFTextField
                    name='profile.name'
                    fullWidth
                    label="Primer Nombre (*)"
                    variant="outlined"
                    inputAdornment
                />
                <RHFTextField
                    name='profile.secondName'
                    fullWidth
                    label="Segundo Nombre"
                    variant="outlined"
                    inputAdornment
                />
            </Stack>
            <Stack direction={{ xs: "column", md: "row" }} spacing={1} marginBottom={1}>
                <RHFTextField
                    name='profile.lastName'
                    fullWidth
                    label="Primer Apellido (*)"
                    variant="outlined"
                    inputAdornment
                />
                <RHFTextField
                    name='profile.secondLastName'
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
                <PhoneNumber
                    valueDefault={phone}
                    callback={handlePhone}
                    label="Teléfono (*)"
                    variant="outlined"
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <Iconify icon="mdi:text" />
                            </InputAdornment>
                        )
                    }}
                    errorMessage={phoneError}
                />
                <RHFTextField
                    name='profile.gender'
                    fullWidth
                    label="Sexo (*)"
                    variant="outlined"
                    inputAdornment
                    select
                >
                    <MenuItem value="male">Hombre</MenuItem>
                    <MenuItem value="female">Mujer</MenuItem>
                </RHFTextField>
            </Stack>
            {
                isUser &&
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
                    <RHFSwitch
                        name="isAdvisor"
                        label="¿Este usuario será un asesor?"
                        sx={{
                            width: "100%"
                        }}
                    />
                </Stack>
            }
        </Stack >
    )
}
