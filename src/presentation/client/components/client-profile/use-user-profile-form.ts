import { useFormContext } from 'react-hook-form';

export const useUserProfileForm = () => {
    const { setValue, watch } = useFormContext();
    const phone = watch("profile.phone");



    const handlePhone = (value: string) => setValue("profile.phone", value);

    return {
        phone,
        handlePhone
    }
}
