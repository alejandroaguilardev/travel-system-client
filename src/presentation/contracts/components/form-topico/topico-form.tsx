import { FC } from "react"
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Box, Button } from "@mui/material";
import FormProvider from '../../../../components/hook-form/form-provider';
import { ContractTopico } from "../../../../modules/contracts/domain/contract-services/topico/contract-topico";
import { ContractDetailUpdateResponse } from "../../../../modules/contracts/domain/contract-detail.service";
import { useFormTopico } from "./user-topico-form";
import { TopicoFormGeneral } from "./general/topico-form-general";
import { topicoSchema } from "./topico-validation";

type Props = {
    role?: "user"
    contractId: string;
    detailId: string;
    topico: ContractTopico;
    callback: (response?: ContractDetailUpdateResponse) => void;
    onCancel: () => void;
}

export const TopicoForm: FC<Props> = ({ topico, callback, contractId, detailId, onCancel }) => {
    const methods = useForm({
        resolver: yupResolver<ContractTopico>(topicoSchema),
        defaultValues: topico,
    });

    const { onSubmit } = useFormTopico({ contractId, detailId, callback });

    return (
        <FormProvider methods={methods} onSubmit={methods.handleSubmit(onSubmit)} >

            <TopicoFormGeneral topico={topico} />

            <Box display="flex" gap={1} justifyContent="center" mb={4}>
                <Button variant="outlined" disabled={methods.formState.isSubmitting} fullWidth onClick={onCancel} >
                    Cancelar
                </Button>
                <Button type="submit" variant="contained" disabled={methods.formState.isSubmitting} fullWidth >
                    Actualizar
                </Button>

            </Box>
        </FormProvider >
    )
}
