import { useFormContext } from 'react-hook-form';
import { NewUser } from '../../../../modules/users/domain/user';

export const useUserProfileForm = () => {
    const { setValue, watch, formState } = useFormContext<NewUser>();
    const phone = watch("profile.phone");
    const phoneError = formState.errors.profile?.phone?.message ?? "";

    const handlePhone = (value: string) => setValue("profile.phone", value);

    return {
        phone,
        phoneError,
        handlePhone
    }
}
