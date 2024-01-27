import { useState, useEffect } from 'react';
import { userService } from '../../../modules/users/infrastructure/user.service';
import { User } from '../../../modules/users/domain/user';

export const useSearchByIdUser = (userId: string) => {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchData = async () => {
        setIsLoading(true);
        setError(null);

        try {
            const response = await userService.searchById<User>(userId);
            setUser(response);
        } catch (error) {
            setUser(null)
            setError(error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, [userId]);

    const handleRefetch = () => {
        fetchData();
    };

    return {
        user,
        isLoading,
        error,
        handleRefetch
    };
};
