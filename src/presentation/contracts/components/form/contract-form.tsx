import { FC } from "react"
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { NewContract } from '../../../../modules/contracts/domain/contract';
import FormProvider from '../../../../components/hook-form/form-provider';
import { defaultValues, contractSchema, NewContractEmail } from './contract-validations';
import { useFormContract } from "./use-form-new-contract";
import { ContractStep } from "./step/contract-step";
import { ClientDialogProvider } from "../../../client/components/search-client/client-dialog-context";
import { PetDialogProvider } from "../../../pets/components/search/pet-dialog-context";
import { PetDialogForm } from "../../../pets/components/search/pet-dialog";
import { ClientDialogForm } from '../../../client/components/search-client/client-dialog-form';

type Props = {
    contract?: NewContract;
    callback: () => void;
}

export const ContractForm: FC<Props> = ({ contract, callback }) => {
    const methods = useForm({
        resolver: yupResolver<NewContractEmail>(contractSchema),
        defaultValues: { ...defaultValues, ...contract } ?? defaultValues,
    });

    const { onSubmit } = useFormContract({ callback, contract });

    return (
        <PetDialogProvider>
            <ClientDialogProvider>
                <FormProvider methods={methods} onSubmit={methods.handleSubmit(onSubmit)}>
                    <ContractStep contract={contract} />
                </FormProvider>
                <ClientDialogForm />
                <PetDialogForm />
            </ClientDialogProvider >
        </PetDialogProvider>
    )
}
3