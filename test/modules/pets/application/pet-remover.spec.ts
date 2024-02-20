import { petRemover } from '../../../../src/modules/pets/application/remove/pet-remover';
import { uuidCreateMother } from '../../shared/domain/uuid.mother';
import { stringCreateMother } from '../../shared/domain/string.mother';
import uuid from '../../../../src/modules/shared/infrastructure/adapter/uuid';
import { MessageCreateMother } from '../../shared/domain/response-message.mother';
import { petServiceMock } from "../domain/pet.service.mock";

describe("PetCreator", () => {

    it("should_successfully_pet_remove", async () => {
        const id = uuidCreateMother();
        const response = { message: MessageCreateMother() }
        petServiceMock.remove.mockResolvedValueOnce(response);
        const expected = await petRemover(petServiceMock, uuid)(id)

        expect(expected.message).toBe(response.message)
    })

    it("should_successfully_pet_remove_to_have_call", async () => {
        const id = uuidCreateMother();
        const response = { message: MessageCreateMother() }
        petServiceMock.remove.mockResolvedValueOnce(response);
        await petRemover(petServiceMock, uuid)(id)

        expect(petServiceMock.remove).toHaveBeenCalledWith(id)
    })

    it("should_failed_pet_remove", async () => {
        const id = stringCreateMother();
        const response = new Error("el identificador no es válido");
        petServiceMock.remove.mockRejectedValueOnce(response);
        try {
            await petRemover(petServiceMock, uuid)(id)
            fail("should_failed_pet_remove")
        } catch (error) {
            expect(error.message).toBe(response.message)
        }

    })
})