import { Container } from '@mui/material';
import { paths } from '../../../../app/routes/paths';
import SearchIdNotFound from '../../../../app/routes/guard/search-id-not-found';
import CustomBreadcrumbs from '../../../../components/custom-breadcrumbs/custom-breadcrumbs';
import { useSearchByIdContract } from '../../hooks/use-search-by-id-contract';
import { NotFoundView } from '../../../error';
import { AccordionPet } from '../../components/accordion-pet/accordion-pet';
import { useRouter } from '../../../../app/routes/hooks/use-router';
import { DocumentationContractForm } from '../../components/form-documentation/documentation-form';
import { DetailInfoContext, DetailInfoProvider } from '../../context/contract-detail-context';
import { DOCUMENTATION_KEYS } from '../../../../modules/contracts/domain/contract-services/documentation/documentation';

type Props = {
    id: string;
    action?: string;

}

export default function ContractDocumentationUpdateView({ id, action = DOCUMENTATION_KEYS.chipCertificate }: Props) {
    const router = useRouter();

    const { contract: contractSearch, error, isLoading } = useSearchByIdContract(id);

    if (isLoading) return null
    if (!contractSearch) return <NotFoundView />
    return (
        <SearchIdNotFound isLoading={isLoading} data={!!contractSearch} error={error}>
            <Container maxWidth='xl'>
                <CustomBreadcrumbs
                    sx={{ display: "inline" }}
                    heading={`Requisitos de Documentación: ${contractSearch?.client?.profile?.name ?? ""} ${contractSearch?.client?.profile?.lastName ?? ""} `}
                    links={[
                        { name: 'Inicio', href: paths.dashboard.root },
                        { name: 'Contratos', href: paths.dashboard.contracts.root },
                        { name: `${contractSearch?.number}` },
                    ]}
                />
                <DetailInfoProvider defaultContract={contractSearch}>
                    <DetailInfoContext.Consumer>
                        {({ contract }) => <>
                            {contract.details?.map((detail, index) => (
                                <AccordionPet detail={detail} key={detail.id} index={index}>
                                    <DocumentationContractForm
                                        detail={detail}
                                        action={action}
                                        onCancel={() => router.back()}
                                        contractId={id}
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

