import { Container } from '@mui/material';
import { paths } from '../../../app/routes/paths';
import SearchIdNotFound from '../../../app/routes/guard/search-id-not-found';
import CustomBreadcrumbs from '../../../components/custom-breadcrumbs/custom-breadcrumbs';
import { useSearchByIdContract } from '../hooks/use-search-by-id-contract';
import { ContractForm } from '../components/form/contract-form';
import { useRouter } from '../../../app/routes/hooks/use-router';
import { contractToNewContract } from '../../../modules/contracts/domain/contract-to-new-contract';
import { NotFoundView } from '../../error';
import { TravelForm } from '../../client/components/travel/form/travel-form';

type Props = {
    id: string;
}

export default function ContractTravelView({ id }: Props) {
    const router = useRouter();

    const { contract, error, isLoading } = useSearchByIdContract(id);
    const redirectData = () => router.push(paths.dashboard.contracts.root);

    if (isLoading) return null
    if (!contract) return <NotFoundView />

    return (
        <SearchIdNotFound isLoading={isLoading} data={!!contract} error={error}>
            <Container maxWidth='xl'>
                <CustomBreadcrumbs
                    sx={{ display: "inline" }}
                    heading={`Requisitos de Viaje: ${contract?.number} `}
                    links={[
                        { name: 'Inicio', href: paths.dashboard.root },
                        { name: 'Contratos', href: paths.dashboard.contracts.root },
                        { name: `${contract?.number}` },
                    ]}
                />
                <TravelForm
                    onCancel={redirectData}
                    contractId={id}
                    travel={contract.services.travel}
                    readonly={contract.services.travel.hasServiceIncluded}
                    user
                />
            </Container>
        </SearchIdNotFound>
    );
}

