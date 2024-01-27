import { FC } from 'react';
import { Box, ListItemText, Stack, Typography } from '@mui/material';
import { Contract } from '../../../../modules/contracts/domain/contract';
import { ShadowCard } from '../../../../components/card/card-shadow';
import { fDate } from 'src/modules/shared/infrastructure/helpers/format-time';
import { useContractStore } from '../../../../state/contract/contract-store';

type Props = {
    contracts?: Contract[];
}

export const ListContract: FC<Props> = ({ contracts = [] }) => {
    const { contract, onSelected } = useContractStore();

    return (
        <Box mt={5} display="flex" flexDirection="column" justifyContent="center" alignItems="center" width="100%">
            {
                contracts.length > 1 &&
                <>
                    <Typography >Listado de servicios en curso</Typography>
                    <Stack direction="row" justifyContent="center" flexWrap="wrap" width="100%" >
                        {contracts.map(_ => {
                            if (_.id === contract?.id) return null;
                            return (
                                <ShadowCard
                                    title={
                                        <ListItemText
                                            sx={{ mb: 1 }}
                                            primary={`N° ${_.number}`}
                                            primaryTypographyProps={{
                                                typography: 'subtitle1',
                                            }}
                                            secondary={`${fDate(_.startDate)}`}
                                            secondaryTypographyProps={{
                                                component: 'span',
                                                typography: 'caption',
                                                color: 'text.disabled',
                                            }}
                                        />
                                    }
                                    key={_.id}
                                    sx={{
                                        cursor: "pointer"
                                    }}
                                    onClick={() => onSelected(_)}
                                />
                            )
                        })}
                    </Stack>
                </>
            }
        </Box>
    )
}
