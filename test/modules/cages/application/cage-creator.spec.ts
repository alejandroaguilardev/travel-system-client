import { cageCreator } from '../../../../src/modules/cages/application/create/cage-creator';
import uuid from '../../../../src/modules/shared/infrastructure/adapter/uuid';
import { MessageCreateMother } from '../../shared/domain/response-message.mother';
import { cageCreateMother } from "../domain/cage.mother"
import { cageServiceMock } from "../domain/cage.service.mock";

describe("CageCreator", () => {

    it("should_successfully_cage_create", async () => {
        const dataForm = cageCreateMother();
        const response = { message: MessageCreateMother() }
        cageServiceMock.save.mockResolvedValueOnce(response);
        const expected = await cageCreator(cageServiceMock, uuid)(dataForm)

        expect(expected.message).toBe(response.message);
    })

    it("should_successfully_cage_create_to_have_call", async () => {
        const dataForm = cageCreateMother();
        const response = { message: MessageCreateMother() }
        cageServiceMock.save.mockResolvedValueOnce(response);
        await cageCreator(cageServiceMock, uuid)(dataForm);

        expect(cageServiceMock.save).toHaveBeenCalledWith(dataForm);
    })

    it("should_failed_cage_create", async () => {
        const dataForm = cageCreateMother();
        const response = new Error(MessageCreateMother());
        cageServiceMock.save.mockRejectedValueOnce(response);
        try {
            await cageCreator(cageServiceMock, uuid)(dataForm)
            fail("should_failed_cage_create")
        } catch (error) {
            expect(error.message).toBe(response.message)
        }

    })
})