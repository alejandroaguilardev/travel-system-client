import { Container } from '@mui/material';
import { paths } from '../../../app/routes/paths';
import SearchIdNotFound from '../../../app/routes/guard/search-id-not-found';
import CustomBreadcrumbs from '../../../components/custom-breadcrumbs/custom-breadcrumbs';
import { useSearchByIdFolder } from '../hooks/use-search-by-id-folder';
import FolderDetail from '../components/details/folder-detail';

type Props = {
    id: string;
}

export default function FolderIdView({ id }: Props) {
    const { folder, error, isLoading } = useSearchByIdFolder(id);

    return (
        <SearchIdNotFound isLoading={isLoading} data={!!folder} error={error}>
            <Container maxWidth='xl'>
                <CustomBreadcrumbs
                    sx={{ display: "inline" }}
                    heading={`Visualizar: ${folder?.name}`}
                    links={[
                        { name: 'Inicio', href: paths.dashboard.root },
                        { name: 'Expedientes', href: paths.dashboard.folders.root },
                        { name: `${folder?.name}` },
                    ]}
                />
                <FolderDetail folder={folder!} />
            </Container>
        </SearchIdNotFound>
    );
}

