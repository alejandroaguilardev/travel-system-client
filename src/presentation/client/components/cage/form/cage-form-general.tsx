import { Alert, Stack } from "@mui/material";
import { useFormContext } from 'react-hook-form';
import { ContractFormCage } from '../../../../contracts/components/form/cage/contract-form-cage';
import { CageSelected } from "./cage-selected";
import { Cage } from '../../../../../modules/contracts/domain/contract-services/cage/cage';


export const CageFormGeneral = () => {

    const { watch } = useFormContext<Cage>();

    return (
        <Stack spacing={1} my={1}>
            <Alert variant='outlined' sx={{ width: "100%" }} severity="info">Recomendamos siempre que la jaula tenga dos comedero y un bebedero</Alert>
            <ContractFormCage keyValue="chosen" />
            <CageSelected readonly={true} keyField="chosen" />
        </Stack >
    );
}