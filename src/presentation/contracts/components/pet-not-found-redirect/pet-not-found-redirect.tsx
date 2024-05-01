import { AlertRedirectButton } from '../../../../components/alert-redirect-button/alert-redirect-button';
import { paths } from '../../../../app/routes/paths';
import { FC } from 'react';
import { TopicTabs } from '../form-topico/topico-form';

type Props = {
    contractId: string;
}

export const PetNotFoundRedirect: FC<Props> = ({ contractId }) => {
    return (
        <AlertRedirectButton alert={{ label: "No se ha registrado asignado mascota al contrato", color: "warning" }} button={{
            label: "Ir a Tópico", redirect:
                paths.dashboard.faseDocumentation.topico.management(contractId, TopicTabs.admission)
        }} />
    )
}
