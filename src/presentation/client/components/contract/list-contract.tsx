import { FC } from 'react';
import { Box, ListItemText, Stack, Typography } from '@mui/material';
import { Contract, correlativeToString } from '../../../../modules/contracts/domain/contract';
import { ShadowCard } from '../../../../components/card/card-shadow';
import { fDate } from '../../../../modules/shared/infrastructure/helpers/format-time';
import { useContractStore } from '../../../../state/contract/contract-store';

type Props = {
    contracts?: Contract[];
}

export const ListContract: FC<Props> = ({ contracts = [] }) => {
    const { contract, contractDetail, onSelected, onSelectedDetail } = useContractStore();

    return (
        <Box mt={5} display="flex" flexDirection="column" justifyContent="center" alignItems="center" width="100%">
            {
                (contracts.length > 1 || (contract?.details && contract?.details.length > 1)) &&
                <>
                    <Typography >Listado de servicios en curso</Typography>
                    <Stack direction="row" justifyContent="center" flexWrap="wrap" width="100%" >
                        {contracts.map(_ => _.details.map(detail => {
                            if (detail.id === contractDetail?.id) return null;

                            return (
                                <ShadowCard
                                    title={
                                        <ListItemText
                                            sx={{ mb: 1, textAlign: "center" }}
                                            primary={`N° ${correlativeToString(_?.correlative)}`}
                                            primaryTypographyProps={{
                                                typography: 'subtitle1',
                                            }}
                                            secondary={`${detail?.pet?.name || "Mascota"} - ${fDate(_.startDate)}`}
                                            secondaryTypographyProps={{
                                                component: 'span',
                                                typography: 'caption',
                                                color: 'text.disabled',
                                            }}
                                        />
                                    }
                                    key={detail.id}
                                    sx={{
                                        cursor: "pointer"
                                    }}
                                    onClick={() => {
                                        onSelected(_);
                                        onSelectedDetail(detail)
                                    }}
                                />
                            )
                        })
                        )}
                    </Stack>
                </>
            }
        </Box >
    )
}
