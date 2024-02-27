import { FC, ReactNode } from 'react'
import { Accordion, AccordionDetails, AccordionSummary, IconButton, Typography } from '@mui/material'
import Iconify from '../../../../components/iconify';
import { capitalize } from '../../../../modules/shared/domain/helpers/capitalize';
import { ContractDetail } from '../../../../modules/contracts/domain/contract-detail';

type Props = {
    children: ReactNode;
    detail: ContractDetail;
    index: number
}

export const AccordionPet: FC<Props> = ({ children, detail, index }) => {
    return (
        <Accordion defaultExpanded>
            <AccordionSummary expandIcon={<Iconify icon="eva:arrow-ios-downward-fill" />}>
                <Typography variant="subtitle1">
                    {capitalize(detail.pet.name)}  ({capitalize(detail.pet.type)})
                </Typography>
            </AccordionSummary>
            <AccordionDetails>
                {children}
            </AccordionDetails>
        </Accordion>
    )
}
