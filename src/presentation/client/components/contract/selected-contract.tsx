import { FC } from "react";
import { Box, Button } from "@mui/material";
import { Contract } from '../../../../modules/contracts/domain/contract';
import CardDocumentation from "../documentation/card-documentation";
import Header from "../header/header";
import CardCage from "../cage/card-cage";
import CardTravel from "../travel/card-travel";
import { useContractStore } from '../../../../state/contract/contract-store';
import { IconWrapper } from "../../../../components/icon-wrapper";
import { ContractDetail } from '../../../../modules/contracts/domain/contract-detail';
import { statusError } from '../../../../modules/contracts/domain/contract-status';
import { useFinishClient } from '../../../contracts/hooks/use-finish-client';

type Props = {
    contract: Contract;
    contractDetail: ContractDetail;
}

export const SelectedContract: FC<Props> = ({ contract, contractDetail }) => {
    const { onSelected } = useContractStore();
    const { handleFinishClick } = useFinishClient({ contract, callback: () => onSelected(null) });

    return (
        <>
            <Header />
            <Box
                gap={3}
                display="grid"
                gridTemplateColumns={{
                    xs: 'repeat(1, 1fr)',
                    sm: 'repeat(2, 1fr)',
                    md: 'repeat(3, 1fr)',
                }}
            >
                <CardDocumentation
                    documentation={contractDetail.documentation}
                    contractId={contract.id}
                    detailId={contractDetail.id}
                    finish={statusError(contract.status.client, contract.endDate)}
                />
                <CardCage
                    cage={contractDetail.cage}
                    contractId={contract.id}
                    detailId={contractDetail.id}
                    finish={statusError(contract.status.client, contract.endDate)}
                    pet={contractDetail?.pet}
                />
                <CardTravel
                    travel={contractDetail.travel}
                    contractId={contract.id}
                    detail={contractDetail}
                />
            </Box>
            {contract?.status.client === "completed" &&
                <Button
                    onClick={handleFinishClick}
                    variant='contained'
                    color="primary"
                    fullWidth
                    sx={{ my: 2 }}
                    startIcon={<IconWrapper icon="checkCircleFill" />}
                >
                    Dar por finalizado el Servicio
                </Button>
            }

        </>
    )
}
