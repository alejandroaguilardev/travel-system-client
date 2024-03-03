import { contractRemover } from '../../../../src/modules/contracts/application/remove/contract-remover';
import { uuidCreateMother } from '../../shared/domain/uuid.mother';
import { stringCreateMother } from '../../shared/domain/string.mother';
import uuid from '../../../../src/modules/shared/infrastructure/adapter/uuid';
import { MessageCreateMother } from '../../shared/domain/response-message.mother';
import { contractServiceMock } from "../domain/contract.service.mock";

describe("ContractDelete", () => {

    it("should_successfully_contract_remove", async () => {
        const id = uuidCreateMother();
        const response = { message: MessageCreateMother() }
        contractServiceMock.remove.mockResolvedValueOnce(response);
        const expected = await contractRemover(contractServiceMock, uuid)(id)

        expect(expected.message).toBe(response.message)
    })

    it("should_successfully_contract_remove_to_have_call", async () => {
        const id = uuidCreateMother();
        const response = { message: MessageCreateMother() }
        contractServiceMock.remove.mockResolvedValueOnce(response);
        await contractRemover(contractServiceMock, uuid)(id)

        expect(contractServiceMock.remove).toHaveBeenCalledWith(id)
    })

    it("should_failed_contract_remove", async () => {
        const id = stringCreateMother();
        const response = new Error("el identificador no es válido");
        contractServiceMock.remove.mockRejectedValueOnce(response);
        try {
            await contractRemover(contractServiceMock, uuid)(id)
            fail("should_failed_contract_remove")
        } catch (error) {
            expect(error.message).toBe(response.message)
        }

    })
})