import { FC } from "react"
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import FormProvider from '../../../../components/hook-form/form-provider';
import { TabGenericProvider, TabSwitcher } from '../../../../components/tab-generic';
import { NewCage, Cage } from '../../../../modules/cages/domain/cage';
import { useFormCage } from "./use-form-cage";
import { tabs } from "./tabs";
import { ActionsButtonsForm } from '../../../../components/hook-form/actions-buttons-form';
import { defaultValues, cageSchema } from "./cage-validations";

type Props = {
    cage?: Cage;
    callback: () => void
}

export const CageForm: FC<Props> = ({ cage, callback }) => {
    const methods = useForm({
        resolver: yupResolver<NewCage>(cageSchema),
        defaultValues: cage ?? defaultValues,
    });

    const { onSubmit } = useFormCage({ cage, callback });

    return (
        <FormProvider methods={methods} onSubmit={methods.handleSubmit(onSubmit)}>
            <TabGenericProvider defaultValue={tabs[0].value}>
                <TabSwitcher
                    tabs={tabs}
                />
            </TabGenericProvider>

            <ActionsButtonsForm
                name="Permiso"
                edit={!!cage}
            />

        </FormProvider >
    )
}
