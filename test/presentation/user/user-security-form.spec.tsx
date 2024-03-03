import { fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import { ClientSecurityForm } from '../../../src/presentation/client/components/client-security/client-security';
import { passwordCreatedMother } from '../../modules/users/domain/password.mother';

jest.mock('../../../src/modules/users/infrastructure/user.service');

describe("UserSecurityForm", () => {
    const callback = jest.fn();

    it("renders_user_security_form_correctly", () => {
        render(
            <MemoryRouter>
                <ClientSecurityForm callback={callback} />
            </MemoryRouter>
        );

        const password = screen.getByLabelText('Contraseña Actual');
        const newPassword = screen.getByLabelText('Nueva contraseña');
        const passwordRepeat = screen.getByLabelText('Repetir la contraseña');

        expect(password).toBeInTheDocument();
        expect(newPassword).toBeInTheDocument();
        expect(passwordRepeat).toBeInTheDocument();
    });

    it("allows_input_changes_in_user_security_form", async () => {
        render(
            <MemoryRouter>
                <ClientSecurityForm callback={callback} />
            </MemoryRouter>
        );
        const data = {
            password: passwordCreatedMother(),
            newPassword: passwordCreatedMother(),
            passwordRepeat: passwordCreatedMother(),
        };

        const password = screen.getByLabelText('Contraseña Actual') as HTMLInputElement;;
        const newPassword = screen.getByLabelText('Nueva contraseña') as HTMLInputElement;;
        const passwordRepeat = screen.getByLabelText('Repetir la contraseña') as HTMLInputElement;;

        fireEvent.change(password, { target: { value: data.password } });
        fireEvent.change(newPassword, { target: { value: data.newPassword } });
        fireEvent.change(passwordRepeat, { target: { value: data.passwordRepeat } });

        expect(password.value).toBe(data.password);
        expect(newPassword.value).toBe(data.newPassword);
        expect(passwordRepeat.value).toBe(data.passwordRepeat);
    });
});