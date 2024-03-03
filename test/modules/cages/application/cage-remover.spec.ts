import { cageRemover } from '../../../../src/modules/cages/application/remove/cage-remover';
import { uuidCreateMother } from '../../shared/domain/uuid.mother';
import { stringCreateMother } from '../../shared/domain/string.mother';
import uuid from '../../../../src/modules/shared/infrastructure/adapter/uuid';
import { MessageCreateMother } from '../../shared/domain/response-message.mother';
import { cageServiceMock } from "../domain/cage.service.mock";

describe("CageCreator", () => {

    it("should_successfully_cage_remove", async () => {
        const id = uuidCreateMother();
        const response = { message: MessageCreateMother() }
        cageServiceMock.remove.mockResolvedValueOnce(response);
        const expected = await cageRemover(cageServiceMock, uuid)(id)

        expect(expected.message).toBe(response.message)
    })

    it("should_successfully_cage_remove_to_have_call", async () => {
        const id = uuidCreateMother();
        const response = { message: MessageCreateMother() }
        cageServiceMock.remove.mockResolvedValueOnce(response);
        await cageRemover(cageServiceMock, uuid)(id)

        expect(cageServiceMock.remove).toHaveBeenCalledWith(id)
    })

    it("should_failed_cage_remove", async () => {
        const id = stringCreateMother();
        const response = new Error("el identificador no es válido");
        cageServiceMock.remove.mockRejectedValueOnce(response);
        try {
            await cageRemover(cageServiceMock, uuid)(id)
            fail("should_failed_cage_remove")
        } catch (error) {
            expect(error.message).toBe(response.message)
        }

    })
})