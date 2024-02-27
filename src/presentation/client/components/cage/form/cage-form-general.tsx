import { FC } from "react";
import { Alert, Stack } from "@mui/material";
import { useFormContext } from 'react-hook-form';
import { ContractFormCage } from '../../../../contracts/components/form/cage/contract-form-cage';
import { CageSelected } from "./cage-selected";
import { Cage } from '../../../../../modules/contracts/domain/contract-services/cage/cage';

type Props = {
    hasServiceIncluded: boolean;
    user?: boolean;
}

export const CageFormGeneral: FC<Props> = ({ hasServiceIncluded, user }) => {

    const { watch } = useFormContext<Cage>();
    const recommendation = watch('recommendation');

    return (
        <Stack spacing={1} my={1}>
            {hasServiceIncluded ?
                <Alert variant='outlined' sx={{ width: "100%" }}>Pet Travel proporciona le proporciona la siguiente jaula  como parte integral de su servicio, conforme a lo estipulado en su contrato</Alert>
                : <Alert variant='outlined' severity="info" sx={{ width: "100%" }}>Su contrato no incluye la responsabilidad de Pet Travel sobre la jaula. {recommendation?.modelCage && `De igual manera te recomendamos la jaula  ${recommendation.modelCage}`}</Alert>
            }
            {user && hasServiceIncluded && <ContractFormCage keyValue="chosen" />}
            <CageSelected readonly={!hasServiceIncluded} keyField="chosen" />
        </Stack >
    );
}