import { useEffect } from "react";
import { FormControlLabel, Stack, Switch } from "@mui/material";
import { useDoctorProvince } from "../../hooks/use-doctor-province";
import RHFTextField from '../../../../components/hook-form/rhf-text-field';
import { TopicoSearchUser } from './topico-search-user';
import { useFormContext } from 'react-hook-form';



export const DoctorProvince = () => {
    const { isDoctorProvince, handleDoctorProvince } = useDoctorProvince();
    const { watch } = useFormContext();
    const doctorProvince = watch("doctorProvince");

    useEffect(() => {
        handleDoctorProvince(!!doctorProvince);
    }, [])


    return (
        <Stack direction={{ xs: "column", md: "row" }} spacing={2} width="100%">
            {
                isDoctorProvince
                    ? <RHFTextField
                        name="doctorProvince"
                        label="Escribe el nombre el doctor"
                        fullWidth
                    />
                    : <TopicoSearchUser />
            }

            <FormControlLabel
                control={<Switch checked={isDoctorProvince} onClick={() => handleDoctorProvince(!isDoctorProvince)} />}
                label="¿Doctor Provincia?"
                sx={{
                    width: "100%"
                }}
            />
        </Stack>
    );
}
