import { FC } from "react";
import { Alert, Box, Divider, Skeleton, Stack } from "@mui/material";
import { Documentation } from '../../../../../modules/contracts/domain/contract-services/documentation/documentation';
import { useDocumentFormGeneral } from "./use-document-form-general";
import { DocumentationClientValueForm } from "./documentation-client-value-form";

type Props = {
    documentation: Documentation;
    role?: | "user"
}

export const DocumentationFormGeneral: FC<Props> = ({ documentation, role }) => {
    const { switchClient, switchUser, isLoading } = useDocumentFormGeneral(documentation);

    if (isLoading) return <>{Array(9).fill(null).map((_) => <Skeleton key={_} variant="rectangular" width="100%" height={50} sx={{ mb: 1 }} />)}</>

    return (
        <Stack flexWrap="wrap" spacing={1} marginBottom={1}>
            {switchUser.length > 0 ?
                <Box >
                    <Alert variant='outlined' sx={{ width: "100%", mb: 1, fontWeight: "bold" }} >Pet Travel proporciona la siguiente documentación como parte integral de su servicio, conforme a lo estipulado en su contrato, y se hace plenamente responsable de asegurar su validez y cumplimiento</Alert>
                    {switchUser.map((value) => (
                        <DocumentationClientValueForm
                            key={value.name}
                            name={`${value.name}`}
                            label={value.label}
                            style={
                                {
                                    ...!role
                                        ? { pointerEvents: 'none', opacity: 0.5 }
                                        : {},

                                }}
                            edit
                        />
                    ))}
                    <Divider sx={{ mt: 3, mb: 2 }} />
                </Box>
                :
                <Alert variant='outlined' severity="info" sx={{ width: "100%", fontWeight: "bold" }}>Su contrato no incluye la responsabilidad de Pet Travel sobre la documentación.</Alert>}
            {switchClient.length > 0 &&
                <>
                    <Alert variant='outlined' severity="error" sx={{ width: "100%", fontWeight: "bold" }}>Asegúrate de tener los  demás documentos para realizar el viaje de tu mascota, ya que no están incluidos en el contrato. Tu responsabilidad es garantizar que estén en regla.</Alert>
                    {switchClient.map((value) => (
                        <DocumentationClientValueForm
                            key={value.name}
                            name={`${value.name}`}
                            label={value.label}
                            style={{
                                ...role === "user"
                                    ? { pointerEvents: 'none', opacity: 0.5 }
                                    : {},
                            }}
                            edit
                        />
                    ))}
                </>
            }
        </Stack>
    );
};
