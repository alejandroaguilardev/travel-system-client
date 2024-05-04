import { FC, ReactNode } from 'react';
import { ContractDetail } from '../../../../../modules/contracts/domain/contract-detail';
import { isPetValidateDataCompleted } from '../../../../../modules/pets/domain/pet';
import { travelAccompaniedPetValidate } from '../../../../../modules/contracts/domain/contract-services/travel/travel-accompanied-pet';
import { PetNotFoundRedirect } from '../../pet-not-found-redirect/pet-not-found-redirect';
import { AlertRedirectButton } from '../../../../../components/alert-redirect-button/alert-redirect-button';
import { paths } from '../../../../../app/routes/paths';

type Props = {
    contractId: string;
    detail: ContractDetail;
    children: JSX.Element | ReactNode;
}

export const CertificationAlert: FC<Props> = ({ contractId, detail, children }) => {

    if (!isPetValidateDataCompleted(detail.pet) || !detail?.pet) {
        return <PetNotFoundRedirect contractId={contractId} pet={detail?.pet} />
    }

    if (!travelAccompaniedPetValidate(detail.travel.accompaniedPet)) {
        return detail.travel.typeTraveling === "accompanied"
            ? <AlertRedirectButton alert={{ label: "Aùn no se ha guardado la información  relacionada a la persona que acompañará a la mascota", color: "warning" }} button={{ label: "Ir a Fase Reserva", redirect: paths.dashboard.contractTravel.update(contractId) }} />
            : <AlertRedirectButton alert={{ label: "Aùn no se ha guardado la información de la persona que será titular de los documentos", color: "warning" }} button={{ label: "Ir a Fase Reserva", redirect: paths.dashboard.contractTravel.update(contractId) }} />
    }

    return <>{children} </>
}
