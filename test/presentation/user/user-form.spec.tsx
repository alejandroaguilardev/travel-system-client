import { act, fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import { UserForm } from "../../../src/presentation/users/components/form/user-form";
import { userCreateMother } from '../../modules/users/domain/user.mother';
import * as hooks from "../../../src/presentation/users/components/form/use-form-user";
import RHFTextField from '../../../src/components/hook-form/rhf-text-field';

jest.mock('../../../src/modules/roles/infrastructure/role.service');
jest.mock('../../../src/modules/users/infrastructure/user.service');

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

describe("UserForm", () => {
    const callback = jest.fn();

    it("renders_user_form_correctly", () => {
        render(
            <MemoryRouter>
                <UserForm callback={callback} />
            </MemoryRouter>
        );

        const name = screen.getByLabelText('Primer Nombre (*)');
        const secondName = screen.getByLabelText('Segundo Nombre');

        const lastName = screen.getByLabelText('Primer Apellido (*)');
        const secondLastName = screen.getByLabelText('Segundo Apellido');
        const email = screen.getByLabelText('Correo Electrónico (*)');
        const roles = screen.getByLabelText('Seleccionar roles');

        expect(name).toBeInTheDocument();
        expect(secondName).toBeInTheDocument();

        expect(lastName).toBeInTheDocument();
        expect(secondLastName).toBeInTheDocument();
        expect(email).toBeInTheDocument();
        expect(roles).toBeInTheDocument();

    });

    it("allows_input_changes_in_user_form", () => {
        render(
            <MemoryRouter>
                <UserForm callback={callback} />
            </MemoryRouter>
        );
        const data = userCreateMother();

        const name = screen.getByLabelText('Primer Nombre (*)') as HTMLInputElement;
        const secondName = screen.getByLabelText('Segundo Nombre') as HTMLInputElement;

        const lastName = screen.getByLabelText('Primer Apellido (*)') as HTMLInputElement;
        const secondLastName = screen.getByLabelText('Segundo Apellido') as HTMLInputElement;
        const email = screen.getByLabelText('Correo Electrónico (*)') as HTMLInputElement;


        fireEvent.change(name, { target: { value: data.profile.name } });
        fireEvent.change(secondName, { target: { value: data.profile.secondName } });
        fireEvent.change(lastName, { target: { value: data.profile.lastName } });
        fireEvent.change(secondLastName, { target: { value: data.profile.secondLastName } });
        fireEvent.change(email, { target: { value: data.email } });

        expect(name.value).toBe(data.profile.name);
        expect(secondName.value).toBe(data.profile.secondName);
        expect(lastName.value).toBe(data.profile.lastName);
        expect(secondLastName.value).toBe(data.profile.secondLastName);
        expect(email.value).toBe(data.email);
    });


    it("submits_user_form_with_valid_data", async () => {
        const data = userCreateMother();

        const onSubmit = jest.fn();
        jest.spyOn(hooks, 'useFormUser').mockImplementation(() => ({ onSubmit }));

        render(
            <MemoryRouter>
                <UserForm callback={callback} />
            </MemoryRouter>
        );

        const name = screen.getByLabelText('Primer Nombre (*)') as HTMLInputElement;
        const secondName = screen.getByLabelText('Segundo Nombre') as HTMLInputElement;

        const lastName = screen.getByLabelText('Primer Apellido (*)') as HTMLInputElement;
        const secondLastName = screen.getByLabelText('Segundo Apellido') as HTMLInputElement;
        const email = screen.getByLabelText('Correo Electrónico (*)') as HTMLInputElement;
        const phone = screen.getByLabelText('Teléfono (*)') as HTMLInputElement;
        const gender = screen.getByLabelText('Sexo (*)') as HTMLInputElement;

        await act(async () => {
            fireEvent.change(name, { target: { value: data.profile.name } });
            fireEvent.change(secondName, { target: { value: data.profile.secondName } });
            fireEvent.change(lastName, { target: { value: data.profile.lastName } });
            fireEvent.change(secondLastName, { target: { value: data.profile.secondLastName } });
            fireEvent.change(email, { target: { value: data.email } });
            fireEvent.change(phone, { target: { value: data.profile.phone } });
            fireEvent.change(gender, { target: { value: data.profile.gender } });

            const form = screen.getByRole("form");

            fireEvent.submit(form);

        });
        expect(onSubmit).toHaveBeenCalledTimes(1);
    });

});