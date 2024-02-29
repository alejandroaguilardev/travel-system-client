import { act, fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import { UserForm } from "../../../src/presentation/users/components/form/user-form";
import { userCreateMother } from '../../modules/users/domain/user.mother';
import * as hooks from "../../../src/presentation/users/components/form/use-form-user";
import RHFTextField from '../../../src/components/hook-form/rhf-text-field';
import { ConditionUserProvider } from '../../../src/presentation/users/contexts/condition-user-context';

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
                <ConditionUserProvider isUser>
                    <UserForm callback={callback} />
                </ConditionUserProvider>
            </MemoryRouter>
        );

        const document = screen.getByLabelText('Documento (*)');
        const numberDocument = screen.getByLabelText('Número de documento (*)');
        const name = screen.getByLabelText('Primer Nombre (*)');
        const secondName = screen.getByLabelText('Segundo Nombre');
        const lastName = screen.getByLabelText('Primer Apellido (*)');
        const secondLastName = screen.getByLabelText('Segundo Apellido');
        const email = screen.getByLabelText('Correo Electrónico (*)');
        const roles = screen.getByLabelText('Seleccionar roles');
        const phone = screen.getByLabelText('Teléfono (*)');
        const gender = screen.getByLabelText('Sexo (*)');

        expect(document).toBeInTheDocument();
        expect(numberDocument).toBeInTheDocument();
        expect(name).toBeInTheDocument();
        expect(secondName).toBeInTheDocument();
        expect(lastName).toBeInTheDocument();
        expect(secondLastName).toBeInTheDocument();
        expect(email).toBeInTheDocument();
        expect(roles).toBeInTheDocument();
        expect(phone).toBeInTheDocument();
        expect(gender).toBeInTheDocument();

    });

    it("allows_input_changes_in_user_form", async () => {
        render(
            <MemoryRouter>
                <ConditionUserProvider isUser>
                    <UserForm callback={callback} />
                </ConditionUserProvider>
            </MemoryRouter>
        );
        const data = userCreateMother();

        const documentNumber = screen.getByLabelText('Número de documento (*)') as HTMLInputElement;
        const name = screen.getByLabelText('Primer Nombre (*)') as HTMLInputElement;
        const secondName = screen.getByLabelText('Segundo Nombre') as HTMLInputElement;
        const lastName = screen.getByLabelText('Primer Apellido (*)') as HTMLInputElement;
        const secondLastName = screen.getByLabelText('Segundo Apellido') as HTMLInputElement;
        const email = screen.getByLabelText('Correo Electrónico (*)') as HTMLInputElement;
        const roles = screen.getByLabelText('Seleccionar roles') as HTMLInputElement;
        const phone = screen.getByLabelText('Teléfono (*)') as HTMLInputElement;

        fireEvent.change(documentNumber, { target: { value: data.profile.documentNumber } });
        fireEvent.change(name, { target: { value: data.profile.name } });
        fireEvent.change(secondName, { target: { value: data.profile.secondName } });
        fireEvent.change(lastName, { target: { value: data.profile.lastName } });
        fireEvent.change(secondLastName, { target: { value: data.profile.secondLastName } });
        fireEvent.change(email, { target: { value: data.email } });
        fireEvent.change(roles, { target: { value: data.roles } });
        fireEvent.change(phone, { target: { value: data.profile.phone } });

        expect(documentNumber.value).toBe(data.profile.documentNumber);
        expect(name.value).toBe(data.profile.name);
        expect(secondName.value).toBe(data.profile.secondName);
        expect(lastName.value).toBe(data.profile.lastName);
        expect(secondLastName.value).toBe(data.profile.secondLastName);
        expect(email.value).toBe(data.email);
        expect(phone.value).toBe(data.profile.phone);
    });

    it("submits_user_form_with_valid_data", async () => {
        const data = userCreateMother();

        const onSubmit = jest.fn();
        jest.spyOn(hooks, 'useFormUser').mockImplementation(() => ({ onSubmit }));

        render(
            <MemoryRouter>
                <ConditionUserProvider isUser>
                    <UserForm callback={callback} />
                </ConditionUserProvider>
            </MemoryRouter>
        );

        const numberDocument = screen.getByLabelText('Número de documento (*)');
        const name = screen.getByLabelText('Primer Nombre (*)') as HTMLInputElement;
        const secondName = screen.getByLabelText('Segundo Nombre') as HTMLInputElement;

        const lastName = screen.getByLabelText('Primer Apellido (*)') as HTMLInputElement;
        const secondLastName = screen.getByLabelText('Segundo Apellido') as HTMLInputElement;
        const email = screen.getByLabelText('Correo Electrónico (*)') as HTMLInputElement;

        const phone = screen.getByLabelText('Teléfono (*)') as HTMLInputElement;

        await act(async () => {
            fireEvent.change(numberDocument, { target: { value: data.profile.documentNumber } });

            fireEvent.change(name, { target: { value: data.profile.name } });
            fireEvent.change(secondName, { target: { value: data.profile.secondName } });
            fireEvent.change(lastName, { target: { value: data.profile.lastName } });
            fireEvent.change(secondLastName, { target: { value: data.profile.secondLastName } });
            fireEvent.change(email, { target: { value: data.email } });
            fireEvent.change(phone, { target: { value: data.profile.phone } });

            const form = screen.getByRole("form");

            fireEvent.submit(form);

        });
        expect(onSubmit).toHaveBeenCalledTimes(1);
    });

});