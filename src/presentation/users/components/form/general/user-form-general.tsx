import { Alert, Divider, InputAdornment, MenuItem, Stack } from '@mui/material';
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
import { useUbigeo } from '../../../../client/components/accompanied-form/steps/use-ubigeo';
import { AutocompleteSelectorClient } from '../../../../../components/autocomplete/client/autocomplete-selector-client';
import PROVINCES from '../../../../../../public/data/province.json'
import DISTRICTS from '../../../../../../public/data/district.json'

export const UserFormGeneral = () => {
    const { roles, phone, phoneError, isUser, isAdmin, handleRoles, handlePhone } = useUserFormGeneral();
    const {
        department,
        province,
        district,
        departments,
        provinces,
        districts,
        handleDepartment,
        handleProvince,
        handleProvinces,
        handleDistrict,
        handleDistricts
    } = useUbigeo("profile");

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
            <Stack direction={{ xs: "column", md: "row" }} spacing={2}>
                <AutocompleteSelectorClient
                    textField={{
                        label: "Departamento (*)"
                    }}
                    items={departments}
                    defaultValue={departments.find(_ => _.id === department) || null}
                    getOptionLabel={(d) => {
                        if (typeof d !== "string") return d?.name ?? "";
                        return "";
                    }}
                    callback={(value: any) => {
                        handleDepartment(value);
                        handleProvinces(value.id);
                        handleDistricts();
                    }}
                    propertiesFilter={["name"]}
                />

                <AutocompleteSelectorClient
                    textField={{
                        label: "Provincia (*)"
                    }}
                    items={provinces}
                    defaultValue={PROVINCES.find(_ => _.province_id === province) || null}
                    getOptionLabel={(d) => {
                        if (typeof d !== "string") return d?.name ?? "";
                        return "";
                    }}
                    callback={(value: any) => {
                        handleProvince(value);
                        handleDistricts(value.province_id);
                    }}
                    propertiesFilter={["name"]}
                />
                <AutocompleteSelectorClient
                    textField={{
                        label: "Distrito (*)"
                    }}
                    items={districts}
                    defaultValue={DISTRICTS.find(_ => _.district_id === district) || null}
                    getOptionLabel={(d) => {
                        if (typeof d !== "string") return d?.name ?? "";
                        return "";
                    }}
                    callback={(value: any) => handleDistrict(value)}
                    propertiesFilter={["name"]}
                />
            </Stack>
            <Stack direction={{ xs: "column", md: "row" }} spacing={1} marginBottom={1}>

                <RHFTextField
                    name="profile.direction"
                    label="Dirección (*)"
                    inputAdornment
                />
            </Stack>
            {
                isUser &&
                <>
                    <Stack direction={{ xs: "column", md: "row" }} spacing={1} marginBottom={1}>
                        {isAdmin ?
                            <Stack width="100%">
                                <Alert severity='info'>
                                    Este es un usuario administrador tiene todos los permisos
                                </Alert>
                            </Stack>
                            :
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
                        }
                        <Stack direction={{ xs: "column", md: "row" }} spacing={1} marginBottom={1} width="100%">
                            <RHFSwitch
                                name="isDoctor"
                                label="¿Este usuario será un veterinario?"
                                sx={{
                                    width: "100%"
                                }}
                            />
                        </Stack>
                    </Stack>
                    <Stack direction={{ xs: "column", md: "row" }} spacing={1} marginBottom={1} width="100%">

                        <RHFSwitch
                            name="isAdvisor"
                            label="¿Este usuario será un asesor?"
                            sx={{
                                width: "100%"
                            }}
                        />
                        <RHFTextField
                            name='linkWhatsApp'
                            fullWidth
                            label="Url WhatsApp"
                            variant="outlined"
                            inputAdornment
                        />
                    </Stack>
                </>
            }
        </Stack >
    )
}
