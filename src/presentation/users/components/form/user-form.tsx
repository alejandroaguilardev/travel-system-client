import { FC } from "react"
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { NewUser, User } from '../../../../modules/users/domain/user';
import FormProvider from '../../../../components/hook-form/form-provider';
import { TabGenericProvider, TabSwitcher } from '../../../../components/tab-generic';
import { ActionsButtonsForm } from '../../../../components/hook-form/actions-buttons-form';
import { tabs } from "./tabs";
import { defaultValues, userSchema } from "./user-validations";
import { useFormUser } from "./use-form-user";

type Props = {
    user?: NewUser;
    notReload?: boolean;
    callback: (newUser?: NewUser) => void
}

export const UserForm: FC<Props> = ({ user, notReload, callback }) => {
    const methods = useForm({
        resolver: yupResolver<NewUser>(userSchema),
        defaultValues: user ?? defaultValues,
    });

    const { onSubmit } = useFormUser({ user, callback });

    return (
        <FormProvider methods={methods} onSubmit={methods.handleSubmit(onSubmit)}>
            <TabGenericProvider defaultValue={tabs[0].value}>
                <TabSwitcher
                    tabs={tabs}
                />
            </TabGenericProvider>

            <ActionsButtonsForm
                name="usuario"
                edit={!!user}
                notReload={notReload}
            />

        </FormProvider >
    )
}
