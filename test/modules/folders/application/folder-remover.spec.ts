import { folderRemover } from '../../../../src/modules/folders/application/remove/folder-remover';
import { uuidCreateMother } from '../../shared/domain/uuid.mother';
import { stringCreateMother } from '../../shared/domain/string.mother';
import uuid from '../../../../src/modules/shared/infrastructure/adapter/uuid';
import { MessageCreateMother } from '../../shared/domain/response-message.mother';
import { folderServiceMock } from "../domain/folder.service.mock";

describe("FolderCreator", () => {

    it("should_successfully_folder_remove", async () => {
        const id = uuidCreateMother();
        const response = { message: MessageCreateMother() }
        folderServiceMock.remove.mockResolvedValueOnce(response);
        const expected = await folderRemover(folderServiceMock, uuid)(id)

        expect(expected.message).toBe(response.message)
    })

    it("should_successfully_folder_remove_to_have_call", async () => {
        const id = uuidCreateMother();
        const response = { message: MessageCreateMother() }
        folderServiceMock.remove.mockResolvedValueOnce(response);
        await folderRemover(folderServiceMock, uuid)(id)

        expect(folderServiceMock.remove).toHaveBeenCalledWith(id)
    })

    it("should_failed_folder_remove", async () => {
        const id = stringCreateMother();
        const response = new Error("el identificador no es válido");
        folderServiceMock.remove.mockRejectedValueOnce(response);
        try {
            await folderRemover(folderServiceMock, uuid)(id)
            fail("should_failed_folder_remove")
        } catch (error) {
            expect(error.message).toBe(response.message)
        }

    })
})