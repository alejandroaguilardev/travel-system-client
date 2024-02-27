import { FC } from "react";
import { Alert, Divider, Skeleton, Stack } from "@mui/material";
import { Documentation } from '../../../../../modules/contracts/domain/contract-services/documentation/documentation';
import { useDocumentFormGeneral } from "./use-document-form-general";
import { CertificateSwitch } from '../../../../contracts/components/form/pet/detail/certificate-switch';

type Props = {
    documentation: Documentation;
    role?: | "user"
}

export const DocumentationFormGeneral: FC<Props> = ({ documentation, role }) => {
    const { switchClient, switchUser, isLoading } = useDocumentFormGeneral(documentation);

    if (isLoading) return <>{Array(9).fill(null).map(() => <Skeleton variant="rectangular" width="100%" height={50} sx={{ mb: 1 }} />)}</>

    return (
        <Stack flexWrap="wrap" spacing={1} marginBottom={1}>
            <Divider />
            {switchUser.length > 0 ?
                <>
                    <Alert variant='outlined' sx={{ width: "100%" }}>Pet Travel proporciona la siguiente documentación como parte integral de su servicio, conforme a lo estipulado en su contrato, y se hace plenamente responsable de asegurar su validez y cumplimiento</Alert>
                    {switchUser.map((value) => (
                        <CertificateSwitch
                            key={value.name}
                            name={`${value.name}`}
                            label={value.label}
                            style={!role ? { pointerEvents: 'none', opacity: 0.5 } : {}}
                            edit
                        />
                    ))}
                </>
                :
                <Alert variant='outlined' severity="info" sx={{ width: "100%" }}>Su contrato no incluye la responsabilidad de Pet Travel sobre la documentación.</Alert>}
            {switchClient.length > 0 &&
                <>
                    <Alert variant='outlined' severity="error" sx={{ width: "100%" }}>Asegúrate de tener los documentos en orden para realizar el viaje, ya que no están incluidos en el contrato. Tu responsabilidad es garantizar que estén en regla.</Alert>
                    {switchClient.map((value) => (
                        <CertificateSwitch
                            key={value.name}
                            name={`${value.name}`}
                            label={value.label}
                            style={role === "user" ? { pointerEvents: 'none', opacity: 0.5 } : {}}
                            edit
                        />

                    ))}
                </>
            }
        </Stack>
    );
};
