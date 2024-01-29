import { Container } from '@mui/material';
import { paths } from '../../../app/routes/paths';
import SearchIdNotFound from '../../../app/routes/guard/search-id-not-found';
import CustomBreadcrumbs from '../../../components/custom-breadcrumbs/custom-breadcrumbs';
import { useSearchByIdContract } from '../hooks/use-search-by-id-contract';
import { useRouter } from '../../../app/routes/hooks/use-router';
import { CageForm } from '../../client/components/cage/form/cage-form';
import { NotFoundView } from '../../error';

type Props = {
    id: string;
}

export default function ContractCageView({ id }: Props) {
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
                    heading={`Requisitos de Jaula: ${contract?.number} `}
                    links={[
                        { name: 'Inicio', href: paths.dashboard.root },
                        { name: 'Contratos', href: paths.dashboard.contracts.root },
                        { name: `${contract?.number}` },
                    ]}
                />
                <CageForm
                    onCancel={redirectData}
                    contractId={id}
                    cage={contract.services.cage}
                    readonly={contract.services.cage.hasServiceIncluded}
                    user
                />
            </Container>
        </SearchIdNotFound>
    );
}

