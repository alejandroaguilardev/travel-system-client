import { useFormContext } from 'react-hook-form';
import { InputAdornment, MenuItem, Stack, Typography } from "@mui/material"
import RHFTextField from '../../../../../components/hook-form/rhf-text-field';
import { PhoneNumber } from '../../../../../components/phone-number/phone-number';
import Iconify from '../../../../../components/iconify/iconify';
import { PROFILE_DOCUMENT } from '../../../../../modules/users/domain/profile/profile-document';
import { TravelAccompaniedSchema } from '../accompanied-validation';

type Props = {
    notButton: boolean;
}

export const ChargeFormGeneral = ({ notButton }: Props) => {
    const { setValue, watch, formState } = useFormContext<TravelAccompaniedSchema>();
    const handlePhone = (value: string) => setValue("petPerCharge.phone", value);
    const phone = watch("petPerCharge.phone");
    const document = watch("petPerCharge.document");

    return (
        <>

            <Stack spacing={2} mb={5}>
                <Typography variant="h4">
                    Información sobre la persona que recibe la mascota:
                </Typography>
                <RHFTextField
                    name="petPerCharge.name"
                    label="Nombre (*)"
                    inputAdornment
                />
                <Stack direction={{ xs: "column", md: "row" }} spacing={2}>
                    {
                        notButton ?
                            <RHFTextField
                                name="petPerCharge.document"
                                fullWidth
                                label="Documento (*)"
                                variant="outlined"
                                inputAdornment
                            />
                            : <RHFTextField
                                name="petPerCharge.document"
                                fullWidth
                                label="Documento (*)"
                                variant="outlined"
                                inputAdornment
                                select
                            >
                                {PROFILE_DOCUMENT.map((_) => (
                                    <MenuItem key={_} value={_}>
                                        {_}
                                    </MenuItem>
                                ))}
                            </RHFTextField>

                    }


                    <RHFTextField
                        name="petPerCharge.documentNumber"
                        label="Número de documento (*)"
                        inputAdornment
                    />
                </Stack>

                <Stack direction={{ xs: "column", md: "row" }} spacing={2}>
                    <RHFTextField
                        name="petPerCharge.email"
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
                        disabled={notButton}
                        errorMessage={formState.errors.accompaniedPet?.phone?.message ?? ""}
                    />
                </Stack>
            </Stack>
        </>
    )
}
