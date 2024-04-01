import { Container } from '@mui/material';
import { paths } from '../../../../app/routes/paths';
import SearchIdNotFound from '../../../../app/routes/guard/search-id-not-found';
import CustomBreadcrumbs from '../../../../components/custom-breadcrumbs/custom-breadcrumbs';
import { useSearchByIdContract } from '../../hooks/use-search-by-id-contract';
import { NotFoundView } from '../../../error';
import { AccordionPet } from '../../components/accordion-pet/accordion-pet';
import { useRouter } from '../../../../app/routes/hooks/use-router';
import { DocumentationContractForm } from '../../components/form-documentation/documentation-form';
import { DetailInfoProvider } from '../../context/contract-detail-context';
import { DOCUMENTATION_KEYS } from '../../../../modules/contracts/domain/contract-services/documentation/documentation';

type Props = {
    id: string;
    action?: string;

}

export default function ContractDocumentationUpdateView({ id, action = DOCUMENTATION_KEYS.chipCertificate }: Props) {
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
                    heading={`Requisitos de Documentación: ${contract?.number} `}
                    links={[
                        { name: 'Inicio', href: paths.dashboard.root },
                        { name: 'Contratos', href: paths.dashboard.contracts.root },
                        { name: `${contract?.number}` },
                    ]}
                />
                {contract.details.map((detail, index) => (
                    <AccordionPet detail={detail} key={detail.id} index={index}>
                        <DetailInfoProvider defaultValue={detail}>
                            <DocumentationContractForm
                                action={action}
                                onCancel={() => router.back()}
                                contractId={id}
                            />
                        </DetailInfoProvider>
                    </AccordionPet>
                ))}
            </Container>
        </SearchIdNotFound>
    );
}

