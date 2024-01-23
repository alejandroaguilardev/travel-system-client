import { Helmet } from 'react-helmet-async';
import ContractsView from '../../../../presentation/contracts/views/contract-view';


export default function ContractPage() {
    return (
        <>
            <Helmet>
                <title>Contratos</title>
            </Helmet>

            <ContractsView />
        </>
    );
}