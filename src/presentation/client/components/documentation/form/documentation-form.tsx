import { FC } from "react"
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { DocumentationDefinition } from '../../../../../modules/contracts/domain/interfaces/documentation';
import FormProvider from '../../../../../components/hook-form/form-provider';
import { Box, Button } from "@mui/material";
import { useFormDocumentation } from "./use-form-documentation";
import { documentationSchema } from "./documentation-validation";
import { DocumentationFormGeneral } from './documentation-form-general';

type Props = {
    contractId: string
    documentation: DocumentationDefinition;
    onCancel: () => void
}

export const DocumentationForm: FC<Props> = ({ documentation, onCancel, contractId }) => {
    const methods = useForm({
        resolver: yupResolver<DocumentationDefinition>(documentationSchema),
        defaultValues: documentation,
    });

    const { onSubmit } = useFormDocumentation({ contractId, callback: onCancel });

    return (
        <FormProvider methods={methods} onSubmit={methods.handleSubmit(onSubmit)} >

            <DocumentationFormGeneral documentation={documentation} />


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
