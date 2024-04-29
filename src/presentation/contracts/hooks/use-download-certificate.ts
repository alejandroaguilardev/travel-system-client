import { useState } from "react";
import { useMessage } from '../../../hooks/use-message';
import { contractDetailService } from '../../../modules/contracts/infrastructure/contract-detail.service';
import { downloadFile } from '../../../modules/shared/infrastructure/helpers/blob-archive';

export const useDownloadCertificate = () => {
    const [isLoading, setIsLoading] = useState(false);
    const { showNotification } = useMessage();

    const downloadCertificate = (id: string, detailId: string) => {
        setIsLoading(true);
        contractDetailService.downloadCertificateExcel(id, detailId).then((response) => {
            downloadFile(new Blob([response.file]), response.name);
        }).catch((e) => {
            console.log(e)
            showNotification("No se logró descargar el excel", { variant: "error" })
        }).finally(() => setIsLoading(false));
    }

    return { isLoading, downloadCertificate }
}
