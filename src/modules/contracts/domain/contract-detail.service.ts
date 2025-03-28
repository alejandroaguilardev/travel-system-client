import { Contract } from './contract';
import { ContractDetail, ContractPetUpdater } from './contract-detail';
import { Criteria } from '../../shared/domain/criteria/criteria';
import { ResponseSearch } from '../../shared/domain/response/response-search';
import { CertificateDownload, Documentation, PdfDownload } from './contract-services/documentation/documentation';
import { Cage } from './contract-services/cage/cage';
import { PartialTravel } from './contract-services/travel/contract-travel';
import { TravelPetPerCharge } from './contract-services/travel/travel-pet-per-charge';
import { TravelAccompaniedPet } from './contract-services/travel/travel-accompanied-pet';
import { TravelDestination } from './contract-services/travel/travel-destination';
import { ResponseSuccess } from '../../shared/domain/response/response-success';
import { ContractTopico } from './contract-services/topico/contract-topico';

export type ContractDetailUpdateResponse = {
    contract: Contract,
    contractDetail: ContractDetail
}

export interface ContractDetailService {
    search(criteria: Criteria): Promise<ResponseSearch<ContractDetail[]>>;
    searchById(contractId: string, contractDetailId: string): Promise<ContractDetail>;
    updateDocumentation(contractId: string, detailId: string, body: Documentation): Promise<ContractDetailUpdateResponse>;
    updateCertificate(contractId: string, detailId: string, action: string, body: Partial<Documentation>): Promise<ContractDetailUpdateResponse>;
    updateTopico(contractId: string, detailId: string, action: string, body: Partial<ContractTopico>): Promise<ContractDetailUpdateResponse>;
    updateCage(contractId: string, detailId: string, body: Cage): Promise<ContractDetailUpdateResponse>;
    updateTravel(contractId: string, detailId: string, body: PartialTravel): Promise<ContractDetailUpdateResponse>;
    updateAccompaniedPet(
        contractId: string,
        detailId: string,
        accompaniedPet: TravelAccompaniedPet,
        destination: TravelDestination,
        petPerCharge: TravelPetPerCharge,
        observation: string,
    ): Promise<ContractDetailUpdateResponse>;
    updatePet(contractId: string, details: ContractPetUpdater[]): Promise<ResponseSuccess>;
    mailTopicRabiesReVaccination(contractId: string, detailId: string): Promise<void>;
    mailDetail(contractId: string, detailId: string, message?: string): Promise<void>;
    mailTravelDetail(contractId: string, detailId: string): Promise<void>;
    mailTakingSample(contractId: string, detailId: string): Promise<void>;
    mailTakingSampleExecuted(contractId: string, detailId: string): Promise<void>;
    mailSenasaIntroduceContract(contractId: string, detailId: string): Promise<void>;
    downloadSenasaExcel(contractId: string, detailId: string): Promise<{ file: string, name: string }>;
    downloadCertificateExcel(contractId: string, detailId: string, certificate: CertificateDownload): Promise<{ file: string, name: string }>;
    downloadPdf(contractId: string, detailId: string, pdfRoute: PdfDownload): Promise<{ file: string, name: string }>;
}
