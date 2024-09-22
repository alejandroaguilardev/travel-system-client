import React, { ReactNode } from 'react';
import {
    Typography,
    Card,
    Stack,
    Button,
} from '@mui/material';
import Label from 'src/components/label';
import { fDateTimeLong } from '../../../../../../modules/shared/infrastructure/helpers/format-time';
import { capitalize } from '../../../../../../modules/shared/domain/helpers/capitalize';
import { DocumentationCertificate } from '../../../../../../modules/contracts/domain/contract-services/documentation/documentation-certificate';

interface DocumentCardProps {
    label: string;
    doc: DocumentationCertificate;
    children?: ReactNode;
}

const ContractDetailCardDocumentation: React.FC<DocumentCardProps> = ({ label, doc, children }) => {

    return (
        <Card sx={{ p: 2, width: "100%" }}>
            <Stack spacing={1}>
                <Typography variant="body1">
                    <strong>{capitalize(label)} </strong>
                    <Label color={doc.hasServiceIncluded ? "info" : "secondary"} sx={{ ml: 1 }}>
                        {doc.hasServiceIncluded ? 'Incluido' : 'No Incluido'}
                    </Label>
                </Typography>
                <Typography variant="body1">
                    <strong>Fecha Esperada:</strong> {doc.expectedDate ? fDateTimeLong(doc.expectedDate) : '--'}
                </Typography>
                <Typography variant="body1">
                    <strong>Fecha de Ejecución:</strong> {doc.executionDate ? fDateTimeLong(doc.executionDate) : '--'}
                </Typography>
                <Typography variant="body1">
                    <strong>Fecha de Resultado:</strong> {doc.resultDate ? fDateTimeLong(doc.resultDate) : '--'}
                </Typography>
                <Typography variant="body1">
                    <strong>Observaciones:</strong> {doc.observation || 'Sin observaciones'}
                </Typography>
                {doc.hasServiceIncluded && (
                    <Typography variant="body1">
                        <Label color={doc?.resultDate ? "success" : "secondary"} sx={{ ml: 1 }}>
                            {doc?.resultDate ? 'Este certificado se ha generado correctamente' : 'Este servicio se encuentra pendiente por generado'}
                        </Label>
                    </Typography>
                )}
                {children}
            </Stack>
        </Card>
    );
};

export default ContractDetailCardDocumentation;
