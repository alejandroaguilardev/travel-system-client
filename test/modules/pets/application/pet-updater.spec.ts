import { petUpdater } from '../../../../src/modules/pets/application/update/pet-updater';
import { uuidCreateMother } from '../../shared/domain/uuid.mother';
import { stringCreateMother } from '../../shared/domain/string.mother';
import uuid from '../../../../src/modules/shared/infrastructure/adapter/uuid';
import { MessageCreateMother } from '../../shared/domain/response-message.mother';
import { petCreateMother } from "../domain/pet.mother"
import { petServiceMock } from "../domain/pet.service.mock";

describe("PetUpdater", () => {

    it("should_successfully_pet_update", async () => {
        const dataForm = petCreateMother();
        const id = uuidCreateMother();
        const response = { message: MessageCreateMother() }
        petServiceMock.update.mockResolvedValueOnce(response);
        const expected = await petUpdater(petServiceMock, uuid)(id, dataForm)

        expect(expected.response.message).toBe(response.message)
    })

    it("should_successfully_pet_update_to_have_call", async () => {
        const dataForm = petCreateMother();
        const id = uuidCreateMother();
        const response = { message: MessageCreateMother() }
        petServiceMock.save.mockResolvedValueOnce(response);
        await petUpdater(petServiceMock, uuid)(id, dataForm)
        expect(petServiceMock.update).toHaveBeenCalledWith(id, dataForm)
    })

    it("should_failed_pet_update", async () => {
        const dataForm = petCreateMother();
        const id = stringCreateMother();
        const response = new Error("el identificador no es válido");
        petServiceMock.update.mockRejectedValueOnce(response);
        try {
            await petUpdater(petServiceMock, uuid)(id, dataForm);
            fail("should_failed_pet_update")
        } catch (error) {
            expect(error.message).toBe(response.message)
        }

    })
})