import { Stack, TextField, MenuItem } from '@mui/material';
import { CAGES_CHOSEN } from '../../../../../modules/contracts/domain/cage/cage-chosen';
import { capitalize } from '../../../../../modules/shared/domain/helpers';
import { useContractFormCage } from './use-contract-form-cage';
import { FC } from 'react';

type Props = {
    keyValue?: string;
}

export const ContractFormCage: FC<Props> = ({ keyValue }: Props) => {

    const { handleCageChosen } = useContractFormCage();

    return (
        <Stack spacing={1} marginBottom={1}>
            <TextField
                select
                label="Selecciona tu jaula"
                onChange={(e) => handleCageChosen(e.target.value, keyValue)}
            >
                {CAGES_CHOSEN.map((option) => (
                    <MenuItem key={option.modelCage} value={JSON.stringify(option)}>
                        {option.modelCage}  {option.dimensionsCage} {`(${capitalize(option.typeCage)})`}
                    </MenuItem>
                ))}
            </TextField>
        </Stack >
    )
}