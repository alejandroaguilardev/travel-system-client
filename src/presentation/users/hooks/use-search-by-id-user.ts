import useSWR from "swr";
import { endpoints } from '../../../modules/shared/domain/endpoint';
import { userService } from '../../../modules/users/infrastructure/user.service';
import { User } from '../../../modules/users/domain/user';

export const useSearchByIdUser = (userId: string) => {
    const { data, error, isLoading, mutate } = useSWR([endpoints.users, userId], () => userService.searchById<User>(userId)
    )

    const handleRefetch = () => mutate();
    return {
        user: data,
        isLoading,
        error,
        handleRefetch
    }
}
