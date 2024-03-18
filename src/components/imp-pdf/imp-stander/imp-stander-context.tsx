import { ReactNode, createContext, useCallback, useContext, useMemo, useState } from 'react';
import { useDialog } from '../../..//hooks';
import { TypeofImp } from '../imp-contract/type-contract';


interface ImpStanderContextValues<T> {
  dataProps: T | null;
  isOpenViewer: boolean;
  isOpenPdf: boolean;
  handleTypeImpExecute: (dataContent: T | null, type: TypeofImp) => void;
  handleDataViewerPdf: (dataContent: T | null) => void;
  closeDialogViewer: () => void;
}

export const ImpStanderContext = createContext({} as ImpStanderContextValues<any>);

interface Props {
  children: ReactNode;
}

export function ImpStanderProvider<T>({ children }: Props) {
  const [dataProps, handleDataViewerPdf] = useState<T | null>(null);
  const { isOpen: isOpenViewer, closeDialog, openDialog: openDialogViewer } = useDialog();
  const { isOpen: isOpenPdf, closeDialog: closeDialogPdf, openDialog: openDialogPdf } = useDialog();

  const closeDialogViewer = useCallback(() => {
    handleDataViewerPdf(null);
    closeDialog();
  }, [closeDialog])

  const handleTypeImpExecute = useCallback((data: T, type: TypeofImp) => {
    handleDataViewerPdf(data);
    if (type === TypeofImp.VIEWER) {
      closeDialogPdf();
      openDialogViewer();
    }
    if (type === TypeofImp.IMP) {
      closeDialog();
      openDialogPdf();
    }
  }, [closeDialogPdf, openDialogViewer, closeDialog, openDialogPdf])



  const contextValues = useMemo(() => ({
    dataProps,
    isOpenViewer,
    isOpenPdf,
    handleTypeImpExecute,
    handleDataViewerPdf,
    closeDialogViewer,
  }), [
    dataProps,
    isOpenViewer,
    isOpenPdf,
    handleTypeImpExecute,
    handleDataViewerPdf,
    closeDialogViewer,
  ]);

  return (
    <ImpStanderContext.Provider value={contextValues}>
      {children}
    </ImpStanderContext.Provider>
  )
}


export function useImpContext<T>() {
  const context = useContext(ImpStanderContext) as ImpStanderContextValues<T>;
  if (!context.handleTypeImpExecute) {
    throw new Error('useImpStanderContextValues debe ser utilizado dentro de un ImpStanderProvider');
  }
  return context;
}
