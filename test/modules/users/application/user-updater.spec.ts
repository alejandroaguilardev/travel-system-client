import { userUpdater } from '../../../../src/modules/users/application/update/user-updater';
import { userToNewUser } from '../../../../src/modules/users/domain/user';
import uuid from '../../../../src/modules/shared/infrastructure/adapter/uuid';
import { uuidCreateMother } from '../../shared/domain/uuid.mother';
import { stringCreateMother } from '../../shared/domain/string.mother';
import { MessageCreateMother } from '../../shared/domain/response-message.mother';
import { userCreateMother } from "../domain/user.mother"
import { userServiceMock } from "../domain/user.service.mock";

describe("UserUpdater", () => {

    it("should_successfully_user_update", async () => {
        const userMother = userCreateMother();
        const dataForm = userToNewUser(userMother);
        const id = uuidCreateMother();
        const response = { message: MessageCreateMother() }
        userServiceMock.update.mockResolvedValueOnce(response);
        const expected = await userUpdater(userServiceMock, uuid)(id, dataForm)

        expect(expected.response.message).toBe(response.message)
    })

    it("should_successfully_user_update_to_have_call", async () => {
        const userMother = userCreateMother();
        const dataForm = userToNewUser(userMother);
        const id = uuidCreateMother();
        const response = { message: MessageCreateMother() }
        userServiceMock.save.mockResolvedValueOnce(response);
        await userUpdater(userServiceMock, uuid)(id, dataForm)
        expect(userServiceMock.update).toHaveBeenCalledWith(id, dataForm)
    })

    it("should_failed_user_update", async () => {
        const userMother = userCreateMother();
        const dataForm = userToNewUser(userMother);
        const id = stringCreateMother();
        const response = new Error("el identificador no es válido");
        userServiceMock.update.mockRejectedValueOnce(response);
        try {
            await userUpdater(userServiceMock, uuid)(id, dataForm);
            fail("should_failed_user_update")
        } catch (error) {
            expect(error.message).toBe(response.message)
        }

    })
})