import { FC } from "react"
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Alert, Box, Button } from "@mui/material";
import FormProvider from '../../../../../components/hook-form/form-provider';
import { ContractDetailUpdateResponse } from "../../../../../modules/contracts/domain/contract-detail.service";
import { ContractDetail } from "../../../../../modules/contracts/domain/contract-detail";
import { takingSampleContractObjectSchema, defaultTakingSampleSerologicalTestContract } from "./taking-sample-validation";
import { useFormTakingSampleSerologicalTestContract } from "./use-form-chip-review";
import { TakingSampleSerologicalTestContract } from '../../../../../modules/contracts/domain/contract-services/topico/contract-topico';
import { TakingSampleSerologicalTestContractFormGeneral } from "./taking-sample-form-general";

type Props = {
    contractId: string;
    detail: ContractDetail;
    callback: (response: ContractDetailUpdateResponse) => void;
    onCancel: () => void;
}

export const TakingSampleSerologicalTestContractForm: FC<Props> = ({ detail, callback, contractId, onCancel }) => {
    const takingSampleSerologicalTest = detail?.topico?.takingSampleSerologicalTest;

    const methods = useForm({
        resolver: yupResolver<TakingSampleSerologicalTestContract>(takingSampleContractObjectSchema),
        defaultValues: {
            executed: takingSampleSerologicalTest?.executed || defaultTakingSampleSerologicalTestContract.executed,
            date: takingSampleSerologicalTest?.date || defaultTakingSampleSerologicalTestContract.date,
            description: takingSampleSerologicalTest?.description || defaultTakingSampleSerologicalTestContract.description,
            observation: takingSampleSerologicalTest?.observation || defaultTakingSampleSerologicalTestContract.observation,
            user: takingSampleSerologicalTest?.user || defaultTakingSampleSerologicalTestContract.user
        }
    });

    const { onSubmit, isExecuted } = useFormTakingSampleSerologicalTestContract({ contractId, detailId: detail.id, callback });


    return (
        <>
            <FormProvider methods={methods} onSubmit={methods.handleSubmit(onSubmit)}>

                {!takingSampleSerologicalTest?.executed && !isExecuted && <Alert severity="error">Aùn no se ha guardado la información relacionada a la toma de muestra</Alert>}

                {takingSampleSerologicalTest?.executed && !isExecuted && <Alert severity="info">Recuerda actualizar la información, aún no se han guardado los cambios</Alert>}

                {isExecuted && < Alert severity="success">Guardado correctamente los cambios</Alert>}

                <TakingSampleSerologicalTestContractFormGeneral />

                <Box display="flex" gap={1} justifyContent="center" mb={4}>
                    <Button variant="outlined" disabled={methods.formState.isSubmitting} fullWidth onClick={onCancel} >
                        Cancelar
                    </Button>
                    <Button type="submit" variant="contained" disabled={methods.formState.isSubmitting} fullWidth >
                        {takingSampleSerologicalTest?.executed ? "Actualizar Vacuna de Rabia" : "Guardar Vacuna de Rabia"}
                    </Button>

                </Box>
            </FormProvider >

        </>
    )
}
