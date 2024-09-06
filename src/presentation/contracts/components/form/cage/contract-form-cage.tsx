import { FC } from 'react';
import { Stack } from '@mui/material';
import { useContractFormCage } from './use-contract-form-cage';
import { SearchCages } from '../../search-cages/search-cages';

type Props = {
    keyValue?: string;
}

export const ContractFormCage: FC<Props> = ({ keyValue }: Props) => {

    const { handleCageChosen, cage } = useContractFormCage({ keyValue });

    return (
        <Stack spacing={1} marginBottom={1}>
            <SearchCages
                cage={cage ?? null}
                field='Jaula'
                handleValue={handleCageChosen}
            />
        </Stack >
    )
}