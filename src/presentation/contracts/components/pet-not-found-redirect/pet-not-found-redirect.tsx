import { FC } from 'react';
import { AlertRedirectButton } from '../../../../components/alert-redirect-button/alert-redirect-button';
import { paths } from '../../../../app/routes/paths';
import { TopicTabs } from '../form-topico/topico-form';
import { Pet } from '../../../../modules/pets/domain/pet';

type Props = {
    contractId: string;
    pet?: Pet;
}

export const PetNotFoundRedirect: FC<Props> = ({ contractId, pet }) => {
    let message = 'No se ha registrado asignado mascota al contrato'

    if (!pet?.chip) {
        message = "No se ha indicado el número de microchip de la mascota";
    } else if (!pet.name) {
        message = "No se ha indicado el nombre de la mascota en al contrato";
    } else if (!pet.race) {
        message = "No se ha indicado la raza de la mascota en al contrato";
    } else if (!pet.gender) {
        message = "No se ha indicado el sexo de la mascota en al contrato";
    } else if (!pet.birthDate) {
        message = "No se ha indicado la fecha de nacimiento de la mascota en al contrato";
    } else if (!pet.type) {
        message = "No se ha indicado la especie de la mascota en al contrato";
    } else if (!pet.color) {
        message = "No se ha indicado los colores de la mascota en al contrato";
    }

    return (
        <AlertRedirectButton alert={{ label: message, color: "warning" }} button={{
            label: "Ir a Tópico", redirect:
                paths.dashboard.faseDocumentation.topico.management(contractId, TopicTabs.admission)
        }} />
    )
}
