import { FC } from "react";
import { Box } from "@mui/material";
import { Contract } from '../../../../modules/contracts/domain/contract';
import CardDocumentation from "../documentation/card-documentation";
import Header from "../header/header";
import CardCage from "../cards/card-cage";
import CardTravel from "../cards/card-travel";

type Props = {
    contract: Contract
}

export const SelectedContract: FC<Props> = ({ contract }) => {
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
                    onView={() => false}
                />
                <CardTravel
                    travel={contract.services.travel}
                    onView={() => false}
                />
            </Box>
        </>
    )
}
