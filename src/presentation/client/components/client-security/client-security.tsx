import { FC } from "react"
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import FormProvider from '../../../../components/hook-form/form-provider';
import { ActionsButtonsForm } from '../../../../components/hook-form/actions-buttons-form';
import { ChangePasswordSchema, changePasswordSchema, defaultValues } from './client-security-form-validation';
import { useFormClientSecurity } from "./use-form-security";
import { ClientSecurityFormGeneral } from "./client-security-form-general";


type Props = {
    callback: () => void
}

export const ClientSecurityForm: FC<Props> = ({ callback }) => {
    const methods = useForm({
        resolver: yupResolver<ChangePasswordSchema>(changePasswordSchema),
        defaultValues: defaultValues,
    });

    const { onSubmit } = useFormClientSecurity({ callback });

    return (
        <FormProvider methods={methods} onSubmit={methods.handleSubmit(onSubmit)}>
            <ClientSecurityFormGeneral />

            <ActionsButtonsForm
                name="contraseña"
                edit
                notReload
            />
        </FormProvider >
    )
}
