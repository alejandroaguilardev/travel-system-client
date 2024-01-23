import { Helmet } from 'react-helmet-async';
import ContractNewView from '../../../../../presentation/contracts/views/contract-new-view';


export default function RoleNewPage() {
    return (
        <>
            <Helmet>
                <title>Crear Contrato</title>
            </Helmet>

            <ContractNewView />
        </>
    );
}