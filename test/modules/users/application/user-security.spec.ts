import uuid from '../../../../src/modules/shared/infrastructure/adapter/uuid';
import { MessageCreateMother } from '../../shared/domain/response-message.mother';
import { userCreateMother } from "../domain/user.mother"
import { userServiceMock } from "../domain/user.service.mock";
import { userToNewUser } from '../../../../src/modules/users/domain/user';
import { userSecurity } from '../../../../src/modules/users/application/security/profile-security';
import { passwordCreatedMother } from '../domain/password.mother';

describe("UserSecurity", () => {

    it("should_successfully_user_security", async () => {
        const password = passwordCreatedMother();
        const newPassword = passwordCreatedMother();
        const response = { message: MessageCreateMother() }
        userServiceMock.updatePassword.mockResolvedValueOnce(response);
        const expected = await userSecurity(userServiceMock)(password, newPassword)

        expect(expected.message).toBe(response.message)
    })

    it("should_successfully_user_security_to_have_call", async () => {
        const password = passwordCreatedMother();
        const newPassword = passwordCreatedMother();
        const response = { message: MessageCreateMother() }
        userServiceMock.updatePassword.mockResolvedValueOnce(response);
        await userSecurity(userServiceMock)(password, newPassword)

        expect(userServiceMock.updatePassword).toHaveBeenCalledWith(password, newPassword)
    })

    it("should_failed_user_security", async () => {
        const password = passwordCreatedMother();
        const newPassword = passwordCreatedMother();
        const response = new Error(MessageCreateMother());
        userServiceMock.updatePassword.mockRejectedValueOnce(response);
        try {
            await userSecurity(userServiceMock)(password, newPassword)
            fail("should_failed_user_security")
        } catch (error) {
            expect(error.message).toBe(response.message)
        }

    })
})