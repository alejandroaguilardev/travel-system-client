import { Container } from '@mui/material';
import { paths } from '../../../../app/routes/paths';
import SearchIdNotFound from '../../../../app/routes/guard/search-id-not-found';
import CustomBreadcrumbs from '../../../../components/custom-breadcrumbs/custom-breadcrumbs';
import { useSearchByIdContract } from '../../hooks/use-search-by-id-contract';
import { NotFoundView } from '../../../error';
import { AccordionPet } from '../../components/accordion-pet/accordion-pet';
import { useRouter } from '../../../../app/routes/hooks/use-router';
import { TOPICO_TABS, TopicoForm } from '../../components/form-topico/topico-form';
import { TopicoProvider } from '../../context/topico-context';

type Props = {
    id: string;
    action?: string;
}

export default function ContractTopicoManagementView({ id, action = TOPICO_TABS.measurementsAndWeightForm }: Props) {
    const router = useRouter();

    const { contract, error, isLoading } = useSearchByIdContract(id);

    if (isLoading) return null
    if (!contract) return <NotFoundView />
    return (
        <SearchIdNotFound isLoading={isLoading} data={!!contract} error={error}>
            <Container maxWidth='xl'>
                <CustomBreadcrumbs
                    sx={{ display: "inline" }}
                    heading={`Requisitos de Topico: ${contract?.number} `}
                    links={[
                        { name: 'Inicio', href: paths.dashboard.root },
                        { name: 'Topico', href: paths.dashboard.faseDocumentation.topico.list },
                        { name: `${contract?.number}` },
                    ]}
                />
                {contract.details.map((detail, index) => (
                    <AccordionPet detail={detail} key={detail.id} index={index}>
                        <TopicoProvider defaultValue={detail}>
                            <TopicoForm
                                action={action}
                                onCancel={() => router.back()}
                                contractId={id}
                            />
                        </TopicoProvider>
                    </AccordionPet>
                ))}
            </Container>
        </SearchIdNotFound>
    );
}

