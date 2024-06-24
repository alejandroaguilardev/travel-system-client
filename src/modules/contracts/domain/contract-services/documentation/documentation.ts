import { ContractDetailStatus } from '../../contract-status';
import { DocumentationCertificate } from './documentation-certificate';

export interface Documentation {
  status: ContractDetailStatus;
  clientStatus: ContractDetailStatus;
  chipCertificate: DocumentationCertificate;
  vaccinationCertificate: DocumentationCertificate;
  rabiesSeroLogicalTest: DocumentationCertificate;
  importLicense: DocumentationCertificate;
  healthCertificate: DocumentationCertificate;
  senasaDocuments: DocumentationCertificate;
  emotionalSupportCertificate: DocumentationCertificate;
}



export const DOCUMENTATION_KEYS = {
  chipCertificate: "chipCertificate",
  vaccinationCertificate: "vaccinationCertificate",
  rabiesSeroLogicalTest: "rabiesSeroLogicalTest",
  importLicense: "importLicense",
  healthCertificate: "healthCertificate",
  senasaDocuments: "senasaDocuments",
  emotionalSupportCertificate: "emotionalSupportCertificate",
};


export enum CertificateDownload {
  MICROCHIP = "chipCertificate",
  HEALTH = "healthCertificate",
  VACCINATION = "vaccinationCertificate",
}

export enum PdfDownload {
  RABIES_SEROLOGY = "rabies-serology",
  CDCR = "cdcr-rvmr",
}