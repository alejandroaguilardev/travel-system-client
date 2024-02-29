import { FC } from "react"
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import FormProvider from '../../../../components/hook-form/form-provider';
import { ActionsButtonsForm } from '../../../../components/hook-form/actions-buttons-form';
import { defaultValues, profileSchema } from "./client-profile-form-validation";
import { ProfileInterface } from '../../../../modules/users/domain/user-profile.interface';
import { useFormClientProfile } from "./use-form-client-profile";
import { UserProfileForm } from "./user-profile-form";

type Props = {
    profile?: ProfileInterface,
    callback: (profile?: ProfileInterface) => void
}

export const ClientProfileForm: FC<Props> = ({ profile, callback }) => {
    const methods = useForm({
        resolver: yupResolver<ProfileInterface>(profileSchema),
        defaultValues: profile ?? defaultValues,
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
