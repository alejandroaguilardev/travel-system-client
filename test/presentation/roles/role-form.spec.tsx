import { act, fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import * as hooks from "../../../src/presentation/roles/components/form/use-form-role";
import { RoleForm } from "../../../src/presentation/roles/components/form/role-form";
import { roleCreateMother } from '../../modules/roles/domain/role.mother';


describe("RoleForm", () => {
    const callback = jest.fn();

    it("renders_role_form_correctly", () => {
        render(
            <MemoryRouter>
                <RoleForm callback={callback} />
            </MemoryRouter>
        );

        const name = screen.getByLabelText("Nombre (*)");
        const description = screen.getByLabelText("Descripción");
        const permissionsTitle = screen.getByText("Permisos del Sistema");
        expect(permissionsTitle).toBeInTheDocument();
        expect(name).toBeInTheDocument();
        expect(description).toBeInTheDocument();
    });

    it("allows_input_changes_in_role_form", () => {
        render(
            <MemoryRouter>
                <RoleForm callback={callback} />
            </MemoryRouter>
        );
        const data = roleCreateMother();

        const name = screen.getByLabelText("Nombre (*)") as HTMLInputElement;
        const description = screen.getByLabelText("Descripción") as HTMLInputElement;

        fireEvent.change(name, { target: { value: data.name } });
        fireEvent.change(description, { target: { value: data.description } });

        expect(name.value).toBe(data.name);
        expect(description.value).toBe(data.description);
    });


    it("submits_role_form_with_valid_data", async () => {
        const data = roleCreateMother();

        const onSubmit = jest.fn();
        jest.spyOn(hooks, 'useFormRole').mockImplementation(() => ({ onSubmit }));

        render(
            <MemoryRouter>
                <RoleForm callback={callback} />
            </MemoryRouter>
        );

        const name = screen.getByLabelText("Nombre (*)");
        const description = screen.getByLabelText("Descripción");

        await act(async () => {
            fireEvent.change(name, { target: { value: data.name } });
            fireEvent.change(description, { target: { value: data.description } });

            const form = screen.getByRole("form");

            fireEvent.submit(form);

        });
        expect(onSubmit).toHaveBeenCalledTimes(1);
    });

});