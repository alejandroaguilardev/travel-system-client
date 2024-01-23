import { act, fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import { PermissionForm } from "../../../src/presentation/permission/components/form/permission-form";
import { permissionCreateMother } from '../../modules/permissions/domain/permission.mother';
import * as hooks from "../../../src/presentation/permission/components/form/use-form-permission";


describe("PermissionForm", () => {
    const callback = jest.fn();

    it("renders_permission_form_correctly", () => {
        render(
            <MemoryRouter>
                <PermissionForm callback={callback} />
            </MemoryRouter>
        );

        const group = screen.getByLabelText("Grupo (*)");
        const name = screen.getByLabelText("Nombre (*)");
        const description = screen.getByLabelText("Descripción");

        expect(group).toBeInTheDocument();
        expect(name).toBeInTheDocument();
        expect(description).toBeInTheDocument();
    });

    it("allows_input_changes_in_permission_form", () => {
        render(
            <MemoryRouter>
                <PermissionForm callback={callback} />
            </MemoryRouter>
        );
        const data = permissionCreateMother();

        const group = screen.getByLabelText("Grupo (*)") as HTMLInputElement;
        const name = screen.getByLabelText("Nombre (*)") as HTMLInputElement;
        const description = screen.getByLabelText("Descripción") as HTMLInputElement;

        fireEvent.change(group, { target: { value: data.group } });
        fireEvent.change(name, { target: { value: data.name } });
        fireEvent.change(description, { target: { value: data.description } });

        expect(group.value).toBe(data.group);
        expect(name.value).toBe(data.name);
        expect(description.value).toBe(data.description);
    });


    it("submits_permission_form_with_valid_data", async () => {
        const data = permissionCreateMother();

        const onSubmit = jest.fn();
        jest.spyOn(hooks, 'useFormPermission').mockImplementation(() => ({ onSubmit }));

        render(
            <MemoryRouter>
                <PermissionForm callback={callback} />
            </MemoryRouter>
        );

        const group = screen.getByLabelText("Grupo (*)");
        const name = screen.getByLabelText("Nombre (*)");
        const description = screen.getByLabelText("Descripción");

        await act(async () => {
            fireEvent.change(group, { target: { value: data.group } });
            fireEvent.change(name, { target: { value: data.name } });
            fireEvent.change(description, { target: { value: data.description } });

            const form = screen.getByRole("form");

            fireEvent.submit(form);

        });
        expect(onSubmit).toHaveBeenCalledTimes(1);
    });

});