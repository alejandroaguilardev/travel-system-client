import { folderUpdater } from '../../../../src/modules/folders/application/update/folder-updater';
import { uuidCreateMother } from '../../shared/domain/uuid.mother';
import { stringCreateMother } from '../../shared/domain/string.mother';
import uuid from '../../../../src/modules/shared/infrastructure/adapter/uuid';
import { MessageCreateMother } from '../../shared/domain/response-message.mother';
import { folderCreateMother } from "../domain/folder.mother"
import { folderServiceMock } from "../domain/folder.service.mock";

describe("FolderUpdater", () => {

    it("should_successfully_folder_update", async () => {
        const dataForm = folderCreateMother();
        const id = uuidCreateMother();
        const response = { message: MessageCreateMother() }
        folderServiceMock.update.mockResolvedValueOnce(response);
        const expected = await folderUpdater(folderServiceMock, uuid)(id, dataForm)

        expect(expected.message).toBe(response.message)
    })

    it("should_successfully_folder_update_to_have_call", async () => {
        const dataForm = folderCreateMother();
        const id = uuidCreateMother();
        const response = { message: MessageCreateMother() }
        folderServiceMock.save.mockResolvedValueOnce(response);
        await folderUpdater(folderServiceMock, uuid)(id, dataForm)
        expect(folderServiceMock.update).toHaveBeenCalledWith(id, dataForm)
    })

    it("should_failed_folder_update", async () => {
        const dataForm = folderCreateMother();
        const id = stringCreateMother();
        const response = new Error("el identificador no es válido");
        folderServiceMock.update.mockRejectedValueOnce(response);
        try {
            await folderUpdater(folderServiceMock, uuid)(id, dataForm);
            fail("should_failed_folder_update")
        } catch (error) {
            expect(error.message).toBe(response.message)
        }

    })
})