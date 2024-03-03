import { authLogin } from '../../../../src/modules/auth/application/login/auth-login';
import { userCreateMother } from '../../users/domain/user.mother';
import { tokenCreateMother } from '../../shared/domain/token.mother';
import { passwordCreatedMother } from '../../users/domain/password.mother';

describe('authLogin', () => {
    const authServiceMock = {
        login: jest.fn(),
        verify: jest.fn(),
        recover: jest.fn(),
        resetPassword: jest.fn(),

    }

    const manageAccessToken = jest.fn();

    it('should_successfully_login_credentials', async () => {
        const userNotPassword = userCreateMother();
        const password = passwordCreatedMother();
        const tokenMother = tokenCreateMother();
        authServiceMock.login.mockResolvedValueOnce({ token: tokenMother, user: userNotPassword });
        const user = await authLogin(authServiceMock, manageAccessToken)(userNotPassword.email, password);

        expect(user).toEqual(userNotPassword);
    });

    it('should_failed_login_credentials', async () => {
        const userNotPassword = userCreateMother();
        const password = passwordCreatedMother();
        const error = { "message": "El email es incorrecto" }
        authServiceMock.login.mockRejectedValueOnce(error);
        try {
            await authLogin(authServiceMock, manageAccessToken)(userNotPassword.email, password);
            fail('should_failed_login_credentials');
        } catch (throwError) {
            expect(throwError.message).toBe(error.message)
        }
    })
})