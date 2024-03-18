import { fireEvent, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { renderCustom } from "../shared/renderCustom";
import { ContractForm } from "../../../src/presentation/contracts/components/form/contract-form";
import { contractCreateMother } from '../../modules/contracts/domain/contract.mother';
import RHFTextField from '../../../src/components/hook-form/rhf-text-field';
import { fDate } from "../../../src/modules/shared/infrastructure/helpers/format-time";

jest.mock('../../../src/modules/contracts/infrastructure/contract.service');

jest.mock('../../../src/components/autocomplete/selector/autocomplete-server', () => ({
    AutocompleteServer: jest.fn(() => {
        return (
            <RHFTextField
                name='client'
                label="cliente_label"
            />
        );
    }),
}));


describe("ContractForm", () => {
    const callback = jest.fn();

    it("renders_contract_form_correctly", () => {
        renderCustom(
            <ContractForm callback={callback} />
        );

        const startDateField = screen.getByLabelText('Fecha de contrato (*)');

        expect(startDateField).toBeInTheDocument();

    });

    it("allows_input_changes_in_contract_form", () => {
        renderCustom(
            <ContractForm callback={callback} />
        );
        const { startDate } = contractCreateMother();

        const startDateField = screen.getByLabelText('Fecha de contrato (*)') as HTMLInputElement;

        userEvent.click(startDateField);
        userEvent.type(startDateField, fDate(startDate));

        expect(startDateField.value).toBe(fDate(startDate, 'DD/MM/YYYY'));
    });



});