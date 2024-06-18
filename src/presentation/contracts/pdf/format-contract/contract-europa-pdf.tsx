

import { Document, Image, Page, StyleSheet, Text, View, Font } from '@react-pdf/renderer';
import { pdfStyles } from '../../../../theme/pdf';
import { fCurrency } from '../../../../modules/shared/domain/helpers/format-number';
import { fDateTimeLong } from '../../../../modules/shared/infrastructure/helpers/format-time';
import { logoBase64 } from '../../../../components/logo/logo-base64';
import { signatureChristianBase64 } from '../utils/signature-christian';
import { destination, numberPets, priceToPay } from '../utils/contract-pdf-utils';
import { numberToWords } from '../../../../modules/shared/domain/helpers/formar-number-words';
import { ContractProps } from './types';

Font.register({
    family: 'Roboto',
    fonts: [
        { src: '/fonts/Roboto-Regular.ttf' },
        { src: '/fonts/Roboto-Bold.ttf' }
    ]
});

const styles = StyleSheet.create({ ...pdfStyles });

const SpacePdf = ({ marginBottom = 2 }: { marginBottom?: number }) => (
    <Text style={{ marginBottom }} />
)
const Bar = () => (
    <Text style={{ marginTop: 2, marginBottom: 1, height: 3, width: "100%", backgroundColor: "#002060" }} />
)


