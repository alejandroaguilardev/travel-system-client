import { ContractStatus } from '../../contract-status';
import { DocumentationCertificate } from './documentation-certificate';

export interface Documentation {
  status: ContractStatus;
  chipCertificate: DocumentationCertificate;
  vaccinationCertificate: DocumentationCertificate;
  rabiesSeroLogicalTest: DocumentationCertificate;
  chipReview: DocumentationCertificate;
  importLicense: DocumentationCertificate;
  healthCertificate: DocumentationCertificate;
  senasaDocuments: DocumentationCertificate;
  emotionalSupportCertificate: DocumentationCertificate;
}
