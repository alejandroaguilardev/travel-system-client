import { FC, ReactNode } from "react"
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import FormProvider from '../../../../components/hook-form/form-provider';
import { Travel } from '../../../../modules/contracts/domain/contract-services/travel/contract-travel';
import { useAccompaniedForm } from "./use-accompanied-form";
import { TravelAccompaniedSchema, getDefaultValues, travelAccompaniedSchema } from './accompanied-validation';
import { ContractDetailUpdateResponse } from '../../../../modules/contracts/domain/contract-detail.service';

type Props = {
    contractId: string;
    contractDetailId: string;
    travel?: Travel;
    notButton: boolean;
    callback: (response?: ContractDetailUpdateResponse) => void;
    children: ReactNode;
    onSubmit?: SubmitHandler<TravelAccompaniedSchema>
}

export const AccompaniedForm: FC<Props> = ({ contractId, notButton, contractDetailId, travel, callback, children, onSubmit }) => {
    const methods = useForm({
        resolver: yupResolver<TravelAccompaniedSchema>(travelAccompaniedSchema),
        defaultValues: getDefaultValues(travel),
        disabled: notButton
    });

    const { onSubmit: onSubmitDefault } = useAccompaniedForm({ contractId, contractDetailId, callback });

    return (
        <FormProvider methods={methods} onSubmit={methods.handleSubmit(onSubmit ? onSubmit : onSubmitDefault)}>
            {children}
        </FormProvider >
    )
}
