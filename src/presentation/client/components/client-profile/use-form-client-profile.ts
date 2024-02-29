import { SubmitHandler } from "react-hook-form";
import { userService } from '../../../../modules/users/infrastructure/user.service';
import { useMessage } from '../../../../hooks/use-message';
import { errorsShowNotification } from '../../../../modules/shared/infrastructure/helpers/errors-show-notification';
import { ProfileInterface } from '../../../../modules/users/domain/user-profile.interface';
import { userProfile } from '../../../../modules/users/application/profile/profile-user';
import { useAuthContext } from '../../../auth/hooks/use-auth-context';

type Props = {
    callback: () => void;
}

export const useFormClientProfile = ({ callback }: Props) => {
    const { showNotification } = useMessage();
    const { user, update } = useAuthContext();

    const onSubmit: SubmitHandler<ProfileInterface> = async (profile) => {
        try {
            const response = await userProfile(userService)(profile)
            showNotification(response.message);
            if (user) {
                update({
                    ...user,
                    profile
                })
            }
            callback();
        } catch (error) {
            errorsShowNotification(error, showNotification)
        }
    };

    return {
        onSubmit,
    }
}
