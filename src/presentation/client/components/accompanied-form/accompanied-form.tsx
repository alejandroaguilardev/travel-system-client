import { FC } from "react"
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import FormProvider from '../../../../components/hook-form/form-provider';
import { Travel } from '../../../../modules/contracts/domain/contract-services/travel/contract-travel';
import { useAccompaniedForm } from "./use-accompanied-form";
import { TravelAccompaniedSchema, defaultValues, travelAccompaniedSchema } from './accompanied-validation';
import { AccompaniedStep } from "./steps/accompanied-steps";
import { ContractDetailUpdateResponse } from '../../../../modules/contracts/domain/contract-detail.service';

type Props = {
    contractId: string;
    contractDetailId: string;
    travel?: Travel;
    notButton?: boolean;
    callback: (response?: ContractDetailUpdateResponse) => void;
}

export const AccompaniedForm: FC<Props> = ({ contractId, notButton = false, contractDetailId, travel, callback }) => {
    const methods = useForm({
        resolver: yupResolver<TravelAccompaniedSchema>(travelAccompaniedSchema),
        defaultValues: {
            accompaniedPet: travel?.accompaniedPet ?? defaultValues.accompaniedPet,
            destination: travel?.destination ?? defaultValues.destination,
            petPerCharge: travel?.petPerCharge ?? defaultValues.petPerCharge,
        },
        disabled: notButton
    });

    const { onSubmit } = useAccompaniedForm({ contractId, contractDetailId, callback });

    return (
        <FormProvider methods={methods} onSubmit={methods.handleSubmit(onSubmit)}>
            <AccompaniedStep hasCharge={travel?.typeTraveling === "charge"} notButton={notButton} />
        </FormProvider >
    )
}
