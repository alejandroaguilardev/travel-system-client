import { Container } from '@mui/material';
import { paths } from '../../../app/routes/paths';
import { useRouter } from '../../../app/routes/hooks/use-router';
import CustomBreadcrumbs from '../../../components/custom-breadcrumbs/custom-breadcrumbs';
import { ContractForm } from '../components/form/contract-form';


export default function ContractNewView() {
    const router = useRouter();
    const redirectData = () => router.push(paths.dashboard.contracts.root);

    return (
        <Container maxWidth='xl'>
            <CustomBreadcrumbs
                sx={{ display: "inline" }}
                heading="Crear  nuevo contrato"
                links={[
                    { name: 'Inicio', href: paths.dashboard.root },
                    { name: 'Contracts', href: paths.dashboard.contracts.root },
                    { name: `Crear` },
                ]}
            />
            <ContractForm callback={redirectData} />
        </Container>
    );
}

