import { act, fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import { PetForm } from "../../../src/presentation/pets/components/form/pet-form";
import { petCreateMother } from '../../modules/pets/domain/pet.mother';
import * as hooks from "../../../src/presentation/pets/components/form/use-form-pet";
import RHFTextField from '../../../src/components/hook-form/rhf-text-field';
import { fDate, fDayjs } from '../../../src/modules/shared/infrastructure/helpers/format-time';
import userEvent from "@testing-library/user-event";

jest.mock('../../../src/modules/pets/infrastructure/pets.service');
jest.mock('../../../src/modules/users/infrastructure/user.service');

jest.mock('../../../src/components/autocomplete/selector/autocomplete-server', () => ({
    AutocompleteServer: jest.fn(() => {
        return (
            <RHFTextField
                name='adopter'
                label="cliente"
            />
        );
    }),
}));


describe("PetForm", () => {
    const callback = jest.fn();

    it("renders_pet_form_correctly", () => {
        render(
            <MemoryRouter>
                <PetForm callback={callback} />
            </MemoryRouter>
        );

        const name = screen.getByLabelText('Nombre (*)');
        const birthDate = screen.getByLabelText('Fecha de nacimiento (*)');
        const type = screen.getByLabelText('Especie (*)');
        const race = screen.getByLabelText('Raza (*)');
        const chip = screen.getByLabelText('Chip');
        const color = screen.getByLabelText('Color (*)');
        const gender = screen.getByLabelText('Sexo (*)');
        const sterilized = screen.getByLabelText('Esterilizado (*)');

        expect(name).toBeInTheDocument();
        expect(birthDate).toBeInTheDocument();
        expect(type).toBeInTheDocument();
        expect(race).toBeInTheDocument();
        expect(chip).toBeInTheDocument();
        expect(color).toBeInTheDocument();
        expect(gender).toBeInTheDocument();
        expect(sterilized).toBeInTheDocument();

    });

    it("allows_input_changes_in_pet_form", async () => {
        render(
            <MemoryRouter>
                <PetForm callback={callback} />
            </MemoryRouter>
        );
        const data = petCreateMother();

        const name = screen.getByLabelText('Nombre (*)') as HTMLInputElement;
        const birthDate = screen.getByLabelText('Fecha de nacimiento (*)') as HTMLInputElement;
        const race = screen.getByLabelText('Raza (*)') as HTMLInputElement;
        const chip = screen.getByLabelText('Chip') as HTMLInputElement;
        const color = screen.getByLabelText('Color (*)') as HTMLInputElement;

        fireEvent.change(name, { target: { value: data.name } });
        fireEvent.change(race, { target: { value: data.race } });
        fireEvent.change(chip, { target: { value: data.chip } });
        fireEvent.change(color, { target: { value: data.color } });

        await userEvent.click(birthDate);
        await userEvent.type(birthDate, fDate(data.birthDate));

        expect(birthDate.value).toBe(fDate(data.birthDate, 'DD/MM/YYYY'));
        expect(name.value).toBe(data.name);
        expect(race.value).toBe(data.race);
        expect(chip.value).toBe(data.chip);
        expect(color.value).toBe(data.color);
    });

    // it("submits_pet_form_with_valid_data", async () => {
    //     const data = petCreateMother();

    //     const onSubmit = jest.fn();
    //     jest.spyOn(hooks, 'useFormPet').mockImplementation(() => ({ onSubmit }));

    //     render(
    //         <MemoryRouter>
    //             <PetForm callback={callback} />
    //         </MemoryRouter>
    //     );

    //     const name = screen.getByLabelText('Nombre (*)') as HTMLInputElement;
    //     const race = screen.getByLabelText('Raza (*)') as HTMLInputElement;
    //     const chip = screen.getByLabelText('Chip') as HTMLInputElement;
    //     const color = screen.getByLabelText('Color (*)') as HTMLInputElement;
    //     const clientField = screen.getByLabelText('cliente') as HTMLInputElement;
    //     const birthDate = screen.getByLabelText('Fecha de nacimiento (*)') as HTMLInputElement;

    //     await act(async () => {
    //         fireEvent.change(clientField, { target: { value: data.adopter } });
    //         fireEvent.change(name, { target: { value: data.name } });
    //         fireEvent.change(race, { target: { value: data.race } });
    //         fireEvent.change(chip, { target: { value: data.chip } });
    //         fireEvent.change(color, { target: { value: data.color } });
    //         await userEvent.click(birthDate);
    //         await userEvent.type(birthDate, fDate(data.birthDate));



    //         const form = screen.getByRole("form");

    //         fireEvent.submit(form);

    //     });
    //     expect(onSubmit).toHaveBeenCalledTimes(1);
    // });

});