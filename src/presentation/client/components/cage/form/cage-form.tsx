import { FC } from "react"
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Cage } from '../../../../../modules/contracts/domain/contract-services/cage/cage';
import FormProvider from '../../../../../components/hook-form/form-provider';
import { Box, Button } from "@mui/material";
import { useFormCage } from "./use-form-cage";
import { cageSchema } from "./cage-validation";
import { CageFormGeneral } from './cage-form-general';
import { ContractDetailUpdateResponse } from '../../../../../modules/contracts/domain/contract-detail.service';

type Props = {
    contractId: string;
    detailId: string;
    cage: Cage;
    hasServiceIncluded: boolean;
    noShowButton: boolean;
    onCancel: () => void;
    callback: (response?: ContractDetailUpdateResponse) => void
    user?: boolean
}

export const CageForm: FC<Props> = ({ cage, onCancel, callback, hasServiceIncluded, detailId, contractId, user = false, noShowButton }) => {
    const methods = useForm({
        resolver: yupResolver<Cage>(cageSchema),
        defaultValues: cage,
    });

    const { onSubmit } = useFormCage({ contractId, detailId, callback });

    return (
        <FormProvider methods={methods} onSubmit={methods.handleSubmit(onSubmit)} >
            <CageFormGeneral hasServiceIncluded={hasServiceIncluded} user={user} />
            {(!noShowButton || user) &&
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
