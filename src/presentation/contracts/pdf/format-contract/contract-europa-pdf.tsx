

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
                <View style={{ ...styles.container }} >
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
                    < View>
                        <Text>
                            Por el presente contrato, el Sr. Christian F. Suarez Nuñez Del Prado, identificado con número D.N.I 41233194 y representante legal de Pet Travel Perú con número de R.U.C: 10412331945, encargado de la gestión y documentación para el viaje de mascotas, deja constancia que,
                        </Text>
                    </View>
                    <SpacePdf marginBottom={10} />


                    <View>
                        <Text style={{ fontWeight: "bold" }}>
                            El Sr/Sra. <Text style={{ fontWeight: "normal" }}>{contract?.client?.profile?.name} {contract?.client?.profile?.secondName} {contract?.client?.profile?.lastName}  {contract?.client?.profile?.secondLastName}</Text>
                        </Text>

                        <Text style={{ fontWeight: "bold" }}>
                            Identificado con número de {contract.client.profile.document}<Text style={{ fontWeight: "normal" }}> N°{contract.client.profile.documentNumber}</Text>
                        </Text>

                        <Text>
                            Realizará el pago por la suma de {fCurrency(contract.price)} {` (${numberToWords(contract.price)}) `}, para efectos de trámites y gestión de permisos zoosanitarios de exportación de {numberPets(contract.details.length)} {destination(contract)}.
                        </Text>
                    </View>


                    <SpacePdf marginBottom={10} />

                    {
                        contract.details.map((detail, index) => (
                            <View key={detail.id}>
                                <Text style={{ fontWeight: "bold" }}>
                                    De las actividades de la mascota {numberPets(index + 1)}:
                                </Text>
                                {
                                    detail.documentation.chipCertificate.hasServiceIncluded &&
                                    <Text>
                                        • Implantación de microchip y/o lectura de microchip con certificado
                                    </Text>
                                }
                                {
                                    detail.documentation.vaccinationCertificate.hasServiceIncluded &&
                                    <Text>
                                        • Vacunación total y/o parcial  y certificación.
                                    </Text>
                                }
                                {
                                    detail.documentation.rabiesSeroLogicalTest.hasServiceIncluded &&
                                    <>
                                        <Text>
                                            • Toma de muestra de sangre para análisis serológico de anticuerpos de la rabia.
                                        </Text>
                                        <Text>
                                            •- Envío de la muestra vía fedex cargo para el laboratorio (homologado por la Comunidad Europea y por el Estado Americano).
                                        </Text>
                                    </>
                                }

                                {detail.documentation.importLicense.hasServiceIncluded &&
                                    <Text>
                                        • Solicitud de permiso de importación zoo sanitaria según país de destino.
                                    </Text>
                                }

                                {detail.documentation.healthCertificate.hasServiceIncluded &&
                                    <Text>
                                        • Certificado de salud
                                    </Text>
                                }

                                {detail.documentation.senasaDocuments.hasServiceIncluded &&
                                    <Text>
                                        • Apertura de expediente ante el Ministerio de Agricultura del Perú, SENASA-Lima.  *La mascota será llevada a SENASA y será retornada por la tarde para que el propietario pueda recoger a la mascota en nuestras oficinas*
                                    </Text>
                                }
                                {detail.documentation.emotionalSupportCertificate.hasServiceIncluded &&
                                    <Text>
                                        • Certificado de soporte emocional
                                    </Text>
                                }

                                {detail.travel.typeTraveling === "charge" &&
                                    <Text>
                                        • Envió de mascota por cargo
                                    </Text>
                                }
                                {detail.travel.hasServiceAccompanied &&
                                    <Text>
                                        • Servicio de acompañamiento al aeropuerto.
                                    </Text>
                                }
                            </View>
                        ))
                    }



                    <SpacePdf marginBottom={10} />
                    <View style={{ fontSize: 9 }}>
                        <Text>
                            <Text style={{ fontWeight: "bold" }}>Nota 1:</Text> en caso de que “EL CONTRATANTE” solicite la anulación del presente contrato deberá cancelar los servicios prestados y una penalidad de $ 150.00.
                        </Text>
                        <Text>
                            <Text style={{ fontWeight: "bold" }}>Nota 2:</Text>(DEPENDE DE LA OPCIÓN QUE OPTE EL CLIENTE): La aprobación del ingreso de la mascota a {destination(contract)} depende de la aceptación por parte de la CDC en el país destino, solicitud que debe de realizar el mismo cliente. El pago de nuestros servicios y la realización de los trámites mencionados en la presente cotización no garantiza el ingreso de las mascotas a {destination(contract)}. En caso se opte por la opción 2, el cliente debe de solicitar la reserva para la aplicación de vacuna de rabia previo al ingreso a {destination(contract)}.
                        </Text>
                        <Text>
                            <Text style={{ fontWeight: "bold" }}>Nota 3:</Text> Recuerde que la CDC indica que es OBLIGATORIO vacunar contra la rabia a su mascota dentro de los 10 primeros días de su llegada a {destination(contract)}, esta información se encuentra indicada en el permiso de importación que le otorgará la CDC.
                            Es responsabilidad del cliente- “EL CONTRATANTE”, averiguar, consultar o preguntar sobre el avance de cada uno de los procesos que se realizará según este acuerdo – contrato.
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
                            El Sr. Christian F. Suarez Núñez Del Prado representante de Pet Travel Perú, garantiza el inicio y la culminación total del servicio ofrecido.
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