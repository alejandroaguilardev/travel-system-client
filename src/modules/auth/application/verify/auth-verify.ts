import { isValidToken } from '../../domain/auth-token';
import { AuthService } from '../../domain/auth.service';
import { ErrorUnauthorized } from '../../../shared/domain/errors/error-unauthorized';
import { User } from '../../../users/domain/user';


export const authVerify = (authService: AuthService, manageAccessToken: (token: string) => void) => {
    return async (accessToken: string | null): Promise<User> => {
        if (!isValidToken(accessToken)) {
            throw new ErrorUnauthorized("El token de sesión no es valido o ha caducado")
        }

        const { token, user } = await authService.verify();
        manageAccessToken(token)
        user.roles = user.roles?.[0]?.id ? user.roles : [];
        return user;
    }
}