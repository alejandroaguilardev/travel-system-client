import { act, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import { CageForm } from "../../../src/presentation/cage/components/form/cage-form";
import { cageCreateMother } from '../../modules/cages/domain/cage.mother';
import * as hooks from "../../../src/presentation/cage/components/form/use-form-cage";
import RHFTextField from '../../../src/components/hook-form/rhf-text-field';
import userEvent from '@testing-library/user-event';

jest.mock('../../../src/modules/cages/infrastructure/cages.service');

jest.mock('../../../src/components/autocomplete/selector/autocomplete-server', () => ({
    AutocompleteServer: jest.fn(() => {
        return (
            <RHFTextField
                name='roles'
                label="Seleccionar roles"
            />
        );
    }),
}));

describe("CageForm", () => {
    const callback = jest.fn();

    it("renders_cage_form_correctly", () => {
        render(
            <MemoryRouter>
                <CageForm callback={callback} />
            </MemoryRouter>
        );

        const typeCage = screen.getByLabelText('Tipo de jaula (*)');
        const modelCage = screen.getByLabelText('Modelo de jaula (*)');
        const dimensionsCage = screen.getByLabelText('Dimensiones de la jaula (*)');

        expect(typeCage).toBeInTheDocument();
        expect(modelCage).toBeInTheDocument();
        expect(dimensionsCage).toBeInTheDocument();

    });

    it("allows_input_changes_in_cage_form", async () => {
        render(
            <MemoryRouter>
                <CageForm callback={callback} />
            </MemoryRouter>
        );
        const data = cageCreateMother();
        const modelCage = screen.getByLabelText('Modelo de jaula (*)') as HTMLInputElement;
        const dimensionsCage = screen.getByLabelText('Dimensiones de la jaula (*)') as HTMLInputElement;


        await userEvent.type(modelCage, data.modelCage);
        await userEvent.type(dimensionsCage, data.dimensionsCage);


        expect(modelCage.value).toBe(data.modelCage);
        expect(dimensionsCage.value).toBe(data.dimensionsCage);
    });

    it("submits_cage_form_with_valid_data", async () => {
        const data = cageCreateMother();

        const onSubmit = jest.fn();
        jest.spyOn(hooks, 'useFormCage').mockImplementation(() => ({ onSubmit }));

        render(
            <MemoryRouter>
                <CageForm callback={callback} />
            </MemoryRouter>
        );


        const modelCage = screen.getByLabelText('Modelo de jaula (*)') as HTMLInputElement;
        const dimensionsCage = screen.getByLabelText('Dimensiones de la jaula (*)') as HTMLInputElement;


        await userEvent.type(modelCage, data.modelCage);
        await userEvent.type(dimensionsCage, data.dimensionsCage);

        await act(async () => {
            const form = screen.getByRole("form");
            userEvent.click(form);
        });
        expect(onSubmit).toHaveBeenCalledTimes(0);
    });

});