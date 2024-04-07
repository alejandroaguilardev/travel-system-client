import { FC } from "react"
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import FormProvider from '../../../../../components/hook-form/form-provider';
import { Box, Button } from "@mui/material";
import { useFormTravel } from "./use-form-travel";
import { travelSchema } from "./travel-validation";
import { TravelFormGeneral } from './general/travel-form-general';
import { PartialTravel, Travel } from '../../../../../modules/contracts/domain/contract-services/travel/contract-travel';
import { ContractDetailUpdateResponse } from '../../../../../modules/contracts/domain/contract-detail.service';
import { TabGenericProvider } from '../../../../../components/tab-generic/context/tab-generic-provider';
import { TabSwitcher } from '../../../../../components/tab-generic/tab-switcher';
import { AccompaniedForm } from "../../accompanied-form/accompanied-form";

type Props = {
    contractId: string;
    detailId: string;
    travel: Travel;
    hasServiceIncluded: boolean;
    callback: (response?: ContractDetailUpdateResponse) => void
    onCancel: () => void;
    user?: boolean;
}

export const TravelForm: FC<Props> = ({ travel, detailId, user, callback, onCancel, hasServiceIncluded, contractId }) => {
    const methods = useForm({
        resolver: yupResolver<PartialTravel>(travelSchema),
        defaultValues: travel,
    });

    const { onSubmit } = useFormTravel({ contractId, detailId, callback });

    const edit = (travel.status !== "completed") || !hasServiceIncluded;
    const tabs = [
        {
            value: "Reserva",
            component: <FormProvider methods={methods} onSubmit={methods.handleSubmit(onSubmit)} >
                <TravelFormGeneral hasServiceIncluded={!user ?? hasServiceIncluded} />
                {(edit || user) &&
                    <Box display="flex" gap={1} justifyContent="center" mb={4}>
                        <Button variant="outlined" disabled={methods.formState.isSubmitting} fullWidth onClick={onCancel} >
                            Cancelar
                        </Button>
                        <Button type="submit" variant="contained" disabled={methods.formState.isSubmitting} fullWidth >
                            Actualizar
                        </Button>
                    </Box>
                }
            </FormProvider>
        },
        {
            value: "Datos del acompañante",
            component: <AccompaniedForm
                travel={travel}
                contractId={contractId}
                contractDetailId={detailId}
                callback={callback}
                notButton={travel.status === "completed" && !user}
            />
        },
    ]

    return (
        <TabGenericProvider defaultValue={tabs[0].value}>
            <TabSwitcher
                tabs={tabs}
            />
        </TabGenericProvider>
    )
}
