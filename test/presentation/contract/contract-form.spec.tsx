import { fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import { ContractForm } from "../../../src/presentation/contracts/components/form/contract-form";
import { contractCreateMother } from '../../modules/contracts/domain/contract.mother';
import RHFTextField from '../../../src/components/hook-form/rhf-text-field';

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
        render(
            <MemoryRouter>
                <ContractForm callback={callback} />
            </MemoryRouter>
        );

        const numberField = screen.getByLabelText('Número de contrato (*)');
        const startDateField = screen.getByLabelText('Fecha de contrato (*)');

        expect(numberField).toBeInTheDocument();
        expect(startDateField).toBeInTheDocument();

    });

    it("allows_input_changes_in_contract_form", () => {
        render(
            <MemoryRouter>
                <ContractForm callback={callback} />
            </MemoryRouter>
        );
        const data = contractCreateMother();

        const numberField = screen.getByLabelText('Número de contrato (*)') as HTMLInputElement;

        fireEvent.change(numberField, { target: { value: data.number } });

        expect(numberField.value).toBe(data.number);
    });



});