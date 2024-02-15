import { Container } from '@mui/material';
import { paths } from '../../../app/routes/paths';
import SearchIdNotFound from '../../../app/routes/guard/search-id-not-found';
import CustomBreadcrumbs from '../../../components/custom-breadcrumbs/custom-breadcrumbs';
import { useSearchByIdCage } from '../hooks/use-search-by-id-cage';
import CageDetail from '../components/details/cage-detail';

type Props = {
    id: string;
}

export default function CageIdView({ id }: Props) {
    const { cage, error, isLoading } = useSearchByIdCage(id);

    return (
        <SearchIdNotFound isLoading={isLoading} data={!!cage} error={error}>
            <Container maxWidth='xl'>
                <CustomBreadcrumbs
                    sx={{ display: "inline" }}
                    heading={`Visualizar: ${cage?.modelCage}`}
                    links={[
                        { name: 'Inicio', href: paths.dashboard.root },
                        { name: 'Permisos', href: paths.dashboard.cages.root },
                        { name: `${cage?.modelCage}` },
                    ]}
                />
                <CageDetail cage={cage!} />
            </Container>
        </SearchIdNotFound>
    );
}

