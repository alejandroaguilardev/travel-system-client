import { FC } from "react"
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Documentation } from '../../../../../modules/contracts/domain/contract-services/documentation/documentation';
import FormProvider from '../../../../../components/hook-form/form-provider';
import { Box, Button } from "@mui/material";
import { useFormDocumentation } from "./use-form-documentation";
import { documentationSchema } from "./documentation-validation";
import { DocumentationFormGeneral } from './documentation-form-general';
import { ContractDetailUpdateResponse } from '../../../../../modules/contracts/domain/contract-detail.service';

type Props = {
    role?: "user"
    contractId: string;
    detailId: string;
    documentation: Documentation;
    noShowButton: boolean;
    onCancel: () => void;
    callback: (response?: ContractDetailUpdateResponse) => void
}

export const DocumentationForm: FC<Props> = ({ role, documentation, noShowButton, onCancel, callback, contractId, detailId }) => {
    const methods = useForm({
        resolver: yupResolver<Documentation>(documentationSchema),
        defaultValues: documentation,
    });

    const { onSubmit } = useFormDocumentation({ contractId, detailId, callback });

    return (
        <FormProvider methods={methods} onSubmit={methods.handleSubmit(onSubmit)} >
            <DocumentationFormGeneral documentation={documentation} role={role} />

            {
                !noShowButton &&
                <Box display="flex" gap={1} justifyContent="center" mb={4}>
                    <Button variant="outlined" disabled={methods.formState.isSubmitting} fullWidth onClick={onCancel} >
                        Cancelar
                    </Button>
                    <Button type="submit" variant="contained" disabled={methods.formState.isSubmitting} fullWidth >
                        Actualizar
                    </Button>

                </Box>
            }
        </FormProvider >
    )
}
