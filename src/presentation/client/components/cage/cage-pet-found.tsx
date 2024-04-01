import { Alert, Box } from '@mui/material'
import { Pet } from '../../../../modules/pets/domain/pet';
import { ReactNode } from 'react';

type Props = {
    pet?: Pet;
    children: ReactNode;
}

export const CagePetFound = ({ pet, children }: Props) => {
    return (
        <>
            {
                pet?.cageRecommendation?.modelCage ?
                    children

                    :
                    <Box display="flex" alignItems="center" flexDirection="column" px={{ xs: 3, md: 10 }} gap={2}>
                        <Alert severity='error' sx={{ mb: 2, width: "100%" }} >
                            La recomendación de la jaula por parte de Pet Travel aún no se ha realizado. Se requieren las medidas de la mascota antes de procede
                        </Alert>
                        <Alert severity='info' sx={{ mb: 5 }} >
                            Por favor, póngase en contacto con Pet Travel para coordinar el proceso de medición de su mascota y así poder proceder con la recomendación adecuada de la jaula.
                        </Alert>
                    </Box>
            }
        </>
    )
}
