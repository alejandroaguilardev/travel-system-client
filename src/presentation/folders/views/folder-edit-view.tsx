import { Container } from '@mui/material';
import { paths } from '../../../app/routes/paths';
import { useRouter } from '../../../app/routes/hooks/use-router';
import SearchIdNotFound from '../../../app/routes/guard/search-id-not-found';
import { capitalize } from '../../../modules/shared/domain/helpers';
import CustomBreadcrumbs from '../../../components/custom-breadcrumbs/custom-breadcrumbs';
import { FolderForm } from '../components/form/folder-form';
import { useSearchByIdFolder } from '../hooks/use-search-by-id-folder';

type Props = {
    id: string;
}

export default function FolderEditView({ id }: Props) {
    const router = useRouter();

    const { folder, error, isLoading } = useSearchByIdFolder(id);
    const redirectData = () => router.push(paths.dashboard.folders.root);

    return (
        <SearchIdNotFound isLoading={isLoading} data={!!folder} error={error}>
            <Container maxWidth='xl'>
                <CustomBreadcrumbs
                    sx={{ display: "inline" }}
                    heading={`Editar: ${capitalize(folder?.name)} `}
                    links={[
                        { name: 'Inicio', href: paths.dashboard.root },
                        { name: 'Expedientes', href: paths.dashboard.folders.root },
                        { name: `${capitalize(folder?.name)}` },
                    ]}
                />
                <FolderForm callback={redirectData} folder={folder} />
            </Container>
        </SearchIdNotFound>
    );
}

