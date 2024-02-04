import { ContractStatus } from '../../contract-status';
import { DocumentationCertificate } from './documentation-certificate';

export interface Documentation {
  status: ContractStatus;
  vaccinationCertificate: DocumentationCertificate;
  healthCertificate: DocumentationCertificate;
  chipCertificate: DocumentationCertificate;
  senasaDocuments: DocumentationCertificate;
  rabiesSeroLogicalTest: DocumentationCertificate;
  importLicense: DocumentationCertificate;
  emotionalSupportCertificate: DocumentationCertificate;
}
