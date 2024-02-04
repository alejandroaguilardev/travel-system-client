import { FC } from "react";
import { Box, Button } from "@mui/material";
import { Contract } from '../../../../modules/contracts/domain/contract';
import CardDocumentation from "../documentation/card-documentation";
import Header from "../header/header";
import CardCage from "../cage/card-cage";
import CardTravel from "../travel/card-travel";
import { useFinish } from '../../../contracts/hooks/use-finish';
import { useContractStore } from '../../../../state/contract/contract-store';
import { IconWrapper } from "../../../../components/icon-wrapper";

type Props = {
    contract: Contract
}

export const SelectedContract: FC<Props> = ({ contract }) => {
    const { onSelected } = useContractStore();
    const { handleFinishClick } = useFinish({ contract, callback: () => onSelected(null) });

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
                    documentation={contract.services.documentation}
                    contractId={contract.id}
                />
                <CardCage
                    cage={contract.services.cage}
                    contractId={contract.id}
                />
                <CardTravel
                    travel={contract.services.travel}
                    contractId={contract.id}
                />
            </Box>
            {contract?.status === "completed" &&
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
