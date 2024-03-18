

import { Document, Image, Page, StyleSheet, Text, View } from '@react-pdf/renderer';
import { pdfStyles } from '../../../theme/pdf';
import { Contract } from '../../../modules/contracts/domain/contract';
import { logoBase64 } from '../../../components/logo/logo-base64';
import { signatureChristianBase64 } from './signature-christian';
import { fDateTimeLong } from '../../../modules/shared/infrastructure/helpers/format-time';
import { destination, numberPets, priceToPay } from './contract-pdf-utils';
import { fCurrency } from 'src/modules/shared/domain/helpers/format-number';

const styles = StyleSheet.create({ ...pdfStyles });

const SpacePdf = ({ marginBottom = 2 }: { marginBottom?: number }) => (
    <Text style={{ marginBottom }} />
)

export interface ContractProps {
    contract: Contract;
}

interface Props extends ContractProps { }


const ContractPdf = ({ contract }: Props) => {

    return (
        <Document>
            <Page size='A4' style={styles.page} >
                <View style={styles.container}>
                    <Image
                        src={logoBase64}
                        style={{
                            maxHeight: 50,
                            maxWidth: 150
                        }}
                    />
                    <SpacePdf marginBottom={20} />
                    <View style={{ ...styles.gridRow, display: "flex", justifyContent: "center", width: "100%" }}>
                        <Text style={{ ...styles.title, width: "65%", ...styles.important, borderBottom: "1px solid #000" }}> CONTRATO DE SERVICIOS PARA LA EXPORTACIÓN DE MASCOTAS</Text>
                    </View>


                    <SpacePdf marginBottom={10} />
                    < View>
                        <Text>
                            Por el presente contrato, el Sr. Christian F. Suarez Nuñez Del Prado, identificado con número DNI 41233194 y representante legal de Pet Travel Perú con número de RUC: 10412331945, encargado de la gestión y documentación para el viaje de mascotas, deja constancia que,
                        </Text>
                    </View>
                    <SpacePdf marginBottom={10} />


                    <View>
                        <Text>
                            El Sra Jackeline Elizabeth Jimenez Hummel
                        </Text>

                        <Text>
                            Identificado con número de {contract.client.profile.document} N°{contract.client.profile.documentNumber}
                            Realizará el pago por la suma de {fCurrency(contract.price)} (quinientos cincuenta dólares), para efectos de trámites y gestión de permisos zoosanitarios de exportación de {numberPets(contract.details.length)} {destination(contract)}.
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
                                        • Verificación de implantación de microchip.
                                    </Text>
                                }
                                {
                                    detail.documentation.vaccinationCertificate.hasServiceIncluded &&
                                    <Text>
                                        • Vacunación de vacuna antirrábica.
                                    </Text>
                                }
                                {
                                    detail.documentation.rabiesSeroLogicalTest.hasServiceIncluded &&
                                    <>
                                        <Text>
                                            • Toma de muestra de sangre para análisis serológico de anticuerpos de la rabia.
                                        </Text>
                                        <Text>
                                            • Envío de la muestra de sangre a un laboratorio homologado por la Unión Europea (vía fedex) USA.
                                        </Text>
                                        <Text>
                                            • Seguimiento y recepción de los resultados FAVN (de rabia) de la muestra enviada al laboratorio homologado por la comunidad Europea. (el resultado de la prueba deberá consignar mayor o igual 0.5 para seguir con los procedimientos).
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
                                    <>
                                        <Text>
                                            • Apertura de expediente ante el Ministerio de Agricultura del Perú, SENASA-Lima.
                                        </Text>
                                        <Text>
                                            • La entrega final de los documentos zoo sanitario de exportación SENASA se entregará en coordinación con el contratante.
                                        </Text>
                                    </>
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
                    <View>
                        <Text style={{ width: "20%", borderBottom: "1px solid #000" }}>
                            De los pagos o abonos:
                        </Text>
                        <SpacePdf marginBottom={10} />
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


                    <SpacePdf marginBottom={20} />
                    <Image
                        src={signatureChristianBase64}
                        style={{
                            maxHeight: 100,
                            maxWidth: 100
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


                    <SpacePdf marginBottom={20} />
                    <View style={{ height: 50, padding: "10px", backgroundColor: "#5546e8", width: "100%" }}>
                        <Text style={{ width: "100%" }} />
                        <View style={{ width: "100%", textAlign: "right" }} >
                            <Text style={{ ...styles.textWhite, ...styles.small }}>
                                Av. el ejército 391, miraflores, Lima – Perú
                            </Text>
                            <Text style={{ ...styles.textWhite, ...styles.small }}>
                                www.pettravelperu.com
                            </Text>
                            <Text style={{ ...styles.textWhite, ...styles.small }}>
                                Teléfonos: (51) 1-7594451 / (51) 994748870
                            </Text>
                        </View>
                    </View>
                </View>
            </Page>
        </Document >
    )
}
export default ContractPdf