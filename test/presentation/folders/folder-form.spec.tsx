import { act, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import { FolderForm } from "../../../src/presentation/folders/components/form/folder-form";
import { folderCreateMother } from '../../modules/folders/domain/folder.mother';
import * as hooks from "../../../src/presentation/folders/components/form/use-form-folder";
import RHFTextField from '../../../src/components/hook-form/rhf-text-field';
import userEvent from '@testing-library/user-event';

jest.mock('../../../src/modules/folders/infrastructure/folders.service');

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

describe("FolderForm", () => {
    const callback = jest.fn();

    it("renders_folder_form_correctly", () => {
        render(
            <MemoryRouter>
                <FolderForm callback={callback} />
            </MemoryRouter>
        );

        const name = screen.getByLabelText('Nombre de Folder (*)');
        const quantity = screen.getByLabelText('Cantidad de Sobres (*)');

        expect(name).toBeInTheDocument();
        expect(quantity).toBeInTheDocument();

    });

    it("allows_input_changes_in_folder_form", async () => {
        render(
            <MemoryRouter>
                <FolderForm callback={callback} />
            </MemoryRouter>
        );
        const data = folderCreateMother();
        const name = screen.getByLabelText('Nombre de Folder (*)') as HTMLInputElement;;
        const quantity = screen.getByLabelText('Cantidad de Sobres (*)') as HTMLInputElement;;


        await userEvent.type(name, data.name);
        await userEvent.type(quantity, data.quantity.toString());

        expect(name.value).toBe("Folder-" + data.name);
        expect(quantity.value).toBe("100" + data.quantity);
    });

    it("submits_folder_form_with_valid_data", async () => {
        const data = folderCreateMother();

        const onSubmit = jest.fn();
        jest.spyOn(hooks, 'useFormFolder').mockImplementation(() => ({ onSubmit }));

        render(
            <MemoryRouter>
                <FolderForm callback={callback} />
            </MemoryRouter>
        );

        const name = screen.getByLabelText('Nombre de Folder (*)') as HTMLInputElement;;
        const quantity = screen.getByLabelText('Cantidad de Sobres (*)') as HTMLInputElement;;


        await userEvent.type(name, data.name);
        await userEvent.type(quantity, data.quantity.toString());

        await act(async () => {
            const form = screen.getByRole("form");
            userEvent.click(form);
        });
        expect(onSubmit).toHaveBeenCalledTimes(0);
    });

});