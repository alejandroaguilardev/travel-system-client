import { useEffect, useState } from 'react';
import { Alert, Box, Container, Typography } from '@mui/material';
import { AccompaniedForm } from '../components/accompanied-form/accompanied-form';
import { HeadLogin } from '../../auth/components/head-login';
import { useSearchByIdContractDetail } from '../../contracts/hooks/use-search-by-id-contract.-detail';
import Button from '@mui/material/Button';
import RouterLink from '../../../app/routes/components/router-link';
import { LoadingScreen } from '../../../components/loading-screen';
import { NotFoundView } from '../../../presentation/error';
import { AccompaniedStep } from '../components/accompanied-form/steps/accompanied-steps';
import { useMessage } from '../../../hooks/use-message';
import { SubmitHandler } from 'react-hook-form';
import { TravelAccompaniedSchema } from '../components/accompanied-form/accompanied-validation';
import { accompaniedFormat } from '../../../modules/contracts/application/travel/accompanied-pet';
import { HOST_API } from '../../../app/config/config-global';
import { endpoints } from 'src/modules/shared/domain/endpoint';
import axios from 'axios';
import { errorsShowNotification } from '../../../modules/shared/infrastructure/helpers/errors-show-notification';
import { travelAccompaniedPetValidate } from '../../../modules/contracts/domain/contract-services/travel/travel-accompanied-pet';
import { travelDestinationValidate } from '../../../modules/contracts/domain/contract-services/travel/travel-destination';
import { travelPetPerChargeValidate } from '../../../modules/contracts/domain/contract-services/travel/travel-pet-per-charge';
import { uploadImage } from '../../../modules/shared/infrastructure/upload/upload-image';
import { useLoadImage } from '../../../hooks/use-load-image';
import { useFileImageStore } from '../../../state/upload/file-image-store';

type Props = {
    contractId: string;
    contractDetailId: string;
    token: string;
}

export default function AccompaniedPetView({ contractId, contractDetailId, token }: Props) {
    const [isUpdate, setIsUpdate] = useState(false);

    const { isLoading, contractDetail } = useSearchByIdContractDetail(contractId, contractDetailId, token);
    const { imageFile: imagePassport } = useLoadImage("arraybuffer", "private", contractDetail?.travel.accompaniedPet?.image, token);
    const { fileImage } = useFileImageStore();

    const { showNotification } = useMessage();

    const onSubmit: SubmitHandler<TravelAccompaniedSchema> = async (dataForm) => {
        try {
            const { accompaniedPet, destination, petPerCharge, observation } = dataForm;
            const { updatedAccompaniedPet, updatedTravelDestination, updatedTravelPetPerCharge } = accompaniedFormat(accompaniedPet, destination, petPerCharge);

            let image = accompaniedPet?.image ?? "";

            if (fileImage) {
                image = await uploadImage(fileImage, `${accompaniedPet.document}-${accompaniedPet.documentNumber}`, "private")
            }

            const axiosInstance = axios.create({ baseURL: HOST_API });
            await axiosInstance.patch(`${endpoints.contracts.detail}/${contractId}/${contractDetailId}/accompanied`,
                {
                    accompaniedPet: { ...updatedAccompaniedPet, image },
                    destination: updatedTravelDestination,
                    petPerCharge: updatedTravelPetPerCharge,
                    observation
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            showNotification("Actualizado con éxito");
            setIsUpdate(true)
        } catch (error) {
            errorsShowNotification(error, showNotification)
        }
    };


    useEffect(() => {
        if (contractDetail) {
            const { accompaniedPet, destination, petPerCharge, typeTraveling } = contractDetail?.travel ?? {};
            const hasRequiredAccompaniedPetFields = travelAccompaniedPetValidate(accompaniedPet);
            const hasRequiredDestinationFields = travelDestinationValidate(destination);

            let hasRequiredPetChargeFields = true;
            if (typeTraveling === "charge") {
                hasRequiredPetChargeFields = travelPetPerChargeValidate(petPerCharge)
            }
            setIsUpdate(hasRequiredAccompaniedPetFields && hasRequiredDestinationFields && hasRequiredPetChargeFields);
        }
    }, [contractDetail])

    if (isLoading) return <LoadingScreen />;
    if (!contractDetail) return <NotFoundView />;



    return (
        <Container sx={{ my: 5 }}>
            <HeadLogin title=" Rellene el Formulario de los datos del Acompañante" />

            {
                isUpdate
                    ? <Box
                        display="flex"
                        justifyContent="center"
                        alignItems="center"
                        flexDirection="column"
                        boxShadow="0 4px 8px rgba(0, 0, 0, 0.1)"
                        bgcolor="white"
                        p={2}
                    >
                        <Alert severity="success" sx={{ mb: 2 }}>
                            ¡Actualización Exitosa!
                        </Alert>
                        <Typography variant="body1" align="center" sx={{ mb: 2 }}>
                            Los datos del acompañante se han actualizado con éxito en nuestro sistema. Agradecemos tu colaboración y estamos aquí para ayudarte en caso de alguna pregunta o inquietud.
                        </Typography>
                        <Button
                            component={RouterLink}
                            href="/"
                            size="large"
                            variant="contained"
                            sx={{ textAlign: 'center' }}
                        >
                            Ir a la página de inicio
                        </Button>
                    </Box>
                    : <>
                        <AccompaniedForm
                            travel={contractDetail?.travel}
                            contractId={contractId}
                            contractDetailId={contractDetailId}
                            callback={() => setIsUpdate(true)}
                            notButton={false}
                            onSubmit={onSubmit}
                        >
                            <AccompaniedStep
                                hasCharge={contractDetail?.travel?.typeTraveling === "charge"}
                                imagePassport={imagePassport}
                                notButton={false}
                                status={contractDetail?.travel?.status ?? "pending"}

                            />
                        </AccompaniedForm>
                    </>
            }
        </Container >
    );
}
