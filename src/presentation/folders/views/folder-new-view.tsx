import { Container } from '@mui/material';
import { paths } from '../../../app/routes/paths';
import { useRouter } from '../../../app/routes/hooks/use-router';
import CustomBreadcrumbs from '../../../components/custom-breadcrumbs/custom-breadcrumbs';
import { FolderForm } from '../components/form/folder-form';


export default function FolderNewView() {
    const router = useRouter();

    const redirectData = () => router.push(paths.dashboard.folders.root);

    return (
        <Container maxWidth='xl'>
            <CustomBreadcrumbs
                sx={{ display: "inline" }}
                heading="Crear nueva expediente"
                links={[
                    { name: 'Inicio', href: paths.dashboard.root },
                    { name: 'Expedientes', href: paths.dashboard.folders.root },
                    { name: `Crear` },
                ]}
            />
            <FolderForm callback={redirectData} />
        </Container>
    );
}

