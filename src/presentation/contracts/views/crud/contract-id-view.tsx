import { Container, Skeleton } from '@mui/material';
import { paths } from '../../../../app/routes/paths';
import SearchIdNotFound from '../../../../app/routes/guard/search-id-not-found';
import CustomBreadcrumbs from '../../../../components/custom-breadcrumbs/custom-breadcrumbs';
import { useSearchByIdContract } from '../../hooks/use-search-by-id-contract';
import ContractDetail from '../../components/details/contract-detail';

type Props = {
    id: string;
}

export default function ContractIdView({ id }: Props) {
    const { contract, error, isLoading } = useSearchByIdContract(id);

    return (
        <>
            {
                isLoading ?
                    <Skeleton variant="rectangular" height="100vh" />
                    : <SearchIdNotFound isLoading={isLoading} data={!!contract} error={error}>
                        <Container maxWidth='xl'>
                            <CustomBreadcrumbs
                                sx={{ display: "inline" }}
                                heading={`Visualizar Contrato N° ${contract?.number}`}
                                links={[
                                    { name: 'Inicio', href: paths.dashboard.root },
                                    { name: 'Contratos', href: paths.dashboard.contracts.root },
                                    { name: `${contract?.number}` },
                                ]}
                            />
                            <ContractDetail contract={contract!} />
                        </Container>
                    </SearchIdNotFound >
            }
        </>
    );
}

