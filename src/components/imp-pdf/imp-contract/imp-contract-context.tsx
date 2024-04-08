import { ReactNode, createContext, useCallback, useContext, useMemo, useState } from 'react';
import { useDialog } from '../../../hooks';
import { TypeofImp } from './type-contract';
import { Contract } from '../../..//modules/contracts/domain/contract';
import { contractService } from '../../..//modules/contracts/infrastructure/contract.service';
import { userService } from '../../..//modules/users/infrastructure/user.service';
import { User } from '../../..//modules/users/domain/user';



interface ImpContractContextValues {
  dataProps: Contract | null;
  isOpenViewer: boolean;
  isOpenPdf: boolean;
  handleTypeImpExecute: (id: string, type: TypeofImp) => Promise<void>;
  handleDataViewerPdf: (dataContent: Contract | null) => void;
  closeDialogViewer: () => void;
}

export const ImpContractContext = createContext({} as ImpContractContextValues);

interface Props {
  children: ReactNode;
}

export function ImpContractProvider({ children }: Props) {
  const [dataProps, handleDataViewerPdf] = useState<Contract | null>(null);
  const { isOpen: isOpenViewer, closeDialog, openDialog: openDialogViewer } = useDialog();
  const { isOpen: isOpenPdf, closeDialog: closeDialogPdf, openDialog: openDialogPdf } = useDialog();

  const closeDialogViewer = useCallback(() => {
    handleDataViewerPdf(null);
    closeDialog();
  }, [closeDialog])

  const handleTypeImpExecute = useCallback(async (id: string, type: TypeofImp) => {
    const contract = await contractService.searchById<Contract>(id);

    const client = typeof contract?.client === "string"
      ? await userService.searchById<User>(contract.client)
      : contract?.client;

    contract.client = client;

    handleDataViewerPdf(contract);
    if (type === TypeofImp.VIEWER) {
      closeDialogPdf();
      openDialogViewer();
    }
    if (type === TypeofImp.IMP) {
      closeDialog();
      openDialogPdf();
    }
  }, [closeDialogPdf, openDialogViewer, closeDialog, openDialogPdf])



  const contextValues: ImpContractContextValues = useMemo(() => ({
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
    <ImpContractContext.Provider value={contextValues}>
      {children}
    </ImpContractContext.Provider>
  )
}


export function useImpContractContext<T>() {
  const context = useContext(ImpContractContext) as ImpContractContextValues;
  if (!context.handleTypeImpExecute) {
    throw new Error('useImpContractContextValues debe ser utilizado dentro de un ImpContractProvider');
  }
  return context;
}
