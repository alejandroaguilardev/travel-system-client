import { FC } from "react"
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import FormProvider from '../../../../components/hook-form/form-provider';
import { defaultValues, profileSchema } from "./client-profile-form-validation";
import { useFormClientProfile } from "./use-form-client-profile";
import { UserProfileForm } from "./user-profile-form";
import { ProfileClient } from '../../../../modules/users/domain/user-profile.interface';
import { ActionsButtonsForm } from '../../../../components/hook-form/actions-buttons-form';

type Props = {
    profileClient?: ProfileClient,
    callback: (profile?: ProfileClient) => void
}

export const ClientProfileForm: FC<Props> = ({ profileClient, callback }) => {
    const methods = useForm({
        resolver: yupResolver<ProfileClient>(profileSchema),
        defaultValues: profileClient ?? defaultValues,
    });

    const { onSubmit } = useFormClientProfile({ callback });

    return (
        <FormProvider methods={methods} onSubmit={methods.handleSubmit(onSubmit)}>
            <UserProfileForm />
            <ActionsButtonsForm
                name="perfil"
                edit
                notReload
            />

        </FormProvider >
    )
}
