

import { Document, Image, Page, StyleSheet, Text, View, Font } from '@react-pdf/renderer';
import { pdfStyles } from '../../../../theme/pdf';
import { Contract } from '../../../../modules/contracts/domain/contract';
import { fDate, fDayDiffString } from '../../../../modules/shared/infrastructure/helpers/format-time';
import { certificateImage } from './certificate-image';
import { ContractDetail } from '../../../../modules/contracts/domain/contract-detail';
import { PET_GENDERS } from '../../../../modules/pets/domain/pet-gender';
import DEPARTMENTS from '../../../../../public/data/department.json'

Font.register({
    family: 'Roboto',
    fonts: [
        { src: '/fonts/Roboto-Regular.ttf' },
        { src: '/fonts/Roboto-Bold.ttf' }
    ]
});

const styles = StyleSheet.create({ ...pdfStyles });

const rowOne = { position: "absolute", top: "33%" } as const;
const rowTwo = { position: "absolute", top: "36%" } as const;
const rowThree = { position: "absolute", top: "46%" } as const;
const rowFour = { position: "absolute", top: "50%" } as const;
const rowFive = { position: "absolute", top: "54.5%" } as const;
const rowSix = { position: "absolute", top: "61%" } as const;

const bgTest = { backgroundColor: "#000", opacity: 0.7, color: "#fff" } as const;

export interface ContractProps {
    contract: Contract;
    detail: ContractDetail;
}

interface Props extends ContractProps { }


const HealthCertificatePdfEs = ({ contract, detail }: Props) => {
    const { pet } = detail;
    const { client } = contract;
    const profile = client?.profile;


    return (
        <Document>
            <Page size='A4' style={{ ...styles.page, fontSize: 9 }} >
                <View style={{ ...styles.container, padding: 0, margin: "20px 15px 0", height: "50vh" }} >
                    {/* <Image
                        src={certificateImage}
                        style={{
                            width: "100%",
                            position: "absolute"
                        }}
                    /> */}
                    <View style={{ ...rowOne, left: "14%", width: "15%", ...bgTest }}>
                        <Text style={{ fontWeight: "bold", textAlign: "center" }}>{pet?.type ?? "--"}</Text>
                    </View>
                    <View style={{ ...rowOne, left: "35%", width: "17%", ...bgTest }}>
                        <Text style={{ fontWeight: "bold", textAlign: "center" }}>{pet?.race ?? "--"}</Text>
                    </View>
                    <View style={{ ...rowOne, left: "57%", width: "20%", ...bgTest }}>
                        <Text style={{ fontWeight: "bold", textAlign: "center" }}>{pet?.gender ? PET_GENDERS[pet.gender] : "--"}</Text>
                    </View>
                    <View style={{ ...rowOne, left: "83%", width: "15%", ...bgTest }}>
                        <Text style={{ fontWeight: "bold", textAlign: "center" }}>{fDayDiffString(pet?.birthDate)}</Text>
                    </View>


                    <View style={{ ...rowTwo, left: "14%", width: "22%", ...bgTest }}>
                        <Text style={{ fontWeight: "bold", textAlign: "center" }}>{pet?.name ?? "--"}</Text>
                    </View>
                    <View style={{ ...rowTwo, left: "72%", width: "26%", ...bgTest }}>
                        <Text style={{ fontWeight: "bold", textAlign: "center" }}>{pet?.color ?? "--"}</Text>
                    </View>


                    <View style={{ ...rowThree, left: "40%", width: "55%", ...bgTest }}>
                        <Text style={{ fontWeight: "bold", textAlign: "center" }}>
                            {profile?.name ?? ""}
                            {profile?.secondName ?? ""}
                            {profile?.lastName ?? ""}
                            {profile?.secondLastName ?? ""}
                        </Text>
                    </View>


                    <View style={{ ...rowFour, left: "21%", width: "40%", ...bgTest }}>
                        <Text style={{ fontWeight: "bold", textAlign: "center" }}>{profile?.direction ?? "--"} </Text>
                    </View>


                    <View style={{ ...rowFive, left: "14%", width: "27%", ...bgTest }}>
                        <Text style={{ fontWeight: "bold", textAlign: "center" }}>{DEPARTMENTS.find(_ => _.id === profile?.department)?.name ?? "--"}</Text>
                    </View>
                    <View style={{ ...rowFive, left: "45%", width: "37%", ...bgTest }}>
                        <Text style={{ fontWeight: "bold", textAlign: "center" }}>{fDate(detail.documentation.healthCertificate.resultDate, "DD [de] MMMM")}</Text>
                    </View>
                    <View style={{ ...rowFive, left: "86%", width: "12%", ...bgTest }}>
                        <Text style={{ fontWeight: "bold", textAlign: "center" }}>
                            {fDate(detail.documentation.healthCertificate.resultDate, "YYYY")}
                        </Text>
                    </View>


                    <View style={{ ...rowSix, left: "20%", width: "77%", ...bgTest }}>
                        <Text style={{ fontWeight: "bold", textAlign: "center" }}>

                        </Text>
                    </View>


                </View>
            </Page>
        </Document >
    )
}



export default HealthCertificatePdfEs