import { contractCreator, contractCreatorFormat } from '../../../../src/modules/contracts/application/create/contract-creator';
import uuid from '../../../../src/modules/shared/infrastructure/adapter/uuid';
import { MessageCreateMother } from '../../shared/domain/response-message.mother';
import { contractCreateMother } from "../domain/contract.mother"
import { contractServiceMock } from "../domain/contract.service.mock";

describe("ContractCreator", () => {

    it("should_successfully_contract_create", async () => {
        const dataForm = contractCreateMother();
        const response = { message: MessageCreateMother() }
        contractServiceMock.save.mockResolvedValueOnce(response);
        const expected = await contractCreator(contractServiceMock, uuid)(dataForm)

        expect(expected.message).toBe(response.message)
    })

    it("should_successfully_contract_create_to_have_call", async () => {
        const dataForm = contractCreateMother();
        const response = { message: MessageCreateMother() }
        contractServiceMock.save.mockResolvedValueOnce(response);
        await contractCreator(contractServiceMock, uuid)(dataForm)

        expect(contractServiceMock.save).toHaveBeenCalledWith(contractCreatorFormat(dataForm, uuid))
    })

    it("should_failed_contract_create", async () => {
        const dataForm = contractCreateMother();
        const response = new Error(MessageCreateMother());
        contractServiceMock.save.mockRejectedValueOnce(response);
        try {
            await contractCreator(contractServiceMock, uuid)(dataForm)
            fail("should_failed_contract_create")
        } catch (error) {
            expect(error.message).toBe(response.message)
        }

    })
})