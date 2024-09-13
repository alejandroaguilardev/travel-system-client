import { FC } from "react";
import { useFormContext } from "react-hook-form";
import { Button } from "@mui/material";
import { DocumentationCertificate } from '../../../../modules/contracts/domain/contract-services/documentation/documentation-certificate';
import { CertificateFormGeneral } from "./certificate-form-general";
import { SendEmailCheck } from '../../../../components/send-email-check/send-email-check';


type Props = {
    isLoading: boolean;
    hasSendEmail: boolean;
    onSubmit: (data: DocumentationCertificate) => void;
    onChangeHasSendEmail: (data: boolean) => void;
}

export const GenerateCertificate: FC<Props> = ({ isLoading, hasSendEmail, onChangeHasSendEmail, onSubmit }) => {
    const { setValue, getValues } = useFormContext<DocumentationCertificate>();
    const generateCertificate = () => {
        const today = new Date();
        setValue("resultDate", today);
        setValue("isApplied", true);
        onSubmit(getValues());
    };

    return (
        <>

            <CertificateFormGeneral label="¿Certificado realizado?" />
            <SendEmailCheck value={hasSendEmail} onChange={onChangeHasSendEmail} label="Enviar notificación al cliente por email y whatsApp" />

            <Button
                onClick={generateCertificate}
                disabled={isLoading}
                variant='outlined'
                fullWidth
                sx={{ mb: 1 }}

            >
                Generar Certificado
            </Button>

        </>

    );
};
