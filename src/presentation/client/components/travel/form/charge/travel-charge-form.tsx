import { FC } from "react";
import { Typography } from "@mui/material";
import RHFTextField from '../../../../../../components/hook-form/rhf-text-field';
import IconWrapper from '../../../../../../components/icon-wrapper/icon-wrapper';
import { useTravelGeneralForm } from "../general/use-travel-general-form";

type Props = {
    hasServiceIncluded: boolean;
}

export const TravelFormGeneral: FC<Props> = ({ hasServiceIncluded }) => {
    const { editPermit } = useTravelGeneralForm();
    const edit = editPermit(hasServiceIncluded)

    return (
        <>
            <Typography>Envío por cargo </Typography>
            <RHFTextField
                name="petPerCharge.receptor"
                label="Receptor (*)"
                InputProps={{
                    readOnly: edit
                }}
                style={edit ? { pointerEvents: 'none', opacity: 0.5 } : {}}
            />
            <RHFTextField
                name="petPerCharge.phone"
                label="Teléfono (*)"
                InputProps={{
                    readOnly: edit
                }}
                style={edit ? { pointerEvents: 'none', opacity: 0.5 } : {}}
            />
            <RHFTextField
                name="petPerCharge.email"
                label="Correo Electrónico"
                InputProps={{
                    readOnly: edit
                }}
                style={edit ? { pointerEvents: 'none', opacity: 0.5 } : {}}
            />

            <RHFTextField
                name="petPerCharge.pickupDateTime"
                type="date"
                label="Fecha de recojo (*)"
                InputProps={{
                    startAdornment: <IconWrapper icon="date" />
                }}
                style={edit ? { pointerEvents: 'none', opacity: 0.5 } : {}}
            />
            <RHFTextField
                name="petPerCharge.pickupLocation"
                label="Lugar de recojo (*)"
                InputProps={{
                    readOnly: edit
                }}
                style={edit ? { pointerEvents: 'none', opacity: 0.5 } : {}}
            />
            <RHFTextField
                name="petPerCharge.specialRequests"
                label="Solitudes opcionales"
                InputProps={{
                    readOnly: edit
                }}
                style={edit ? { pointerEvents: 'none', opacity: 0.5 } : {}}
            />
        </>
    );
}