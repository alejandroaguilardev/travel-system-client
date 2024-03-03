import { SubmitHandler } from "react-hook-form";
import { userService } from '../../../../modules/users/infrastructure/user.service';
import { useMessage } from '../../../../hooks/use-message';
import { errorsShowNotification } from '../../../../modules/shared/infrastructure/helpers/errors-show-notification';
import { userProfile } from '../../../../modules/users/application/profile/profile-user';
import { useAuthContext } from '../../../auth/hooks/use-auth-context';
import { ProfileClient } from '../../../../modules/users/domain/user-profile.interface';

type Props = {
    callback: () => void;
}

export const useFormClientProfile = ({ callback }: Props) => {
    const { showNotification } = useMessage();
    const { user, update } = useAuthContext();

    const onSubmit: SubmitHandler<ProfileClient> = async (profile) => {
        try {
            const response = await userProfile(userService)(profile)
            showNotification(response.message);
            if (user) {
                update({
                    ...user,
                    profile: {
                        ...user.profile,
                        phone: profile.phone
                    }
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
