import { Container } from '@mui/material';
import { paths } from '../../../../app/routes/paths';
import SearchIdNotFound from '../../../../app/routes/guard/search-id-not-found';
import CustomBreadcrumbs from '../../../../components/custom-breadcrumbs/custom-breadcrumbs';
import { useSearchByIdContract } from '../../hooks/use-search-by-id-contract';
import { ContractForm } from '../../components/form/contract-form';
import { useRouter } from '../../../../app/routes/hooks/use-router';
import { contractToNewContract } from '../../../../modules/contracts/domain/contract-to-new-contract';
import { correlativeToString } from '../../../../modules/contracts/domain/contract';

type Props = {
    id: string;
}

export default function ContractEditView({ id }: Props) {
    const router = useRouter();

    const { contract, error, isLoading } = useSearchByIdContract(id);
    const redirectData = () => router.push(paths.dashboard.contracts.root);

    return (
        <SearchIdNotFound isLoading={isLoading} data={!!contract} error={error}>
            <Container maxWidth='xl'>
                <CustomBreadcrumbs
                    sx={{ display: "inline" }}
                    heading={`Editar: ${correlativeToString(contract?.correlative)} `}
                    links={[
                        { name: 'Inicio', href: paths.dashboard.root },
                        { name: 'Contratos', href: paths.dashboard.contracts.root },
                        { name: `${contract?.client?.profile?.name} ${contract?.client?.profile?.lastName ?? ""}` },
                    ]}
                />
                <ContractForm
                    callback={redirectData}
                    contract={contract ? contractToNewContract(contract) : undefined}
                />
            </Container>
        </SearchIdNotFound>
    );
}

