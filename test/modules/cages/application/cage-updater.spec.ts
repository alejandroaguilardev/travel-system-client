import { cageUpdater } from '../../../../src/modules/cages/application/update/cage-updater';
import { uuidCreateMother } from '../../shared/domain/uuid.mother';
import { stringCreateMother } from '../../shared/domain/string.mother';
import uuid from '../../../../src/modules/shared/infrastructure/adapter/uuid';
import { MessageCreateMother } from '../../shared/domain/response-message.mother';
import { cageCreateMother } from "../domain/cage.mother"
import { cageServiceMock } from "../domain/cage.service.mock";

describe("CageUpdater", () => {

    it("should_successfully_cage_update", async () => {
        const dataForm = cageCreateMother();
        const id = uuidCreateMother();
        const response = { message: MessageCreateMother() }
        cageServiceMock.update.mockResolvedValueOnce(response);
        const expected = await cageUpdater(cageServiceMock, uuid)(id, dataForm)

        expect(expected.message).toBe(response.message)
    })

    it("should_successfully_cage_update_to_have_call", async () => {
        const dataForm = cageCreateMother();
        const id = uuidCreateMother();
        const response = { message: MessageCreateMother() }
        cageServiceMock.save.mockResolvedValueOnce(response);
        await cageUpdater(cageServiceMock, uuid)(id, dataForm)
        expect(cageServiceMock.update).toHaveBeenCalledWith(id, dataForm)
    })

    it("should_failed_cage_update", async () => {
        const dataForm = cageCreateMother();
        const id = stringCreateMother();
        const response = new Error("el identificador no es válido");
        cageServiceMock.update.mockRejectedValueOnce(response);
        try {
            await cageUpdater(cageServiceMock, uuid)(id, dataForm);
            fail("should_failed_cage_update")
        } catch (error) {
            expect(error.message).toBe(response.message)
        }

    })
})