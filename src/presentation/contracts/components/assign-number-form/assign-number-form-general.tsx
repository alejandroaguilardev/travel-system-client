import { Box, Stack, TextField } from "@mui/material";
import { useContractFolderForm } from "./use-contract-folder-form";
import { SearchFolder } from "../../../folders/components/search-folder/search-folder";
import { AutocompleteSelectorClient } from "../../../../components/autocomplete/client/autocomplete-selector-client";
import { ErrorMessage } from "../../../../components/hook-form";

export const AssignNumberFormGeneral = () => {
    const { folder, number, quantity, handleQuantity, handleFolder, handleNumber } = useContractFolderForm();



    return (
        <Stack spacing={1} marginBottom={1} direction={{ xs: "column", md: "row" }}>
            <Box width="100%">
                <SearchFolder
                    folder={folder}
                    handleFolder={handleFolder}
                    handleQuantity={handleQuantity}
                    field='folder'
                />
            </Box>
            {folder ?
                <Box width="100%">
                    <TextField
                        type="number"
                        value={number}
                        placeholder='Numeró de expediente'
                        fullWidth
                        onChange={({ target }) => handleNumber(Number(target?.value) ?? 0)}
                    />
                    <ErrorMessage name="number" />
                </Box>
                :
                <TextField
                    placeholder='Acreditado-N° aún sin expediente'
                    fullWidth
                    disabled
                    sx={{
                        cursor: "not-allowed"
                    }}
                />
            }

        </Stack>
    )
}
