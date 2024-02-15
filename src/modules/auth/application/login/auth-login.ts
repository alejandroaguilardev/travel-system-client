import { AuthService } from '../../domain/auth.service';
import { User } from '../../../users/domain/user';

export const authLogin = (authService: AuthService, manageAccessToken: (token: string) => void) => {
    return async (email: string, password: string): Promise<User> => {
        const { token, user } = await authService.login(email, password);
        manageAccessToken(token);

        console.log(user)
        user.roles = user.roles?.[0]?.id ? user.roles : [];
        console.log(user)
        return user;
    }
}