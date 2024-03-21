import { Container } from '@mui/material';
import { paths } from '../../../../app/routes/paths';
import SearchIdNotFound from '../../../../app/routes/guard/search-id-not-found';
import CustomBreadcrumbs from '../../../../components/custom-breadcrumbs/custom-breadcrumbs';
import { useSearchByIdContract } from '../../hooks/use-search-by-id-contract';
import { useRouter } from '../../../../app/routes/hooks/use-router';
import { NotFoundView } from '../../../error';
import { TravelForm } from '../../../client/components/travel/form/travel-form';
import { AccordionPet } from '../../components/accordion-pet/accordion-pet';

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
                    heading={`Requisitos de Viaje: ${contract?.client.profile.name} ${contract.client.profile.lastName}`}
                    links={[
                        { name: 'Inicio', href: paths.dashboard.root },
                        { name: 'Contratos', href: paths.dashboard.contracts.root },
                        { name: `${contract?.client.profile.name} ${contract.client.profile.lastName}` },
                    ]}
                />
                {contract.details.map((detail, index) => (
                    <AccordionPet detail={detail} key={detail.id} index={index}>
                        <TravelForm
                            onCancel={redirectData}
                            callback={() => false}
                            contractId={id}
                            detailId={detail.id}
                            travel={detail.travel}
                            hasServiceIncluded={detail.travel.hasServiceIncluded}
                            user
                        />
                    </AccordionPet>
                ))}
            </Container>
        </SearchIdNotFound>
    );
}

