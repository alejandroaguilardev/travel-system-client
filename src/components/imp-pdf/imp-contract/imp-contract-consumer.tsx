import { FC } from 'react';
import { PdfBlob } from '../pdf-blob';
import { PdfViewerDialog } from '../pdf-viewer-dialog';
import { ImpContractContext } from './imp-contract-context';
import { ContractAsiaPdf, ContractEuropaPdf, ContractLatamPdf, ContractUsaPdf } from '../../../presentation/contracts/pdf/format-contract';
import { Contract } from '../../../modules/contracts/domain/contract';


const SelectContract: FC<{ contract: Contract }> = ({ contract }) => {
    if ("Europa" === contract.format) return <ContractEuropaPdf contract={contract} />
    if ("América del Norte" === contract.format) return <ContractUsaPdf contract={contract} />
    if ("América Latina" === contract.format) return <ContractLatamPdf contract={contract} />
    if ("Europa" === contract.format) return <ContractAsiaPdf contract={contract} />

    return <ContractLatamPdf contract={contract} />
}

export function ImpContractConsumer() {
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
                            }} >
                            <SelectContract contract={dataProps} />
                        </PdfViewerDialog>
                    }
                    {dataProps && isOpenPdf && <PdfBlob handleDataViewerPdf={handleDataViewerPdf}>
                        <SelectContract contract={dataProps} />
                    </PdfBlob>}
                </>
            )
            }
        </ImpContractContext.Consumer >
    );
}
