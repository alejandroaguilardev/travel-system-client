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
    notButton: boolean;
    callback: (response?: ContractDetailUpdateResponse) => void;
}

export const AccompaniedForm: FC<Props> = ({ contractId, notButton, contractDetailId, travel, callback }) => {
    const methods = useForm({
        resolver: yupResolver<TravelAccompaniedSchema>(travelAccompaniedSchema),
        defaultValues: {
            accompaniedPet: {
                name: travel?.accompaniedPet?.name || defaultValues.accompaniedPet.name,
                document: travel?.accompaniedPet?.document || defaultValues.accompaniedPet.document,
                documentNumber: travel?.accompaniedPet?.documentNumber || defaultValues.accompaniedPet.documentNumber,
                phone: travel?.accompaniedPet?.phone || defaultValues.accompaniedPet.phone,
                email: travel?.accompaniedPet?.email || defaultValues.accompaniedPet.email,
                direction: travel?.accompaniedPet?.direction || defaultValues.accompaniedPet.direction,
                district: travel?.accompaniedPet?.district || defaultValues.accompaniedPet.district,
                province: travel?.accompaniedPet?.province || defaultValues.accompaniedPet.province,
                department: travel?.accompaniedPet?.department || defaultValues.accompaniedPet.department,
            },
            destination: {
                countryDestination: travel?.destination?.countryDestination || defaultValues.destination.countryDestination,
                cityDestination: travel?.destination?.cityDestination || defaultValues.destination.cityDestination,
                directionDestination: travel?.destination?.directionDestination || defaultValues.destination.directionDestination,
            },
            petPerCharge: {
                name: travel?.petPerCharge?.name || defaultValues.petPerCharge.name,
                document: travel?.petPerCharge?.document || defaultValues.petPerCharge.document,
                documentNumber: travel?.petPerCharge?.documentNumber || defaultValues.petPerCharge.documentNumber,
                phone: travel?.petPerCharge?.phone || defaultValues.petPerCharge.phone,
                email: travel?.petPerCharge?.email || defaultValues.petPerCharge.email,
            }
        },
        disabled: notButton
    });

    const { onSubmit } = useAccompaniedForm({ contractId, contractDetailId, callback });

    return (
        <FormProvider methods={methods} onSubmit={methods.handleSubmit(onSubmit)}>
            <AccompaniedStep hasCharge={travel?.typeTraveling === "charge"} notButton={notButton} status={travel?.status ?? "pending"} />
        </FormProvider >
    )
}
