import { userRemover } from '../../../../src/modules/users/application/remove/user-remover';
import { uuidCreateMother } from '../../shared/domain/uuid.mother';
import { stringCreateMother } from '../../shared/domain/string.mother';
import uuid from '../../../../src/modules/shared/infrastructure/adapter/uuid';
import { MessageCreateMother } from '../../shared/domain/response-message.mother';
import { userServiceMock } from "../domain/user.service.mock";

describe("UserCreator", () => {

    it("should_successfully_user_remove", async () => {
        const id = uuidCreateMother();
        const response = { message: MessageCreateMother() }
        userServiceMock.remove.mockResolvedValueOnce(response);
        const expected = await userRemover(userServiceMock, uuid)(id)

        expect(expected.message).toBe(response.message)
    })

    it("should_successfully_user_remove_to_have_call", async () => {
        const id = uuidCreateMother();
        const response = { message: MessageCreateMother() }
        userServiceMock.remove.mockResolvedValueOnce(response);
        await userRemover(userServiceMock, uuid)(id)

        expect(userServiceMock.remove).toHaveBeenCalledWith(id)
    })

    it("should_failed_user_remove", async () => {
        const id = stringCreateMother();
        const response = new Error("el identificador no es válido");
        userServiceMock.remove.mockRejectedValueOnce(response);
        try {
            await userRemover(userServiceMock, uuid)(id)
            fail("should_failed_user_remove")
        } catch (error) {
            expect(error.message).toBe(response.message)
        }

    })
})