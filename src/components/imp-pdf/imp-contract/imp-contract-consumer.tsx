import { Contract } from 'src/modules/contracts/domain/contract';
import { PdfBlob } from '../pdf-blob';
import { PdfViewerDialog } from '../pdf-viewer-dialog';
import { ImpContractContext } from './imp-contract-context';

interface Props {
    document: ({ contract }: { contract: Contract }) => JSX.Element;
    onClose?: () => void;
};

export function ImpContractConsumer({ document, onClose }: Props) {
    return (
        <ImpContractContext.Consumer>
            {({ dataProps, handleDataViewerPdf, closeDialogViewer, isOpenPdf, isOpenViewer }) => (
                <>
                    {dataProps &&
                        <PdfViewerDialog
                            height={500}
                            isOpen={isOpenViewer}
                            onClose={() => {
                                closeDialogViewer();
                                if (onClose) onClose();
                            }} >
                            {document({ contract: dataProps })}
                        </PdfViewerDialog>
                    }
                    {dataProps && isOpenPdf && <PdfBlob handleDataViewerPdf={handleDataViewerPdf}>
                        {document({ contract: dataProps })}
                    </PdfBlob>}
                </>
            )
            }
        </ImpContractContext.Consumer >
    );
}
