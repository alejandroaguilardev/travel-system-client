import axiosInstance from '../../shared/infrastructure/http/axios.host';
import { endpoints } from '../../shared/domain/endpoint';
import { ContractDetailService, ContractDetailUpdateResponse } from '../domain/contract-detail.service';
import { ContractDetail, ContractPetUpdater } from '../domain/contract-detail';
import { Criteria, criteriaToQueryString } from '../../shared/domain/criteria/criteria';
import { ResponseSearch } from '../../shared/domain/response/response-search';
import { CertificateDownload, Documentation, PdfDownload } from '../domain/contract-services/documentation/documentation';
import { PartialTravel } from '../domain/contract-services/travel/contract-travel';
import { Cage } from '../domain/contract-services/cage/cage';
import { ResponseSuccess } from 'src/modules/shared/domain/response/response-success';
import { TravelPetPerCharge } from '../domain/contract-services/travel/travel-pet-per-charge';
import { TravelAccompaniedPet } from '../domain/contract-services/travel/travel-accompanied-pet';
import { TravelDestination } from '../domain/contract-services/travel/travel-destination';
import { ContractTopico } from '../domain/contract-services/topico/contract-topico';
import CDCPdf from '../../../../public/pdf/CDC-RVMR-2023-508.pdf';
import rabiesPdf from '../../../../public/pdf/rabies-serology.pdf';
import axios from 'axios';

export const contractDetailService: ContractDetailService = {
    search: async (criteria: Criteria): Promise<ResponseSearch<ContractDetail[]>> => {
        const { data } = await axiosInstance.get(`${endpoints.contracts.detail}${criteriaToQueryString(criteria)}`);
        return data;
    },
    searchById: async (contractId: string, contractDetailId: string): Promise<ContractDetail> => {
        const { data } = await axiosInstance.get(`${endpoints.contracts.detail}/${contractId}/${contractDetailId}`);
        return data;
    },

    updateDocumentation: async (contractId: string, detailId: string, body: Documentation): Promise<ContractDetailUpdateResponse> => {
        const { data } = await axiosInstance.patch<ContractDetailUpdateResponse>(`${endpoints.contracts.detail}/${contractId}/${detailId}/documentation`, body);
        return data;
    },
    updateCertificate: async (contractId: string, detailId: string, action: string, body: Partial<Documentation>): Promise<ContractDetailUpdateResponse> => {
        const { data } = await axiosInstance.patch<ContractDetailUpdateResponse>(`${endpoints.contracts.detail}/${contractId}/${detailId}/certificate/${action}`, body)
        return data;
    },
    updateCage: async (contractId: string, detailId: string, body: Cage): Promise<ContractDetailUpdateResponse> => {
        const { data } = await axiosInstance.patch<ContractDetailUpdateResponse>(`${endpoints.contracts.detail}/${contractId}/${detailId}/cage`, body);
        return data;
    },
    updateTravel: async (contractId: string, detailId: string, body: PartialTravel): Promise<ContractDetailUpdateResponse> => {
        const { data } = await axiosInstance.patch<ContractDetailUpdateResponse>(`${endpoints.contracts.detail}/${contractId}/${detailId}/travel`, body);
        return data;
    },
    updateAccompaniedPet: async (
        contractId: string,
        detailId: string,
        accompaniedPet: TravelAccompaniedPet,
        destination: TravelDestination,
        petPerCharge: TravelPetPerCharge,
        observation: string): Promise<ContractDetailUpdateResponse> => {
        const { data } = await axiosInstance.patch<ContractDetailUpdateResponse>(`${endpoints.contracts.detail}/${contractId}/${detailId}/accompanied`, {
            accompaniedPet,
            destination,
            petPerCharge,
            observation
        });
        return data;
    },
    updatePet: async (contractId: string, details: ContractPetUpdater[]): Promise<ResponseSuccess> => {
        const { data } = await axiosInstance.patch(`${endpoints.contracts.detail}/${contractId}/pet`, {
            details
        });
        return data;
    },
    updateTopico: async (contractId: string, detailId: string, action: string, body: Partial<ContractTopico>): Promise<ContractDetailUpdateResponse> => {
        const { data } = await axiosInstance.patch<ContractDetailUpdateResponse>(`${endpoints.contracts.detail}/${contractId}/${detailId}/topico/${action}`, body)
        return data;
    },
    mailTopicRabiesReVaccination: async (contractId: string, detailId: string): Promise<void> => {
        await axiosInstance.post<ContractDetailUpdateResponse>(`${endpoints.contracts.detail}/${contractId}/${detailId}/notificationTopicRabiesReVaccination`);
    },
    mailDetail: async (contractId: string, detailId: string, message = ""): Promise<void> => {
        await axiosInstance.post<ContractDetailUpdateResponse>(`${endpoints.contracts.detail}/${contractId}/${detailId}/notificationDetail`, { message });
    },
    mailTakingSample: async (contractId: string, detailId: string): Promise<void> => {
        await axiosInstance.post<ContractDetailUpdateResponse>(`${endpoints.contracts.detail}/${contractId}/${detailId}/notificationTakingSample`);
    },
    mailTakingSampleExecuted: async (contractId: string, detailId: string): Promise<void> => {
        await axiosInstance.post<ContractDetailUpdateResponse>(`${endpoints.contracts.detail}/${contractId}/${detailId}/notificationTakingSampleExecuted`);
    },
    mailSenasaIntroduceContract: async (contractId: string, detailId: string): Promise<void> => {
        await axiosInstance.post<ContractDetailUpdateResponse>(`${endpoints.contracts.detail}/${contractId}/${detailId}/notificationSenasaIntroduceContract`);
    },
    mailTravelDetail: async (contractId: string, detailId: string): Promise<void> => {
        await axiosInstance.post<ContractDetailUpdateResponse>(`${endpoints.contracts.detail}/${contractId}/${detailId}/notificationTravelDetail`);
    },
    downloadSenasaExcel: async (contractId: string, detailId: string,): Promise<{ file: string, name: string }> => {
        const { data, headers } = await axiosInstance.post(`${endpoints.contracts.detail}/${contractId}/${detailId}/excel/senasa`, null, {
            responseType: "blob",
        });
        return { file: data, name: headers["name"] };

    },
    downloadCertificateExcel: async (contractId: string, detailId: string, certificate: CertificateDownload): Promise<{ file: string, name: string }> => {
        const { data, headers } = await axiosInstance.post(`${endpoints.contracts.detail}/${contractId}/${detailId}/excel/certificate/${certificate}`, null, {
            responseType: "blob"
        });
        return { file: data, name: headers["name"] };
    },
    downloadPdf: async (contractId: string, detailId: string, pdf: PdfDownload): Promise<{ file: string, name: string }> => {
        const response = await axios.get(pdf === PdfDownload.CDCR ? CDCPdf : rabiesPdf, {
            responseType: 'blob'
        });
        const formData = new FormData();
        formData.append('file', response.data);
        const { data, headers } = await axiosInstance.post(`${endpoints.contracts.detail}/${pdf}/${contractId}/${detailId}`, formData, {
            responseType: "blob",
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        return { file: data, name: headers["name"] };
    },

}