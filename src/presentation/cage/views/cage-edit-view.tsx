import { Container } from '@mui/material';
import { paths } from '../../../app/routes/paths';
import { useRouter } from '../../../app/routes/hooks/use-router';
import SearchIdNotFound from '../../../app/routes/guard/search-id-not-found';
import { capitalize } from '../../../modules/shared/domain/helpers';
import CustomBreadcrumbs from '../../../components/custom-breadcrumbs/custom-breadcrumbs';
import { CageForm } from '../components/form/cage-form';
import { useSearchByIdCage } from '../hooks/use-search-by-id-cage';

type Props = {
    id: string;
}

export default function CageEditView({ id }: Props) {
    const router = useRouter();

    const { cage, error, isLoading } = useSearchByIdCage(id);
    const redirectData = () => router.push(paths.dashboard.cages.root);

    return (
        <SearchIdNotFound isLoading={isLoading} data={!!cage} error={error}>
            <Container maxWidth='xl'>
                <CustomBreadcrumbs
                    sx={{ display: "inline" }}
                    heading={`Editar: ${capitalize(cage?.modelCage)} `}
                    links={[
                        { name: 'Inicio', href: paths.dashboard.root },
                        { name: 'Jaulas', href: paths.dashboard.cages.root },
                        { name: `${capitalize(cage?.modelCage)}` },
                    ]}
                />
                <CageForm callback={redirectData} cage={cage} />
            </Container>
        </SearchIdNotFound>
    );
}

