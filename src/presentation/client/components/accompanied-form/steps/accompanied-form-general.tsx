import { useFormContext } from 'react-hook-form';
import { Divider, Stack, Typography, InputAdornment, MenuItem, TextField, Button, FormHelperText } from '@mui/material';
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
import Upload from '../../../../../components/upload/upload';
import { useFileImageStore } from '../../../../../state/upload/file-image-store';

type Props = {
    notButton: boolean;
    imagePassport: string | null;
    client?: User;
}

export const AccompaniedFormGeneral = ({ client, notButton, imagePassport }: Props) => {
    const { fileImage, onChangeImageFile } = useFileImageStore();
    const { setValue, watch, formState } = useFormContext<TravelAccompaniedSchema>();
    const handlePhone = (value: string) => setValue("accompaniedPet.phone", value);
    const phone = watch("accompaniedPet.phone");
    const image = watch("accompaniedPet.image");

    const setOwnerInAccompanied = () => {
        const clientName = `${client?.profile?.name ?? ""} ${client?.profile?.secondName ?? ""} ${client?.profile?.lastName ?? ""} ${client?.profile?.secondLastName ?? ""}`;
        const documentNumber = client?.profile?.document === "PASAPORTE" ? client?.profile?.documentNumber : "";

        setValue("accompaniedPet", {
            name: clientName,
            document: "PASAPORTE",
            documentNumber: documentNumber,
            phone: client?.profile?.phone ?? "",
            email: client?.email ?? "",
            direction: client?.profile?.direction ?? "",
            district: client?.profile?.district ?? "",
            province: client?.profile?.province ?? "",
            department: client?.profile?.department ?? "",
            image,
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

        <Stack direction={{ xs: "column", md: "row" }} gap={4}>
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
                    label="Nombres y Apellidos (*)"
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
                <Stack direction={{ xs: "column", md: "row" }} spacing={2}>
                    <RHFTextField
                        name="accompaniedPet.direction"
                        label="Dirección (*)"
                        inputAdornment
                    />

                </Stack>
            </Stack>
            <Stack display="flex" alignItems="end" justifyContent="end" mb={4}>
                <Typography variant='h6'>Suba una imagen del pasaporte del acompañante (*)</Typography>
                <Upload
                    file={fileImage || imagePassport}
                    onDrop={(value) => onChangeImageFile(value[0])}
                    accept={{
                        'image/jpeg': ['.jpeg', '.jpg'],
                        'image/png': ['.png'],
                        'image/gif': ['.gif'],
                        'image/svg+xml': ['.svg']
                    }} sx={{
                        height: "100%"
                    }}
                    onDelete={() => onChangeImageFile(null)}
                    maxSize={26214400}
                    helperText={
                        (!!formState.errors.accompaniedPet?.image) && (
                            <FormHelperText error={!!formState.errors.accompaniedPet?.image} sx={{ px: 2 }}>
                                {formState.errors.accompaniedPet?.image?.message}
                            </FormHelperText>
                        )
                    }
                />
            </Stack>
        </Stack>
    )
}
