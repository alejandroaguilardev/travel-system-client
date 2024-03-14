import { folderCreator } from '../../../../src/modules/folders/application/create/folder-creator';
import uuid from '../../../../src/modules/shared/infrastructure/adapter/uuid';
import { MessageCreateMother } from '../../shared/domain/response-message.mother';
import { folderCreateMother } from "../domain/folder.mother"
import { folderServiceMock } from "../domain/folder.service.mock";

describe("FolderCreator", () => {

    it("should_successfully_folder_create", async () => {
        const dataForm = folderCreateMother();
        const response = { message: MessageCreateMother() }
        folderServiceMock.save.mockResolvedValueOnce(response);
        const expected = await folderCreator(folderServiceMock, uuid)(dataForm)

        expect(expected.message).toBe(response.message);
    })

    it("should_successfully_folder_create_to_have_call", async () => {
        const dataForm = folderCreateMother();
        const response = { message: MessageCreateMother() }
        folderServiceMock.save.mockResolvedValueOnce(response);
        await folderCreator(folderServiceMock, uuid)(dataForm);

        expect(folderServiceMock.save).toHaveBeenCalledWith(dataForm);
    })

    it("should_failed_folder_create", async () => {
        const dataForm = folderCreateMother();
        const response = new Error(MessageCreateMother());
        folderServiceMock.save.mockRejectedValueOnce(response);
        try {
            await folderCreator(folderServiceMock, uuid)(dataForm)
            fail("should_failed_folder_create")
        } catch (error) {
            expect(error.message).toBe(response.message)
        }

    })
})