const ContractEuropaPdf = ({ contract }: ContractProps) => {

    return (
        <Document>
            <Page size='A4' style={styles.page} >
                <View style={{ ...styles.container, textAlign: "justify" }} >
                    <Image
                        src={logoBase64}
                        style={{
                            maxHeight: 50,
                            maxWidth: 130
                        }}
                    />
                    <Bar />
                    <SpacePdf marginBottom={10} />
                    <View style={{ ...styles.gridRow, display: "flex", justifyContent: "center", width: "100%" }}>
                        <Text style={{ ...styles.title, width: "65%", ...styles.important, borderBottom: "2px solid #000" }}>CONTRATO DE SERVICIOS PARA LA EXPORTACIÓN DE MASCOTAS</Text>
                    </View>


                    <SpacePdf marginBottom={10} />
                    <View>
                        <Text>
                            Por el presente contrato, el Sr. Christian F. Suarez Núñez Del Prado, identificado con número DNI 41233194 y representante legal de Pet Travel Perú con número de RUC: 10412331945, encargado de la gestión y documentación para el viaje de mascotas, deja constancia que:
                        </Text>
                    </View>
                    <SpacePdf marginBottom={10} />


                    <View>
                        <Text style={{ fontWeight: "bold" }}>
                            El
                            {contract.client.profile.gender === "male" && "Sr."}
                            {contract.client.profile.gender === "female" && "Sra."}
                            {contract.client.profile.gender !== "female" && contract.client.profile.gender !== "male" && "Sr./Sra."}

                            <Text style={{ fontWeight: "normal" }}>{contract?.client?.profile?.name} {contract?.client?.profile?.secondName} {contract?.client?.profile?.lastName}  {contract?.client?.profile?.secondLastName}</Text>
                        </Text>

                        <Text style={{ fontWeight: "bold" }}>
                            Identificado con {contract.client.profile.document}<Text style={{ fontWeight: "normal" }}> N°{contract.client.profile.documentNumber}</Text>
                        </Text>

                        <Text>
                            Realizará el pago por la suma de {fCurrency(contract.price)} {` (${numberToWords(contract.price)}) `}, para efectos de trámites de envío de ({numberPets(contract.details.length)}) mascota{contract.details.length > 1 && "s"} cuyo país de destino es: {destination(contract)}.
                        </Text>
                    </View>


                    <SpacePdf marginBottom={10} />

                    {
                        contract.details.map((detail, index) => (
                            <View key={detail.id}>
                                <Text style={{ fontWeight: "bold" }}>
                                    ACTIVIDADES QUE INCLUYE EL CONTRATO{contract.details.length > 1 && ` ${numberPets(index + 1)}`}:
                                </Text>
                                {
                                    detail.documentation.chipCertificate.hasServiceIncluded &&
                                    <Text>
                                        - Implantación de microchip
                                    </Text>
                                }
                                {
                                    detail.documentation.vaccinationCertificate.hasServiceIncluded &&
                                    <>
                                        <Text>
                                            - Certificado de vacunas
                                        </Text>
                                        <Text>
                                            - Vacunación completa
                                        </Text>
                                    </>
                                }


                                {detail.documentation.healthCertificate.hasServiceIncluded &&
                                    <Text>
                                        - Certificado de salud
                                    </Text>
                                }

                                {
                                    detail.documentation.rabiesSeroLogicalTest.hasServiceIncluded &&
                                    <>
                                        <Text>
                                            - Toma de muestra de sangre (al mes de vacunados) y centrifugación de la misma para la obtención del suero para los análisis de titulación de anticuerpos de la rabia. REPORT FAVN.
                                        </Text>
                                        <Text>
                                            - Envío de la muestra vía fedex cargo para el laboratorio (homologado por la Comunidad Europea).
                                        </Text>
                                    </>
                                }

                                {detail.documentation.senasaDocuments.hasServiceIncluded &&
                                    <Text>
                                        - Apertura de expediente ante el Ministerio de Agricultura del Perú, SENASA-Lima.  *La mascota será llevada a SENASA y será retornada por la tarde para que el propietario pueda recoger a la mascota en nuestras oficinas*
                                    </Text>
                                }

                                {detail.documentation.importLicense.hasServiceIncluded &&
                                    <Text>
                                        - Solicitud de permiso de importación zoo sanitaria según país de destino.
                                    </Text>
                                }
                                {detail.documentation.emotionalSupportCertificate.hasServiceIncluded &&
                                    <Text>
                                        - Certificado de soporte emocional
                                    </Text>
                                }

                                {detail.travel.typeTraveling === "charge" &&
                                    <Text>
                                        - Envió de mascota por cargo
                                    </Text>
                                }
                                {detail.travel.hasServiceAccompanied &&
                                    <Text>
                                        - Servicio de acompañamiento al aeropuerto.
                                    </Text>
                                }
                            </View>
                        ))
                    }



                    <SpacePdf marginBottom={10} />
                    <View >
                        <Text style={{ fontWeight: "bold", textDecoration: "underline" }}>
                            NOTAS IMPORTANTES:
                        </Text>
                        <SpacePdf marginBottom={10} />
                        <Text>
                            Nota 1: en caso de que “EL CONTRATANTE” solicite la anulación del presente contrato deberá cancelar los servicios prestados y una penalidad de $ 150.00. Es responsabilidad del cliente- “EL CONTRATANTE”, averiguar, consultar o preguntar sobre el avance de cada uno de los procesos que se realizará según este acuerdo – contrato.
                        </Text>
                        <Text >
                            Los clientes que realicen pagos con tarjeta y soliciten la anulación del contrato le será descontado el 5% del monto, el cual es retenido por la empresa Izipai al momento del pago.
                        </Text>
                        <SpacePdf marginBottom={10} />
                        <Text>
                            Nota 2: La emisión del certificado de salud está estrictamente ligado al estado de salud de la mascota al momento de la evaluación. Si la mascota presenta pulgas, garrapatas, heridas, otitis, problemas dermatológicos u otra afección visible, no se podrá emitir el certificado de salud ni el Zoosanitario de Senasa.
                        </Text>
                        <SpacePdf marginBottom={10} />
                        <Text>
                            Nota 3:  Si la mascota ha tomado medicamentos o ha pasado por algún tratamiento médico, se tendrá que reprogramar la muestra de sangre y la colocación de vacunas. Con respecto a la prueba serológica, el resultado positivo o negativo de este análisis dependerá netamente de la carga inmune de su mascota, Pet travel se hace responsable de llevar a cabo la logística de dicho trámite mas no del resultado.
                        </Text>
                        <Text>
                            En caso el cliente no realice el 2do pago en la fecha establecida en el presente contrato no se continuarán los procesos médicos y administrativos (envío de muestra para análisis serológico y revacunas) esto podría atrasar la fecha de viaje de la/las mascotas.
                        </Text>
                        <SpacePdf marginBottom={10} />
                        <Text>
                            Nota 4: El cliente debe asegurarse que la aerolínea le permitirá el traslado de su mascota, según peso y medidas máximas que permita la aerolínea y DEBE NOTIFICAR A SU ASESORA SU FECHA DE VIAJE ENVIÁNDONOS SU BOLETO (MÍNIMO 10 DÍAS ANTES DEL VIAJE) PARA COORDINAR LA ENTREGA DE LA DOCUMENTACIÓN EN FÍSICO EN LA VETERINARIA.
                        </Text>
                        <SpacePdf marginBottom={10} />
                        <Text>
                            Nota 5: La documentación, requisitos y vigencia de los documentos está sujeta a los cambios dispuestos por el país de destino, Pet Travel no se hace responsable de ello.
                        </Text>
                    </View>
                    <SpacePdf marginBottom={10} />
                    <View>
                        <Text style={{ width: "20%", borderBottom: "1px solid #000" }}>
                            De los pagos o abonos:
                        </Text>
                        <Text>
                            Este será abonado de la siguiente manera:
                        </Text>
                        <SpacePdf marginBottom={10} />
                        <Text>
                            {priceToPay(contract)}
                        </Text>

                        <SpacePdf marginBottom={10} />
                        <Text>
                            Lima,{fDateTimeLong(contract.startDate)}
                        </Text>
                    </View>
                    <Image
                        src={signatureChristianBase64}
                        style={{
                            maxHeight: 50,
                            maxWidth: 50
                        }}
                    />
                    <View style={{ ...styles.gridRow }}>
                        <View style={{ width: "50%" }}>
                            <Text style={{ textAlign: "left" }}>Conforme</Text>
                            <Text>Christian F. Suarez Núñez Del Prado</Text>
                        </View>
                        <View style={{ width: "50%" }}>
                            <Text>Conforme</Text>
                            <Text>
                                {contract.client.profile.gender === "male" && "Sr."}
                                {contract.client.profile.gender === "female" && "Sra."}
                                {contract.client.profile.gender !== "male" && contract.client.profile.gender !== "female" && "Sr/Sra."}
                            </Text>
                            <Text>Identificación:</Text>
                            <Text>Dirección:</Text>
                            <Text>Teléfonos:</Text>
                        </View>
                    </View>


                    <SpacePdf marginBottom={10} />
                    <Bar />
                    <View style={{ width: "100%" }}>
                        <Text style={{ width: "100%" }} />
                        <View style={{ width: "100%", textAlign: "right" }} >
                            <Text style={{ ...styles.small, color: "#555" }}>
                                Av. Mariátegui 1030 Jesús María, Lima –Perú
                            </Text>
                            <Text style={{ ...styles.small, color: "#555" }}>
                                www.pettravelperu.com
                            </Text>
                        </View>
                    </View>
                </View>
            </Page>
        </Document >
    )
}



export default ContractEuropaPdf