import { Container } from '@mui/material';
import { paths } from '../../../../app/routes/paths';
import SearchIdNotFound from '../../../../app/routes/guard/search-id-not-found';
import CustomBreadcrumbs from '../../../../components/custom-breadcrumbs/custom-breadcrumbs';
import { useSearchByIdContract } from '../../hooks/use-search-by-id-contract';
import { NotFoundView } from '../../../error';
import { AccordionPet } from '../../components/accordion-pet/accordion-pet';
import { useRouter } from '../../../../app/routes/hooks/use-router';
import { TopicTabs, TopicoForm } from '../../components/form-topico/topico-form';
import { DetailInfoContext, DetailInfoProvider } from '../../context/contract-detail-context';

type Props = {
    id: string;
    action?: string;
}

export default function ContractTopicoManagementView({ id, action = TopicTabs.admission }: Props) {
    const router = useRouter();

    const { contract: contractSearch, error, isLoading } = useSearchByIdContract(id);

    if (isLoading) return null
    if (!contractSearch) return <NotFoundView />
    return (
        <SearchIdNotFound isLoading={isLoading} data={!!contractSearch} error={error}>
            <Container maxWidth='xl'>
                <CustomBreadcrumbs
                    sx={{ display: "inline" }}
                    heading={`Requisitos de Topico: ${contractSearch?.number} `}
                    links={[
                        { name: 'Inicio', href: paths.dashboard.root },
                        { name: 'Topico', href: paths.dashboard.faseDocumentation.topico.list },
                        { name: `${contractSearch?.number}` },
                    ]}
                />
                <DetailInfoProvider defaultContract={contractSearch}>
                    <DetailInfoContext.Consumer>
                        {({ contract }) => <>
                            {contract.details?.map((detail, index) => (
                                <AccordionPet detail={detail} key={detail.id} index={index}>
                                    <TopicoForm
                                        detail={detail}
                                        action={action}
                                        onCancel={() => router.back()}
                                        contractId={id}
                                        clientId={contract.client.id}
                                    />
                                </AccordionPet>
                            ))}
                        </>
                        }
                    </DetailInfoContext.Consumer>
                </DetailInfoProvider>
            </Container>
        </SearchIdNotFound>
    );
}

