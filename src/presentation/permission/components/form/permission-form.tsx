import { FC } from "react"
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import FormProvider from '../../../../components/hook-form/form-provider';
import { TabGenericProvider, TabSwitcher } from '../../../../components/tab-generic';
import { NewPermission, Permission } from '../../../../modules/permissions/domain/permission';
import { useFormPermission } from "./use-form-permission";
import { tabs } from "./tabs";
import { ActionsButtonsForm } from '../../../../components/hook-form/actions-buttons-form';
import { defaultValues, permissionSchema } from "./permission-validations";

type Props = {
    permission?: Permission;
    callback: () => void
}

export const PermissionForm: FC<Props> = ({ permission, callback }) => {
    const methods = useForm({
        resolver: yupResolver<NewPermission>(permissionSchema),
        defaultValues: permission ?? defaultValues,
    });

    const { onSubmit } = useFormPermission({ permission, callback });

    return (
        <FormProvider methods={methods} onSubmit={methods.handleSubmit(onSubmit)}>
            <TabGenericProvider defaultValue={tabs[0].value}>
                <TabSwitcher
                    tabs={tabs}
                />
            </TabGenericProvider>

            <ActionsButtonsForm
                name="Permiso"
                edit={!!permission}
            />

        </FormProvider >
    )
}
