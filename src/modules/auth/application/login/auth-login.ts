import { AuthService } from '../../domain/auth.service';
import { User } from '../../../users/domain/user';

export const authLogin = (authService: AuthService, manageAccessToken: (token: string) => void) => {
    return async (email: string, password: string, tokenReCaptcha: string): Promise<User> => {
        const { token, user } = await authService.login(email, password, tokenReCaptcha);
        manageAccessToken(token);

        user.roles = user.roles?.[0]?.id ? user.roles : [];
        return user;
    }
}