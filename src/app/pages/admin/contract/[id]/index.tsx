import { Helmet } from 'react-helmet-async';
import ContractIdView from '../../../../../presentation/contracts/views/contract-id-view';
import ContractEditView from '../../../../../presentation/contracts/views/contract-edit-view';
import NotFoundView from '../../../../../presentation/error/500-view';
import { useParams } from '../../../../routes/hooks/use-params';
import ContractDocumentationView from '../../../../../presentation/contracts/views/contract-documentation-view';
import ContractCageView from '../../../../../presentation/contracts/views/contract-cage-view';
import ContractTravelView from '../../../../../presentation/contracts/views/contract-travel-view';

enum RoutesActions {
    VIEW = "visualizar",
    EDIT = "editar",
    DOCUMENTATION = "documentacion",
    CAGE = "jaula",
    TRAVEL = "viaje",
}

export default function ContractIdPage() {
    const params = useParams();
    const { id } = params;
    const action = params.action as RoutesActions;

    if (!id || !action || ![RoutesActions.EDIT, RoutesActions.VIEW, RoutesActions.DOCUMENTATION, RoutesActions.CAGE, RoutesActions.TRAVEL].includes(action)) {
        return <NotFoundView />;
    }

    return (
        <>
            <Helmet>
                <title> Contrato</title>
            </Helmet>
            {action === RoutesActions.VIEW && <ContractIdView id={id} />}
            {action === RoutesActions.EDIT && <ContractEditView id={id} />}
            {action === RoutesActions.DOCUMENTATION && <ContractDocumentationView id={id} />}
            {action === RoutesActions.CAGE && <ContractCageView id={id} />}
            {action === RoutesActions.TRAVEL && <ContractTravelView id={id} />}
        </>
    );
}
