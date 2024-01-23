import { FC } from "react"
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { NewRole } from '../../../../modules/roles/domain/role';
import FormProvider from '../../../../components/hook-form/form-provider';
import { TabGenericProvider, TabSwitcher } from '../../../../components/tab-generic';
import { ActionsButtonsForm } from '../../../../components/hook-form/actions-buttons-form';
import { tabs } from "./tabs";
import { defaultValues, roleSchema } from "./role-validations";
import { useFormRole } from "./use-form-role";

type Props = {
    role?: NewRole;
    callback: () => void
}

export const RoleForm: FC<Props> = ({ role, callback }) => {
    const methods = useForm({
        resolver: yupResolver<NewRole>(roleSchema),
        defaultValues: role ?? defaultValues,
    });

    const { onSubmit } = useFormRole({ role, callback });

    return (
        <FormProvider methods={methods} onSubmit={methods.handleSubmit(onSubmit)}>
            <TabGenericProvider defaultValue={tabs[0].value}>
                <TabSwitcher
                    tabs={tabs}
                />
            </TabGenericProvider>

            <ActionsButtonsForm
                name="rol"
                edit={!!role}
            />

        </FormProvider >
    )
}
