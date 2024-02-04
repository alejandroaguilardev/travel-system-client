import { FC } from "react";
import { Alert, Stack } from "@mui/material";
import { useFormContext } from 'react-hook-form';
import { ContractFormCage } from '../../../../contracts/components/form/cage/contract-form-cage';
import { CageSelected } from "./cage-selected";

type Props = {
    readonly: boolean;
    user?: boolean;
}

export const CageFormGeneral: FC<Props> = ({ readonly, user }) => {

    const { watch } = useFormContext();
    const recommendation = watch('recommendation');

    return (
        <Stack spacing={1} my={1}>
            {readonly ?
                <Alert variant='outlined' sx={{ width: "100%" }}>Pet Travel proporciona le proporciona la siguiente jaula  como parte integral de su servicio, conforme a lo estipulado en su contrato</Alert>
                : <Alert variant='outlined' severity="info" sx={{ width: "100%" }}>Su contrato no incluye la responsabilidad de Pet Travel sobre la jaula. {recommendation && `De igual manera te recomendamos la jaula  ${recommendation}`}</Alert>
            }
            {user && readonly && <ContractFormCage keyValue="chosen" />}
            <CageSelected readonly={readonly} keyField="chosen" />
        </Stack >
    );
}