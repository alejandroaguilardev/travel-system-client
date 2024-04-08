import { FC, ReactNode } from 'react'
import { Accordion, AccordionDetails, AccordionSummary, Typography } from '@mui/material'
import Iconify from '../../../../components/iconify';
import { capitalize } from '../../../../modules/shared/domain/helpers/capitalize';
import { ContractDetail } from '../../../../modules/contracts/domain/contract-detail';

type Props = {
    children: ReactNode;
    detail: ContractDetail;
    index: number;
}

export const AccordionPet: FC<Props> = ({ children, detail, index }) => {
    const number = index + 1;
    return (
        <Accordion defaultExpanded sx={{ boxShadow: 1 }}>
            <AccordionSummary expandIcon={<Iconify icon="eva:arrow-ios-downward-fill" />}>
                <Typography variant="subtitle1">
                    {detail?.pet?.name ?
                        <>
                            {capitalize(detail?.pet?.name ?? "Mascota")}  ({capitalize(detail?.pet?.type)})
                        </>
                        : "Mascota N°" + number
                    }
                </Typography>
            </AccordionSummary>
            <AccordionDetails>
                {children}
            </AccordionDetails>
        </Accordion>
    )
}
