import { Helmet } from 'react-helmet-async';
import SearchIdNotFoundParams from '../../../../routes/guard/search-id-not-found-params';
import { AuthGroup } from '../../../../../modules/auth/domain/auth-permission';
import PetIdView from '../../../../../presentation/pets/views/pet-id-view';
import PetEditView from '../../../../../presentation/pets/views/pet-edit-view';

export default function PetIdPage() {
    return (
        <>
            <Helmet>
                <title> Dashboard  Mascotas</title>
            </Helmet>
            <SearchIdNotFoundParams
                Edit={PetEditView}
                View={PetIdView}
                group={AuthGroup.PETS}
            />
        </>
    );
}