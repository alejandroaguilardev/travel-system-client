import { Helmet } from 'react-helmet-async';
import ContractEditView from '../../../../../presentation/contracts/views/contract-edit-view';
import ContractIdView from '../../../../../presentation/contracts/views/contract-id-view';
import SearchIdNotFoundParams from '../../../../../app/routes/guard/search-id-not-found-params';


export default function ContractIdPage() {
    return (
        <>
            <Helmet>
                <title> Editar Contrato</title>
            </Helmet>
            <SearchIdNotFoundParams
                Edit={ContractEditView}
                View={ContractIdView}
            />
        </>
    );
}