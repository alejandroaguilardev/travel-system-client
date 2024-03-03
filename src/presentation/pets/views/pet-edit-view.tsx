import { Container } from '@mui/material';
import { paths } from '../../../app/routes/paths';
import { useRouter } from '../../../app/routes/hooks/use-router';
import SearchIdNotFound from '../../../app/routes/guard/search-id-not-found';
import { capitalize } from '../../../modules/shared/domain/helpers';
import CustomBreadcrumbs from '../../../components/custom-breadcrumbs/custom-breadcrumbs';
import { PetForm } from '../components/form/pet-form';
import { useSearchByIdPet } from '../hooks/use-search-by-id-pet';

type Props = {
    id: string;
}

export default function PetEditView({ id }: Props) {
    const router = useRouter();

    const { pet, error, isLoading } = useSearchByIdPet(id);
    const redirectData = () => router.push(paths.dashboard.pets.root);

    return (
        <SearchIdNotFound isLoading={isLoading} data={!!pet} error={error}>
            <Container maxWidth='xl'>
                <CustomBreadcrumbs
                    sx={{ display: "inline" }}
                    heading={`Editar: ${capitalize(pet?.name)} `}
                    links={[
                        { name: 'Inicio', href: paths.dashboard.root },
                        { name: 'Mascotas', href: paths.dashboard.pets.root },
                        { name: `${capitalize(pet?.name)}` },
                    ]}
                />
                <PetForm callback={redirectData} pet={pet} adopterId={pet?.adopter} />
            </Container>
        </SearchIdNotFound>
    );
}

