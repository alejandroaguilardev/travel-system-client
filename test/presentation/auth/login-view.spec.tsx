import { render, screen, fireEvent, act } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import LoginView from '../../../src/presentation/auth/login-view';
import { AuthContext } from '../../../src/presentation/auth/context/auth-context';
import { emailCreateMother } from '../../modules/shared/domain/email.mother';
import { passwordCreatedMother } from '../../modules/users/domain/password.mother';


describe('LoginView', () => {
    let container: HTMLElement;
    const mockLogin = jest.fn();

    beforeEach(() => {
        const { container: renderContainer } = render(
            <MemoryRouter>
                <AuthContext.Provider value={{ login: mockLogin, authenticated: false, loading: false, logout: jest.fn(), method: "jwt", unauthenticated: false, user: null, update: jest.fn() }}>
                    <LoginView />
                </AuthContext.Provider>
            </MemoryRouter>
        );
        container = renderContainer
    });

    it('render_login_view_with_"Iniciar sesión"_text', () => {
        expect(screen.getAllByText('Iniciar sesión').length).toBeGreaterThanOrEqual(2);
    });

    it("render_login_view_fire_event_successfully", async () => {
        const emailMother = emailCreateMother();
        const passwordMother = passwordCreatedMother();
        const button = container.querySelector('button');
        const emailInput = screen.getByLabelText('Correo Electrónico');
        const passwordInput = screen.getByLabelText('Contraseña');
        await act(async () => {
            fireEvent.change(emailInput, { target: { value: emailMother } });
            fireEvent.change(passwordInput, { target: { value: passwordMother } });

            fireEvent.click(button!);
            const form = container.querySelector('form');
            fireEvent.submit(form!);
        });
        expect(mockLogin).toHaveBeenCalledWith(emailMother, passwordMother);
    });
});