import { useFormContext } from 'react-hook-form';
import { Divider, Stack, Typography, InputAdornment, MenuItem, TextField, Button } from '@mui/material';
import RHFTextField from '../../../../../components/hook-form/rhf-text-field';
import { PhoneNumber } from '../../../../../components/phone-number/phone-number';
import Iconify from '../../../../../components/iconify/iconify';
import { PROFILE_DOCUMENT } from '../../../../../modules/users/domain/profile/profile-document';
import { useUbigeo } from './use-ubigeo';
import { AutocompleteSelectorClient } from 'src/components/autocomplete/client/autocomplete-selector-client';
import PROVINCES from '../../../../../../public/data/province.json'
import DISTRICTS from '../../../../../../public/data/district.json'
import { TravelAccompaniedSchema } from '../accompanied-validation';
import { User } from '../../../../../modules/users/domain/user';

type Props = {
    notButton: boolean;
    client?: User;
}

export const AccompaniedFormGeneral = ({ client, notButton }: Props) => {
    const { setValue, watch, formState } = useFormContext<TravelAccompaniedSchema>();

    const handlePhone = (value: string) => setValue("accompaniedPet.phone", value);
    const phone = watch("accompaniedPet.phone");

    const setOwnerInAccompanied = () => {
        const clientName = `${client?.profile?.name ?? ""} ${client?.profile?.secondName ?? ""} ${client?.profile?.lastName ?? ""} ${client?.profile?.secondLastName ?? ""}`;
        setValue("accompaniedPet", {
            name: clientName,
            document: client?.profile?.document ?? "",
            documentNumber: client?.profile?.documentNumber ?? "",
            phone: client?.profile?.phone ?? "",
            email: client?.email ?? "",
            direction: client?.profile?.direction ?? "",
            district: client?.profile?.district ?? "",
            province: client?.profile?.province ?? "",
            department: client?.profile?.department ?? "",
        });

        setTimeout(() => {
            setValue("accompaniedPet.phone", client?.profile?.phone ?? "");
            setValue("accompaniedPet.province", client?.profile?.province ?? "");
            setValue("accompaniedPet.district", client?.profile?.district ?? "");
        }, 100);
    }


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
            <Typography variant={notButton ? "h6" : "h4"}>
                Información sobre la persona que viaja o envía la mascota por cargo
            </Typography>
            {
                !notButton && client &&
                <Button variant='outlined' type='button' onClick={setOwnerInAccompanied}>
                    ¿El titular del contrato será el viajero? Cargar datos del titular
                </Button>
            }
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
                    <MenuItem key={PROFILE_DOCUMENT[1]} value={PROFILE_DOCUMENT[1]}>
                        {PROFILE_DOCUMENT[1]}
                    </MenuItem>
                </RHFTextField>

                <RHFTextField
                    name="accompaniedPet.documentNumber"
                    label="Número de pasaporte (*)"
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
                    errorMessage={formState.errors.accompaniedPet?.phone?.message ?? ""}
                    disabled={notButton}

                />
            </Stack>
            <Stack direction={{ xs: "column", md: "row" }} spacing={2}>
                {
                    notButton
                        ? <TextField
                            value={departments.find(_ => _.id === department)?.name ?? ""}
                            label="Departamento (*)"
                            variant="outlined"
                            disabled
                            fullWidth
                        />
                        : <AutocompleteSelectorClient
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
                }

                {
                    notButton
                        ? <TextField
                            value={PROVINCES.find(_ => _.province_id === province)?.name ?? ""}
                            label="Departamento (*)"
                            variant="outlined"
                            disabled
                            fullWidth
                        />
                        : <AutocompleteSelectorClient
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
                }

                {
                    notButton
                        ? <TextField
                            value={DISTRICTS.find(_ => _.district_id === district)?.name ?? ""}
                            label="Departamento (*)"
                            variant="outlined"
                            disabled
                            fullWidth
                        />
                        : <AutocompleteSelectorClient
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
                }
            </Stack>

            <RHFTextField
                name="accompaniedPet.direction"
                label="Dirección (*)"
                inputAdornment
            />
        </Stack>
    )
}
