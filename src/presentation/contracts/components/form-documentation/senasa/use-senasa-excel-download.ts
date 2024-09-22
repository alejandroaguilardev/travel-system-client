import { useState } from 'react';
import { useMessage } from '../../../../../hooks/use-message';
import { contractDetailService } from '../../../../../modules/contracts/infrastructure/contract-detail.service';
import { downloadFile } from '../../../../../modules/shared/infrastructure/helpers/blob-archive';

export const useSenasaExcelDownload = () => {
    const { showNotification } = useMessage();
    const [isLoading, setIsLoading] = useState(false);
    const downloadSenasa = (id: string, detailId: string) => {
        setIsLoading(true);
        contractDetailService.downloadSenasaExcel(id, detailId).then((response) => {
            downloadFile(new Blob([response.file]), response.name);
        }).catch((e) => {
            showNotification("No se logró descargar el excel", { variant: "error" })
        }).finally(() => setIsLoading(false));
    }

    return { downloadSenasa, isLoading }
}
