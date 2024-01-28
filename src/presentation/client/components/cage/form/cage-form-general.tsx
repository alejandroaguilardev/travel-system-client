import { FC } from "react";
import { Alert, MenuItem, Stack } from "@mui/material";
import RHFTextField from '../../../../../components/hook-form/rhf-text-field';
import { RHFSwitch } from "src/components/hook-form";
import { TYPE_CAGE } from '../../../../../modules/contracts/domain/cage/cage-chosen';
import { useFormContext } from 'react-hook-form';

type Props = {
    readonly: boolean;
}

export const CageFormGeneral: FC<Props> = ({ readonly }) => {

    const { watch } = useFormContext();
    const recommendation = watch('recommendation');

    return (
        <Stack spacing={1} my={1}>
            {readonly ?
                <Alert variant='outlined' sx={{ width: "100%" }}>Pet Travel proporciona le proporciona la siguiente jaula  como parte integral de su servicio, conforme a lo estipulado en su contrato</Alert>
                : <Alert variant='outlined' severity="info" sx={{ width: "100%" }}>Su contrato no incluye la responsabilidad de Pet Travel sobre la jaula. {recommendation && `De igual manera te recomendamos la jaula  ${recommendation}`}</Alert>
            }


            <RHFTextField
                name="chosen.typeCage"
                select
                label="Tpo de jaula"
                InputProps={{
                    readOnly: readonly
                }}
            >
                {TYPE_CAGE.map((option) => (
                    <MenuItem key={option} value={option}>
                        {option.toUpperCase()}
                    </MenuItem>
                ))}
            </RHFTextField>
            <RHFTextField
                name="chosen.modelCage"
                label="Modelo de jaula"
                InputProps={{
                    readOnly: readonly
                }}
            />
            <RHFTextField
                name="chosen.dimensionsCage"
                label="Dimensiones"
                InputProps={{
                    readOnly: readonly
                }}
            />
            {!readonly &&
                <RHFSwitch
                    name="swornDeclaration"
                    label="Acepto ser responsable de esta declaración"
                />
            }
        </Stack >
    );
}