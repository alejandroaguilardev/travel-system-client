

import { Document, Image, Page, StyleSheet, Text, View } from '@react-pdf/renderer';
import { pdfStyles } from '../../../../theme/pdf';
import { fDate } from '../../../../modules/shared/infrastructure/helpers/format-time';
import { logoBase64 } from '../../../../components/logo/logo-base64';
import { PET_GENDERS } from '../../../../modules/pets/domain/pet-gender';
import { ContractDetail } from '../../../../modules/contracts/domain/contract-detail';
import { Contract } from '../../../../modules/contracts/domain/contract';

const styles = StyleSheet.create({ ...pdfStyles });

const SpacePdf = ({ marginBottom = 2 }: { marginBottom?: number }) => (
    <Text style={{ marginBottom }} />
)

export interface ContractProps {
    contract: Contract;
    detail: ContractDetail;
}

interface Props extends ContractProps { }


const MicrochipCertificatePdf = ({ contract, detail }: Props) => {

    return (
        <Document>
            <Page size='A4' style={styles.page}  >
                <View style={{ ...styles.container, lineHeight: 1.8 }}>
                    <Image
                        src={logoBase64}
                        style={{
                            maxHeight: 50,
                            maxWidth: 150
                        }}
                    />
                    <SpacePdf marginBottom={20} />
                    <View style={{ ...styles.gridRow, display: "flex", justifyContent: "center", width: "100%" }}>
                        <Text style={{ ...styles.title, width: "65%", ...styles.important }}> CERTIFICADO DE IMPLANTACIÓN / LECTURA DE MICROCHIP</Text>
                    </View>


                    <SpacePdf marginBottom={10} />
                    <View style={{ ...styles.gridRow, justifyContent: "flex-start" }}>
                        <Text>Fecha:</Text>
                        <Text style={{ borderBottom: "1px solid #000", width: 50 }}> {fDate(detail?.pet?.chipDate, "DD/MM/YYYY")} </Text>
                    </View>
                    <SpacePdf marginBottom={10} />
                    <View style={{ ...styles.gridRow, justifyContent: "flex-start" }}>
                        <View style={{ ...styles.gridRow, justifyContent: "flex-start", width: "33%" }}>
                            <Text style={{ width: "30%" }}>Especie:</Text>
                            <Text style={{ borderBottom: "1px solid #000", width: "70%" }}> {detail.pet?.type} </Text>
                        </View>
                        <View style={{ ...styles.gridRow, justifyContent: "flex-start", width: "33%" }}>
                            <Text style={{ width: "30%" }}>Raza:</Text>
                            <Text style={{ borderBottom: "1px solid #000", width: "70%" }}> {detail.pet?.race} </Text>
                        </View>
                        <View style={{ ...styles.gridRow, justifyContent: "flex-start", width: "33%" }}>
                            <Text style={{ width: "30%" }}>Sexo:</Text>
                            <Text style={{ borderBottom: "1px solid #000", width: "70%" }}> {detail.pet?.gender ? PET_GENDERS[detail.pet.gender] : ""} </Text>
                        </View>
                    </View>

                    <SpacePdf marginBottom={10} />
                    <View style={{ ...styles.gridRow, justifyContent: "flex-start" }}>
                        <View style={{ ...styles.gridRow, justifyContent: "flex-start", width: "50%" }}>
                            <Text style={{ width: "40%" }}>Fecha de nacimiento:</Text>
                            <Text style={{ borderBottom: "1px solid #000", width: "55%" }}> {fDate(detail.pet?.birthDate, "DD/MM/YYYY")} </Text>
                        </View>
                        <View style={{ ...styles.gridRow, justifyContent: "flex-start", width: "50%" }}>
                            <Text style={{ width: "40%" }}>Nombre de la Mascota:</Text>
                            <Text style={{ borderBottom: "1px solid #000", width: "60%" }}> {detail.pet?.name} </Text>
                        </View>
                    </View>
                    <SpacePdf marginBottom={10} />

                    <SpacePdf marginBottom={10} />
                    <View style={{ ...styles.gridRow, justifyContent: "flex-start" }}>
                        <View style={{ ...styles.gridRow, justifyContent: "flex-start", width: "50%" }}>
                            <Text style={{ width: "15%" }}>Color:</Text>
                            <Text style={{ borderBottom: "1px solid #000", width: "80%" }}> {detail.pet?.color} </Text>
                        </View>
                        <View style={{ ...styles.gridRow, justifyContent: "flex-start", width: "50%" }}>
                            <Text style={{ width: "35%" }}>N° MICROCHIP:</Text>
                            <Text style={{ borderBottom: "1px solid #000", width: "65%" }}> {detail.pet?.chip} </Text>
                        </View>
                    </View>

                    <SpacePdf marginBottom={25} />
                    <View style={{ ...styles.gridRow, display: "flex", justifyContent: "center", width: "100%" }}>
                        <Text style={{ ...styles.title, width: "65%", ...styles.important }}> INFORMACIÓN DEL PROPIETARIO DE LA MASCOTA</Text>
                    </View>
                    <SpacePdf marginBottom={10} />


                    <View style={{ ...styles.gridRow }}>
                        <Text style={{ width: "20%" }}>Propietario:</Text>
                        <Text style={{ borderBottom: "1px solid #000", width: "80%" }}> {contract.client.profile.name} {contract.client.profile.lastName} </Text>
                    </View>
                    <View style={{ ...styles.gridRow, justifyContent: "flex-start" }}>
                        <Text style={{ width: "20%" }}>Dirección:</Text>
                        <Text style={{ borderBottom: "1px solid #000", width: "80%" }}> {contract.client.profile.direction} {contract.client.profile.district} </Text>
                    </View>
                    <View style={{ ...styles.gridRow, justifyContent: "flex-start" }}>
                        <View style={{ ...styles.gridRow, justifyContent: "flex-start" }}>
                            <Text style={{ width: "20%" }}>Celular:</Text>
                            <Text style={{ borderBottom: "1px solid #000", width: "80%" }}> {contract.client.profile.phone} </Text>
                        </View>
                        <View style={{ ...styles.gridRow, justifyContent: "flex-start" }}>
                            <Text style={{ width: "20%" }}>Teléfono:</Text>
                            <Text style={{ borderBottom: "1px solid #000", width: "80%" }}>- </Text>
                        </View>
                    </View>
                    <View style={{ ...styles.gridRow, justifyContent: "flex-start" }}>
                        <Text style={{ width: "20%" }}>Correo electrónico:</Text>
                        <Text style={{ borderBottom: "1px solid #000", width: "80%" }}> {contract.client.email}  </Text>
                    </View>

                </View>
            </Page>
        </Document >
    )
}
export default MicrochipCertificatePdf

