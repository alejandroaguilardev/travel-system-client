import { useState } from "react"
import { Contract } from '../../../modules/contracts/domain/contract';
import { contractService } from '../../../modules/contracts/infrastructure/contract.service';
import { useMessage } from "src/hooks";
import { errorsShowNotification } from '../../../modules/shared/infrastructure/helpers/errors-show-notification';

export function useSelectedContract() {
    const [selected, setSelected] = useState<Contract | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [open, setOpen] = useState(false);

    const { showNotification } = useMessage();

    const handleSelected = async (value: Contract | null) => {
        if (value === null) {
            return setSelected(null);
        }
        setIsLoading(true);
        try {
            const response = await contractService.searchById<Contract>(value.id);
            setSelected(response);
        } catch (error) {
            errorsShowNotification(error, showNotification);
        } finally {
            setIsLoading(false)
        }
    }

    return {
        selected,
        isLoading,
        open,
        setOpen,
        handleSelected
    }
}
