import { useState } from "react";
import { useMessage } from '../../../hooks/use-message';
import { contractDetailService } from '../../../modules/contracts/infrastructure/contract-detail.service';
import { downloadFile } from '../../../modules/shared/infrastructure/helpers/blob-archive';
import { PdfDownload } from '../../../modules/contracts/domain/contract-services/documentation/documentation';

export const useDownloadPdf = () => {
    const [isLoading, setIsLoading] = useState(false);
    const { showNotification } = useMessage();

    const downloadPdf = (id: string, detailId: string, pdfRoute: PdfDownload) => {
        setIsLoading(true);
        contractDetailService.downloadPdf(id, detailId, pdfRoute).then((response) => {
            downloadFile(new Blob([response.file]), response.name);
        }).catch((e) => {
            console.log(e)
            showNotification("No se logró descargar el pdf", { variant: "error" })
        }).finally(() => setIsLoading(false));
    }

    return { isLoading, downloadPdf }
}
