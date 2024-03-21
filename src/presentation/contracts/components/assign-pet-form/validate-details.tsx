import { Contract } from "src/modules/contracts/domain/contract";
import { AssignPetForm } from "./assign-pet-form";
import { useAssignPetForm } from "./use-assign-pet-form";
import { Skeleton } from "@mui/material";
import { PetDialogForm } from "../../../../presentation/pets/components/search/pet-dialog";
import { ClientDialogForm } from "../../../../presentation/client/components/search-client/client-dialog-form";
import { useClientDialogContext } from "../../../../presentation/client/components/search-client/client-dialog-context";
import { useEffect } from "react";

interface Props {
    contract: Contract;
    setLoading: (isLoading: boolean) => void;
    callback: () => void;
    onCancel: () => void;
}

export const ValidateDetails = ({ contract, ...rest }: Props) => {

    const { details: contractDetails, isLoading } = useAssignPetForm(contract);
    const { handleClient } = useClientDialogContext();


    useEffect(() => {
        const client = contract?.client as any;
        handleClient(client);
    }, [contract.client])

    return (
        <>
            {!isLoading ?
                <AssignPetForm
                    contract={contract}
                    contractDetails={contractDetails}
                    {...rest}
                />
                : <Skeleton variant='rectangular' height={150} />

            }
            <ClientDialogForm />
            <PetDialogForm />
        </>
    )
}
