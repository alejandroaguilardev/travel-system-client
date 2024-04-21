import { fireEvent, screen } from "@testing-library/react";
import { PetForm } from "../../../src/presentation/pets/components/form/pet-form";
import { petCreateMother } from '../../modules/pets/domain/pet.mother';
import RHFTextField from '../../../src/components/hook-form/rhf-text-field';
import { fDate } from '../../../src/modules/shared/infrastructure/helpers/format-time';
import userEvent from "@testing-library/user-event";
import { renderCustom } from "../shared/renderCustom";

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
        renderCustom(
            <PetForm callback={callback} />
        );

        const name = screen.getByLabelText('Nombre (*)');
        const birthDate = screen.getByLabelText('Fecha de nacimiento (*)');
        const type = screen.getByLabelText('Especie (*)');
        const race = screen.getByLabelText('Raza (*)');
        const color = screen.getByLabelText('Color (*)');
        const gender = screen.getByLabelText('Sexo (*)');
        const sterilized = screen.getByLabelText('Esterilizado (*)');

        expect(name).toBeInTheDocument();
        expect(birthDate).toBeInTheDocument();
        expect(type).toBeInTheDocument();
        expect(race).toBeInTheDocument();
        expect(color).toBeInTheDocument();
        expect(gender).toBeInTheDocument();
        expect(sterilized).toBeInTheDocument();

    });

    it("allows_input_changes_in_pet_form", async () => {
        renderCustom(
            <PetForm callback={callback} />
        );
        const data = petCreateMother();

        const name = screen.getByLabelText('Nombre (*)') as HTMLInputElement;
        const birthDate = screen.getByLabelText('Fecha de nacimiento (*)') as HTMLInputElement;
        const race = screen.getByLabelText('Raza (*)') as HTMLInputElement;
        const color = screen.getByLabelText('Color (*)') as HTMLInputElement;

        fireEvent.change(name, { target: { value: data.name } });
        fireEvent.change(race, { target: { value: data.race } });
        fireEvent.change(color, { target: { value: data.color } });

        await userEvent.click(birthDate);
        await userEvent.type(birthDate, fDate(data.birthDate));

        expect(name.value).toBe(data.name);
        expect(race.value).toBe(data.race);
        expect(color.value).toBe(data.color);
    });
});