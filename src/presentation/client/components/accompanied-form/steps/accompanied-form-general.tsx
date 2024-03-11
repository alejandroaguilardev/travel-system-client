import { useFormContext } from 'react-hook-form';
import { Divider, Stack, Typography, InputAdornment, MenuItem } from '@mui/material';
import RHFTextField from '../../../../../components/hook-form/rhf-text-field';
import { PhoneNumber } from '../../../../../components/phone-number/phone-number';
import Iconify from '../../../../../components/iconify/iconify';
import { PROFILE_DOCUMENT } from '../../../../../modules/users/domain/profile/profile-document';
import { useUbigeo } from './use-ubigeo';
import { AutocompleteSelectorClient } from 'src/components/autocomplete/client/autocomplete-selector-client';
import PROVINCES from '../../../../../../public/data/province.json'
import DISTRICTS from '../../../../../../public/data/district.json'

export const AccompaniedFormGeneral = () => {
    const { setValue, watch } = useFormContext();

    const handlePhone = (value: string) => setValue("accompaniedPet.phone", value);
    const phone = watch("accompaniedPet.phone");

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
    } = useUbigeo("accompaniedPet");

    return (

        <Stack spacing={2} mb={5}>
            <Typography variant="h4">
                Información sobre la persona que viaja o envía la mascota por cargo
            </Typography>
            <Divider />
            <RHFTextField
                name="accompaniedPet.name"
                label="Nombre (*)"
                inputAdornment
            />
            <Stack direction={{ xs: "column", md: "row" }} spacing={2}>

                <RHFTextField
                    name="accompaniedPet.document"
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
                    name="accompaniedPet.documentNumber"
                    label="Número de documento (*)"
                    inputAdornment
                />
            </Stack>

            <Stack direction={{ xs: "column", md: "row" }} spacing={2}>
                <RHFTextField
                    name="accompaniedPet.email"
                    label="Correo Electrónico (*)"
                    inputAdornment
                />
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
                />
            </Stack>
            <Stack direction={{ xs: "column", md: "row" }} spacing={2}>
                <AutocompleteSelectorClient
                    textField={{
                        label: "Departamento (*)"
                    }}
                    items={departments}
                    defaultValue={departments.find(_ => _.id === department) || null}
                    getOptionLabel={(d) => d?.name ?? ""}
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
                    getOptionLabel={(p) => p?.name ?? ""}
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
                    getOptionLabel={(d) => d?.name ?? ""}
                    callback={(value: any) => handleDistrict(value)}
                    propertiesFilter={["name"]}
                />
            </Stack>

            <RHFTextField
                name="accompaniedPet.direction"
                label="Dirección (*)"
                inputAdornment
            />
        </Stack>
    )
}
