import { FC } from "react";
import { Divider, Stack } from "@mui/material";
import { ContractTopico } from "../../../../../modules/contracts/domain/contract-services/topico/contract-topico";

type Props = {
    topico: ContractTopico;
}

export const TopicoFormGeneral: FC<Props> = ({ topico }) => {


    return (
        <Stack flexWrap="wrap" spacing={1} marginBottom={1}>
            <Divider />

        </Stack>
    );
};
