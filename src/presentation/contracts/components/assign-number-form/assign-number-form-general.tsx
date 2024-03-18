import { Box, Stack, TextField } from "@mui/material";
import { useContractFolderForm } from "./use-contract-folder-form";
import { SearchFolder } from "../../../folders/components/search-folder/search-folder";
import { AutocompleteSelectorClient } from "../../../../components/autocomplete/client/autocomplete-selector-client";
import { ErrorMessage } from "../../../../components/hook-form";

export const AssignNumberFormGeneral = () => {
    const { folder, number, handleFolder, handleNumber } = useContractFolderForm();

    return (
        <Stack spacing={1} marginBottom={1} direction={{ xs: "column", md: "row" }}>
            <Box width="100%">
                <SearchFolder
                    folder={folder}
                    handleFolder={handleFolder}
                    field='folder'
                />
            </Box>
            {folder?.quantity ?
                <Box width="100%">
                    <AutocompleteSelectorClient<{ number: number }>
                        textField={{
                            label: "Número de contrato"
                        }}
                        items={Array.from({ length: folder?.quantity }, (_, index) => ({ number: index + 1 }))}
                        defaultValue={{ number }}
                        getOptionLabel={(d) => d?.number?.toString() ?? ""}
                        callback={(value) => handleNumber(value?.number)}
                        propertiesFilter={["number"]}
                    />
                    <ErrorMessage name="number" />
                </Box>
                :
                <TextField
                    placeholder='Acreditado-N° aún sin expediente'
                    fullWidth
                    disabled
                />
            }

        </Stack>
    )
}
