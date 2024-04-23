

import { Document, Image, Page, StyleSheet, Text, View, Font } from '@react-pdf/renderer';
import { pdfStyles } from '../../../../theme/pdf';
import { Contract } from '../../../../modules/contracts/domain/contract';
import { fDate, fDayDiffString, fDaySum } from '../../../../modules/shared/infrastructure/helpers/format-time';
import { ContractDetail } from '../../../../modules/contracts/domain/contract-detail';
import { PET_GENDERS } from '../../../../modules/pets/domain/pet-gender';
import { certificateVac } from './certificate-vac-image';
import { capitalize } from '../../../../modules/shared/domain/helpers/capitalize';

Font.register({
    family: 'Roboto',
    fonts: [
        { src: '/fonts/Roboto-Regular.ttf' },
        { src: '/fonts/Roboto-Bold.ttf' }
    ]
});

const styles = StyleSheet.create({ ...pdfStyles });

const rowOne = { position: "absolute", top: "42%" } as const;
const rowTwo = { position: "absolute", top: "52.5%" } as const;
const rowThree = { position: "absolute", top: "56.5%" } as const;
const rowFour = { position: "absolute", top: "60.5%" } as const;
const rowFive = { position: "absolute", top: "64.5%" } as const;
const rowSix = { position: "absolute", top: "68.5%" } as const;

const bgTest = { backgroundColor: "#000", opacity: 0.7, color: "#fff" } as const;

export interface ContractProps {
    contract: Contract;
    detail: ContractDetail;
}

interface Props extends ContractProps { }


const VaccinationCertificatePdfEs = ({ contract, detail }: Props) => {
    const { pet } = detail;
    const { client } = contract;
    const profile = client?.profile;


    const direction = [
        capitalize(profile.direction?.substring(0, 28)?.toLowerCase()) ?? "",
        capitalize(profile.direction?.substring(28, 70)?.toLowerCase()) ?? "",
    ]


    return (
        <Document>
            <Page size='A4' style={{ ...styles.page, fontSize: 9 }} >
                <View style={{ ...styles.container, padding: 0, margin: "20px 15px 0", height: "50vh" }} >
                    {/* <Image
                        src={certificateVac}
                        style={{
                            width: "100%",
                            position: "absolute"
                        }}
                    /> */}

                    <View style={{ ...rowOne, left: "7%", width: "65%", ...bgTest }}>
                        <Text style={{ fontWeight: "bold", textAlign: "center" }}>Rinotraqueitis, panleucopenia, calicivirus, rabia</Text>
                    </View>


                    <View style={{ ...rowTwo, left: "14%", width: "16.5%", ...bgTest }}>
                        <Text style={{ fontWeight: "bold", textAlign: "center" }}>{pet?.type ?? "--"}</Text>
                    </View>
                    <View style={{ ...rowTwo, left: "35%", width: "20%", ...bgTest }}>
                        <Text style={{ fontWeight: "bold", textAlign: "center" }}>{pet?.race ?? "--"}</Text>
                    </View>
                    <View style={{ ...rowTwo, left: "59%", width: "15%", ...bgTest }}>
                        <Text style={{ fontWeight: "bold", textAlign: "center" }}>{pet?.gender ? PET_GENDERS[pet.gender] : "--"}</Text>
                    </View>
                    <View style={{ ...rowTwo, left: "79%", width: "16%", ...bgTest }}>
                        <Text style={{ fontWeight: "bold", textAlign: "center" }}>{fDayDiffString(pet?.birthDate)}</Text>
                    </View>


                    <View style={{ ...rowThree, left: "14%", width: "20%", ...bgTest }}>
                        <Text style={{ fontWeight: "bold", textAlign: "center" }}>{pet?.name ?? "--"}</Text>
                    </View>
                    <View style={{ ...rowThree, left: "65%", width: "28%", ...bgTest }}>
                        <Text style={{ fontWeight: "bold", textAlign: "center" }}>{pet?.color ?? "--"}</Text>
                    </View>


                    <View style={{ ...rowFour, left: "17%", width: "40%", ...bgTest }}>
                        <Text style={{ fontWeight: "bold", textAlign: "left" }}>
                            {profile?.name ?? ""}
                            {profile?.secondName ?? ""}
                            {profile?.lastName ?? ""}
                            {profile?.secondLastName ?? ""}
                        </Text>
                    </View>
                    <View style={{ ...rowFour, left: "66%", width: "28%", ...bgTest }}>
                        <Text style={{ fontWeight: "bold", textAlign: "center" }}>{direction[0]} </Text>
                    </View>


                    <View style={{ ...rowFive, left: "7%", width: "46%", ...bgTest }}>
                        <Text style={{ fontWeight: "bold", textAlign: "center" }}>{direction[1]}</Text>
                    </View>
                    <View style={{ ...rowFive, left: "57%", width: "37%", ...bgTest }}>
                        <Text style={{ fontWeight: "bold", textAlign: "center" }}>
                            {fDate(detail.documentation.vaccinationCertificate.resultDate, "DD [de] MMMM YYYY")}
                        </Text>
                    </View>


                    <View style={{ ...rowSix, left: "70%", width: "25%", ...bgTest }}>
                        <Text style={{ fontWeight: "bold", textAlign: "center" }}>{fDaySum(detail.documentation.vaccinationCertificate.resultDate, 364, "DD [de] MMMM YYYY")}</Text>
                    </View>
                </View>
            </Page>
        </Document >
    )
}



export default VaccinationCertificatePdfEs