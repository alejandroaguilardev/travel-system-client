import { Container } from '@mui/material';
import { paths } from '../../../app/routes/paths';
import SearchIdNotFound from '../../../app/routes/guard/search-id-not-found';
import CustomBreadcrumbs from '../../../components/custom-breadcrumbs/custom-breadcrumbs';
import { useSearchByIdPet } from '../hooks/use-search-by-id-pet';
import PetDetail from '../components/details/pet-detail';

type Props = {
    id: string;
}

export default function PetIdView({ id }: Props) {
    const { pet, error, isLoading } = useSearchByIdPet(id);

    return (
        <SearchIdNotFound isLoading={isLoading} data={!!pet} error={error}>
            <Container maxWidth='xl'>
                <CustomBreadcrumbs
                    sx={{ display: "inline" }}
                    heading={`Visualizar: ${pet?.name}`}
                    links={[
                        { name: 'Inicio', href: paths.dashboard.root },
                        { name: 'Mascotas', href: paths.dashboard.pets.root },
                        { name: `${pet?.chip}` },
                    ]}
                />
                <PetDetail pet={pet!} />
            </Container>
        </SearchIdNotFound>
    );
}

