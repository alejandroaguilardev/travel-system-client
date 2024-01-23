import { act, fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import { ContractForm } from "../../../src/presentation/contracts/components/form/contract-form";
import { contractCreateMother } from '../../modules/contracts/domain/contract.mother';
import * as hooks from "../../../src/presentation/contracts/components/form/use-form-new-contract";
import RHFTextField from '../../../src/components/hook-form/rhf-text-field';

jest.mock('../../../src/modules/contracts/infrastructure/contract.service');

jest.mock('../../../src/components/autocomplete/selector/autocomplete-server', () => ({
    AutocompleteServer: jest.fn(() => {
        return (
            <RHFTextField
                name='client'
                label="cliente"
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

        const vaccinationSwitch = screen.getByLabelText('Certificado de vacuna');
        const healthSwitch = screen.getByLabelText('Certificado de salud');
        const chipSwitch = screen.getByLabelText('Certificado de chip');
        const senasaSwitch = screen.getByLabelText('Documentos de SENASA');
        const rabiesSwitch = screen.getByLabelText('Test serológico de rabia');
        const importSwitch = screen.getByLabelText('Permiso de importación');
        const emotionalSwitch = screen.getByLabelText('Certificado de soporte emocional');

        const cageSwitch = screen.getByLabelText('Incluye Jaula Pet travel');

        expect(numberField).toBeInTheDocument();
        expect(startDateField).toBeInTheDocument();

        expect(vaccinationSwitch).toBeInTheDocument();
        expect(healthSwitch).toBeInTheDocument();
        expect(chipSwitch).toBeInTheDocument();
        expect(senasaSwitch).toBeInTheDocument();
        expect(rabiesSwitch).toBeInTheDocument();
        expect(importSwitch).toBeInTheDocument();
        expect(emotionalSwitch).toBeInTheDocument();
        expect(cageSwitch).toBeInTheDocument();

    });

    it("allows_input_changes_in_contract_form", () => {
        render(
            <MemoryRouter>
                <ContractForm callback={callback} />
            </MemoryRouter>
        );
        const data = contractCreateMother();

        const numberField = screen.getByLabelText('Número de contrato (*)') as HTMLInputElement;
        const clientField = screen.getByLabelText('cliente') as HTMLInputElement;



        fireEvent.change(numberField, { target: { value: data.number } });
        fireEvent.change(clientField, { target: { value: data.client } });

        expect(numberField.value).toBe(data.number);
        expect(clientField.value).toBe(data.client);
    });


    it("submits_contract_form_with_valid_data", async () => {
        const data = contractCreateMother();

        const onSubmit = jest.fn();
        jest.spyOn(hooks, 'useFormContract').mockImplementation(() => ({ onSubmit }));

        render(
            <MemoryRouter>
                <ContractForm callback={callback} />
            </MemoryRouter>
        );

        const numberField = screen.getByLabelText('Número de contrato (*)');
        const clientField = screen.getByLabelText('cliente') as HTMLInputElement;


        await act(async () => {

            fireEvent.change(numberField, { target: { value: data.number } });
            fireEvent.change(clientField, { target: { value: data.client } });
            const form = screen.getByRole("form");

            fireEvent.submit(form);

        });
        expect(onSubmit).toHaveBeenCalledTimes(1);
    });

});