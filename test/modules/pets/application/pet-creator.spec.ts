import { petCreator } from '../../../../src/modules/pets/application/create/pet-creator';
import uuid from '../../../../src/modules/shared/infrastructure/adapter/uuid';
import { MessageCreateMother } from '../../shared/domain/response-message.mother';
import { petCreateMother } from "../domain/pet.mother"
import { petServiceMock } from "../domain/pet.service.mock";

describe("PetCreator", () => {

    it("should_successfully_pet_create", async () => {
        const dataForm = petCreateMother();
        const response = { message: MessageCreateMother() }
        petServiceMock.save.mockResolvedValueOnce(response);
        const expected = await petCreator(petServiceMock, uuid)(dataForm)

        expect(expected.response.message).toBe(response.message);
    })

    it("should_successfully_pet_create_to_have_call", async () => {
        const dataForm = petCreateMother();
        const response = { message: MessageCreateMother() }
        petServiceMock.save.mockResolvedValueOnce(response);
        await petCreator(petServiceMock, uuid)(dataForm);

        expect(petServiceMock.save).toHaveBeenCalledWith(dataForm);
    })

    it("should_failed_pet_create", async () => {
        const dataForm = petCreateMother();
        const response = new Error(MessageCreateMother());
        petServiceMock.save.mockRejectedValueOnce(response);
        try {
            await petCreator(petServiceMock, uuid)(dataForm)
            fail("should_failed_pet_create")
        } catch (error) {
            expect(error.message).toBe(response.message)
        }

    })
})