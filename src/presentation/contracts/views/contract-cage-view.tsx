import { Container } from '@mui/material';
import { paths } from '../../../app/routes/paths';
import SearchIdNotFound from '../../../app/routes/guard/search-id-not-found';
import CustomBreadcrumbs from '../../../components/custom-breadcrumbs/custom-breadcrumbs';
import { useSearchByIdContract } from '../hooks/use-search-by-id-contract';
import { CageForm } from '../../client/components/cage/form/cage-form';
import { NotFoundView } from '../../error';
import { AccordionPet } from '../components/accordion-pet/accordion-pet';
import { useRouter } from '../../../app/routes/hooks/use-router';

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
                {contract.details.map((detail, index) => (
                    <AccordionPet detail={detail} index={index} key={detail.id}>
                        <CageForm
                            noShowButton={false}
                            onCancel={redirectData}
                            callback={() => false}
                            contractId={id}
                            detailId={detail.id}
                            cage={detail.cage}
                            hasServiceIncluded={detail.cage.hasServiceIncluded}
                            user
                        />
                    </AccordionPet>
                ))}
            </Container>
        </SearchIdNotFound>
    );
}

