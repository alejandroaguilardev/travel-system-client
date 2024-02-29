import { act, fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import { userCreateMother } from '../../modules/users/domain/user.mother';
import * as hooks from "../../../src/presentation/users/components/form/use-form-user";
import { ClientProfileForm } from '../../../src/presentation/client/components/client-profile/client-profile-form';
import { userProfileMother } from '../../modules/users/domain/user-profile.mother';

jest.mock('../../../src/modules/users/infrastructure/user.service');

describe("UserProfileForm", () => {
    const callback = jest.fn();

    it("renders_user_profile_form_correctly", () => {
        render(
            <MemoryRouter>
                <ClientProfileForm callback={callback} />
            </MemoryRouter>
        );

        const document = screen.getByLabelText('Documento (*)');
        const numberDocument = screen.getByLabelText('Número de documento (*)');
        const name = screen.getByLabelText('Primer Nombre (*)');
        const secondName = screen.getByLabelText('Segundo Nombre');
        const lastName = screen.getByLabelText('Primer Apellido (*)');
        const secondLastName = screen.getByLabelText('Segundo Apellido');
        const phone = screen.getByLabelText('Teléfono (*)');
        const gender = screen.getByLabelText('Sexo (*)');

        expect(document).toBeInTheDocument();
        expect(numberDocument).toBeInTheDocument();
        expect(name).toBeInTheDocument();
        expect(secondName).toBeInTheDocument();
        expect(lastName).toBeInTheDocument();
        expect(secondLastName).toBeInTheDocument();
        expect(phone).toBeInTheDocument();
        expect(gender).toBeInTheDocument();

    });

    it("allows_input_changes_in_user_profile_form", async () => {
        render(
            <MemoryRouter>
                <ClientProfileForm callback={callback} />
            </MemoryRouter>
        );
        const data = userCreateMother();

        const documentNumber = screen.getByLabelText('Número de documento (*)') as HTMLInputElement;
        const name = screen.getByLabelText('Primer Nombre (*)') as HTMLInputElement;
        const secondName = screen.getByLabelText('Segundo Nombre') as HTMLInputElement;
        const lastName = screen.getByLabelText('Primer Apellido (*)') as HTMLInputElement;
        const secondLastName = screen.getByLabelText('Segundo Apellido') as HTMLInputElement;
        const phone = screen.getByLabelText('Teléfono (*)') as HTMLInputElement;

        fireEvent.change(documentNumber, { target: { value: data.profile.documentNumber } });
        fireEvent.change(name, { target: { value: data.profile.name } });
        fireEvent.change(secondName, { target: { value: data.profile.secondName } });
        fireEvent.change(lastName, { target: { value: data.profile.lastName } });
        fireEvent.change(secondLastName, { target: { value: data.profile.secondLastName } });
        fireEvent.change(phone, { target: { value: data.profile.phone } });

        expect(documentNumber.value).toBe(data.profile.documentNumber);
        expect(name.value).toBe(data.profile.name);
        expect(secondName.value).toBe(data.profile.secondName);
        expect(lastName.value).toBe(data.profile.lastName);
        expect(secondLastName.value).toBe(data.profile.secondLastName);
        expect(phone.value).toBe(data.profile.phone);
    });
});