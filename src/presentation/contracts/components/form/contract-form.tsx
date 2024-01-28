import { FC } from "react"
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { NewContract } from '../../../../modules/contracts/domain/contract';
import FormProvider from '../../../../components/hook-form/form-provider';
import { TabGenericProvider, TabSwitcher } from '../../../../components/tab-generic';
import { ActionsButtonsForm } from '../../../../components/hook-form/actions-buttons-form';
import { tabs } from "./tabs";
import { defaultValues, contractSchema } from "./contract-validations";
import { useFormContract } from "./use-form-new-contract";

type Props = {
    contract?: NewContract;
    callback: () => void
}

export const ContractForm: FC<Props> = ({ contract, callback }) => {
    const methods = useForm({
        resolver: yupResolver<NewContract>(contractSchema),
        defaultValues: contract ?? defaultValues,
    });

    const { onSubmit } = useFormContract({ callback, contract });

    return (
        <FormProvider methods={methods} onSubmit={methods.handleSubmit(onSubmit)}>
            <TabGenericProvider defaultValue={tabs[0].value}>
                <TabSwitcher
                    tabs={tabs}
                />
            </TabGenericProvider>
            <ActionsButtonsForm
                name="contrato"
                edit={!!contract}
            />

        </FormProvider >
    )
}
3