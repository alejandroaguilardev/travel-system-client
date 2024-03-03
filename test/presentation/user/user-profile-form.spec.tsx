import { fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import { userCreateMother } from '../../modules/users/domain/user.mother';
import { ClientProfileForm } from '../../../src/presentation/client/components/client-profile/client-profile-form';

jest.mock('../../../src/modules/users/infrastructure/user.service');
const ext = "+51";

describe("UserProfileForm", () => {
    const callback = jest.fn();

    it("renders_user_profile_form_correctly", () => {
        render(
            <MemoryRouter>
                <ClientProfileForm callback={callback} />
            </MemoryRouter>
        );

        const phone = screen.getByLabelText('Teléfono (*)');


        expect(phone).toBeInTheDocument();

    });

    it("allows_input_changes_in_user_profile_form", async () => {
        render(
            <MemoryRouter>
                <ClientProfileForm callback={callback} />
            </MemoryRouter>
        );
        const data = userCreateMother();


        const phone = screen.getByLabelText('Teléfono (*)') as HTMLInputElement;


        fireEvent.change(phone, { target: { value: ext + data.profile.phone } });


        expect(phone.value).toBe(ext + data.profile.phone);
    });
});