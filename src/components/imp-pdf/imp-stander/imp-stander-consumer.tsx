import { PdfBlob } from '../pdf-blob';
import { PdfViewerDialog } from '../pdf-viewer-dialog';
import { ImpStanderContext } from './imp-stander-context';

interface Props<T> {
    document: (args: T) => JSX.Element;
    onClose?: () => void;
};

export function ImpStanderConsumer<T>({ document, onClose }: Props<T>) {
    return (
        <ImpStanderContext.Consumer>
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
                            {document(dataProps)}
                        </PdfViewerDialog>
                    }
                    {dataProps && isOpenPdf && <PdfBlob handleDataViewerPdf={handleDataViewerPdf}>
                        {document(dataProps)}
                    </PdfBlob>}
                </>
            )
            }
        </ImpStanderContext.Consumer >
    );
}
