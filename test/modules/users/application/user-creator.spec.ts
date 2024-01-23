import { userCreator } from '../../../../src/modules/users/application/create/user-creator';
import uuid from '../../../../src/modules/shared/infrastructure/adapter/uuid';
import { MessageCreateMother } from '../../shared/domain/response-message.mother';
import { userCreateMother } from "../domain/user.mother"
import { userServiceMock } from "../domain/user.service.mock";
import { userToNewUser } from '../../../../src/modules/users/domain/user';

describe("UserCreator", () => {

    it("should_successfully_user_create", async () => {
        const userMother = userCreateMother();
        const dataForm = userToNewUser(userMother);
        const response = { message: MessageCreateMother() }
        userServiceMock.save.mockResolvedValueOnce(response);
        const expected = await userCreator(userServiceMock, uuid)(dataForm)

        expect(expected.message).toBe(response.message)
    })

    it("should_successfully_user_create_to_have_call", async () => {
        const userMother = userCreateMother();
        const dataForm = userToNewUser(userMother);
        const response = { message: MessageCreateMother() }
        userServiceMock.save.mockResolvedValueOnce(response);
        await userCreator(userServiceMock, uuid)(dataForm)

        expect(userServiceMock.save).toHaveBeenCalledWith(dataForm)
    })

    it("should_failed_user_create", async () => {
        const userMother = userCreateMother();
        const dataForm = userToNewUser(userMother);
        const response = new Error(MessageCreateMother());
        userServiceMock.save.mockRejectedValueOnce(response);
        try {
            await userCreator(userServiceMock, uuid)(dataForm)
            fail("should_failed_user_create")
        } catch (error) {
            expect(error.message).toBe(response.message)
        }

    })
})