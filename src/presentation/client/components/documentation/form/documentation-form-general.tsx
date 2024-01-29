import { FC } from "react";
import { Alert, Divider, Stack } from "@mui/material";
import RHFSwitch from '../../../../../components/hook-form/rhf-switch';
import { DocumentationDefinition } from '../../../../../modules/contracts/domain/interfaces/documentation';
import { useDocumentFormGeneral } from "./use-document-form-general";

type Props = {
    documentation: DocumentationDefinition;
    role?: | "user"
}

export const DocumentationFormGeneral: FC<Props> = ({ documentation, role }) => {
    const { switchClient, switchUser } = useDocumentFormGeneral(documentation);

    return (
        <Stack flexWrap="wrap" spacing={1} marginBottom={1}>
            <Divider />{switchUser.length > 0 ?
                <>
                    <Alert variant='outlined' sx={{ width: "100%" }}>Pet Travel proporciona la siguiente documentación como parte integral de su servicio, conforme a lo estipulado en su contrato, y se hace plenamente responsable de asegurar su validez y cumplimiento</Alert>
                    {switchUser.map((value) => (
                        <RHFSwitch
                            key={value.name}
                            name={`${value.name}.isApplied`}
                            label={value.label}
                            style={!role ? { pointerEvents: 'none', opacity: 0.5 } : {}} />
                    ))}
                </>
                :
                <Alert variant='outlined' severity="info" sx={{ width: "100%" }}>Su contrato no incluye la responsabilidad de Pet Travel sobre la documentación.</Alert>}
            {switchClient.length > 0 &&
                <>
                    <Alert variant='outlined' severity="error" sx={{ width: "100%" }}>Asegúrate de tener los documentos en orden para realizar el viaje, ya que no están incluidos en el contrato. Tu responsabilidad es garantizar que estén en regla.</Alert>
                    {switchClient.map((value) => (
                        <RHFSwitch
                            key={value.name}
                            name={`${value.name}.isApplied`}
                            label={value.label}
                            style={role === "user" ? { pointerEvents: 'none', opacity: 0.5 } : {}}
                        />

                    ))}
                </>
            }

        </Stack>
    );
};
